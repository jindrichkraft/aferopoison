import jsonwebtoken from 'jsonwebtoken';

import {
  AUTH_TOKEN_TYPE,
  AUTH_TOKEN_EXPIRATION_IN_HOURS,
} from '../utils/constants';

export const generateJwtToken = (userId: number) => {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jsonwebtoken.sign(payload, process.env.JWT_SECRET || '', {
    expiresIn: `${AUTH_TOKEN_EXPIRATION_IN_HOURS}h`,
  });
};

export const generateAccessTokenData = (userId: number) => ({
  accessToken: generateJwtToken(userId),
  tokenType: AUTH_TOKEN_TYPE,
  expiresIn: AUTH_TOKEN_EXPIRATION_IN_HOURS * 3600 - 1,
});
