export const GET_USER_BY_USERNAME_QUERY =
  'SELECT * FROM Users WHERE LOWER(username) = LOWER($1)';
export const GET_USER_INFO_BY_USERNAME_QUERY =
  'SELECT username, display_name FROM Users WHERE LOWER(username) = LOWER($1)';
export const CREATE_NEW_USER_QUERY =
  'INSERT INTO Users (username, display_name, password) VALUES ($1, $2, $3) RETURNING *';
