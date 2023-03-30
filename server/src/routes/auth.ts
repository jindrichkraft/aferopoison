import { Router } from 'express';
import bcrypt from 'bcrypt';

import { pool } from '../main';
import {
  GET_USER_BY_USERNAME_QUERY,
  CREATE_NEW_USER_QUERY,
} from '../queries/auth';
import {
  PASSWORD_SALT_ROUNDS,
  BAD_REQUEST_CODE,
  SERVER_ERROR_CODE,
  CONFLICT_CODE,
} from '../utils/constants';

const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    // Validating input data
    const { username, displayName, password } = req.body;
    if (!username || !displayName || !password)
      return res.status(BAD_REQUEST_CODE).json({
        success: false,
        message: 'Invalid input data!',
        data: null,
      });

    // Checking if user doesn't already exist
    const existingUser = await pool.query(GET_USER_BY_USERNAME_QUERY, [
      username,
    ]);
    if (existingUser.rowCount !== 0)
      return res.status(CONFLICT_CODE).json({
        success: false,
        message: 'User with this username already exists!',
        data: null,
      });

    // Hashing the password
    const salt = await bcrypt.genSalt(PASSWORD_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating the new user
    const newUser = (
      await pool.query(CREATE_NEW_USER_QUERY, [
        username,
        displayName,
        hashedPassword,
      ])
    ).rows[0];
    return res.json({
      success: true,
      message: 'Successfully created a new user!',
      data: {
        id: newUser.user_id,
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

export default authRouter;
