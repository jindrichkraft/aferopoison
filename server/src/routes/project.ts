import { Router } from 'express';

import { pool } from '../main';
import {
  GET_ALL_PROJECTS_QUERY,
  GET_PROJECT_BY_ID_QUERY,
} from '../queries/project';
import { GET_ALL_ISSUES_BY_PROJECT_ID_QUERY } from '../queries/issue';
import { authorize } from '../middlewares/auth';
import { BAD_REQUEST_CODE, SERVER_ERROR_CODE } from '../utils/constants';

const projectRouter = Router();

projectRouter.get('/', authorize, async (req, res) => {
  try {
    const projects = await pool.query(GET_ALL_PROJECTS_QUERY, [req.user.id]);
    return res.json({
      success: true,
      message: null,
      data: projects.rows || [],
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

projectRouter.get('/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await pool.query(GET_PROJECT_BY_ID_QUERY, [
      req.user.id,
      id,
    ]);
    const issues = await pool.query(GET_ALL_ISSUES_BY_PROJECT_ID_QUERY, [id]);

    // Validating if project with the given ID exists
    if (project.rowCount === 0)
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: 'Project with this ID does not exist!',
        data: null,
      });

    return res.json({
      success: true,
      message: null,
      data:
        {
          ...project.rows[0],
          issues: issues.rows || [],
        } || null,
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

export default projectRouter;
