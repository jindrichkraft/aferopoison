import { Router } from 'express';

import { pool } from '../main';
import { GET_ALL_PROJECTS_QUERY } from '../queries/project';
import { authorize } from '../middlewares/auth';
import { SERVER_ERROR_CODE } from '../utils/constants';

const projectRouter = Router();

projectRouter.get('/', authorize, async (_, res) => {
  try {
    const projects = await pool.query(GET_ALL_PROJECTS_QUERY);
    return res.json(projects.rows || []);
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
