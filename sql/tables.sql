DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Issues;

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

CREATE TABLE Issues (
  issue_id SERIAL PRIMARY KEY,
  title VARCHAR(72) NOT NULL,
  description TEXT,
  time_added TIMESTAMP NOT NULL DEFAULT NOW(),
  project_id INT NOT NULL,
  CONSTRAINT fk_project
    FOREIGN KEY(project_id) 
	  REFERENCES Projects(project_id)
);
