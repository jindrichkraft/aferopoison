import { Router } from 'express';

import { pool } from '../main';
import {
  GET_ISSUE_BY_ID_QUERY,
  GET_ALL_ISSUES_ASSIGNED_TO_USER_QUERY,
} from '../queries/issue';
import { authorize } from '../middlewares/auth';
import { BAD_REQUEST_CODE, SERVER_ERROR_CODE } from '../utils/constants';

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
        message: 'Project with this ID does not exist!',
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

export default issueRouter;
