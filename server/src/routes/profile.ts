import { Router } from 'express';

import { pool } from '../main';
import { GET_USER_INFO_BY_USERNAME_QUERY } from '../queries/auth';
import { BAD_REQUEST_CODE, SERVER_ERROR_CODE } from '../utils/constants';

const profileRouter = Router();

profileRouter.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await pool.query(GET_USER_INFO_BY_USERNAME_QUERY, [username]);

    // Validating if user with the given username exists
    if (user.rowCount === 0)
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: 'User with this username does not exist!',
        data: null,
      });

    return res.json({
      success: true,
      message: null,
      data: user.rows[0] || null,
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

export default profileRouter;
