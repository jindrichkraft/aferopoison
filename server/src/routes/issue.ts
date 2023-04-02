import { Router } from 'express';

import { pool } from '../main';
import {
  GET_ISSUE_BY_ID_QUERY,
  GET_ALL_ISSUES_ASSIGNED_TO_USER_QUERY,
  CREATE_NEW_ISSUE_QUERY,
  DELETE_ISSUE_BY_ID_QUERY,
} from '../queries/issue';
import { authorize } from '../middlewares/auth';
import {
  CREATED_CODE,
  BAD_REQUEST_CODE,
  SERVER_ERROR_CODE,
} from '../utils/constants';

const issueRouter = Router();

issueRouter.get('/', authorize, async (req, res) => {
  try {
    const issues = await pool.query(GET_ALL_ISSUES_ASSIGNED_TO_USER_QUERY, [
      req.user.id,
      req.user.id,
    ]);
    return res.json({
      success: true,
      message: null,
      data: issues.rows || [],
    });
  } catch (error) {
    console.log(error);
    return res.status(SERVER_ERROR_CODE).json({
      success: false,
      message: 'Server error!',
      data: null,
    });
  }
});

issueRouter.get('/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await pool.query(GET_ISSUE_BY_ID_QUERY, [req.user.id, id]);

    // Validating if issue with the given ID exists
    if (issue.rowCount === 0)
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: 'Issue with this ID does not exist!',
        data: null,
      });

    return res.json({
      success: true,
      message: null,
      data: issue.rows[0] || null,
    });
  } catch (error) {
    console.log(error);
    return res.status(SERVER_ERROR_CODE).json({
      success: false,
      message: 'Server error!',
      data: null,
    });
  }
});

issueRouter.post('/', authorize, async (req, res) => {
  try {
    // Validating input data
    const { title, description, projectId, assignedTo, priority } = req.body;
    if (!title || !description || !projectId || !assignedTo || !priority)
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: 'Invalid input data!',
        data: null,
      });

    // Creating the new issue
    const newIssue = await pool.query(CREATE_NEW_ISSUE_QUERY, [
      req.user.id,
      title,
      description,
      projectId,
      assignedTo,
      req.user.id,
      priority,
    ]);

    // Validating if project with the given ID exists
    if (newIssue.rowCount === 0)
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: 'Project with this ID does not exist!',
        data: null,
      });

    // Sending the issue data
    return res.status(CREATED_CODE).json({
      success: true,
      message: 'Successfully created a new issue!',
      data: {
        ...newIssue.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(SERVER_ERROR_CODE).json({
      success: false,
      message: 'Server error!',
      data: null,
    });
  }
});

issueRouter.delete('/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIssue = await pool.query(DELETE_ISSUE_BY_ID_QUERY, [
      req.user.id,
      id,
    ]);

    // Validating if issue with the given ID exists
    if (deletedIssue.rowCount === 0)
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: 'Issue with this ID does not exist!',
        data: null,
      });

    return res.json({
      success: true,
      message: null,
      data: deletedIssue.rows[0] || null,
    });
  } catch (error) {
    console.log(error);
    return res.status(SERVER_ERROR_CODE).json({
      success: false,
      message: 'Server error!',
      data: null,
    });
  }
});

export default issueRouter;
