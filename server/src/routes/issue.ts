import { Router } from 'express';

import { pool } from '../main';
import { GET_ALL_ISSUES_ASSIGNED_TO_USER_QUERY } from '../queries/issue';
import { authorize } from '../middlewares/auth';
import { SERVER_ERROR_CODE } from '../utils/constants';

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

export default issueRouter;
