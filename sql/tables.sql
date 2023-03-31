DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Projects;

CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(32) NOT NULL,
  display_name VARCHAR(48) NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE Projects (
  project_id SERIAL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  description TEXT
);
