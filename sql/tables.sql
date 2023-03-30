DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(32),
  display_name VARCHAR(48),
  password VARCHAR
);
