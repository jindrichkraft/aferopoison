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

CREATE TABLE UserProjects (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(user_id),
  project_id INTEGER REFERENCES Projects(project_id),
  role INT NOT NULL DEFAULT 1,
  time_added TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Issues (
  issue_id SERIAL PRIMARY KEY,
  title VARCHAR(72) NOT NULL,
  description TEXT,
  time_added TIMESTAMP NOT NULL DEFAULT NOW(),
  project_id INT NOT NULL,
  assigned_to INT NOT NULL,
  added_by INT NOT NULL,
  priority INT NOT NULL,
  status INT NOT NULL DEFAULT 1,
  archived BOOLEAN DEFAULT false,
  CONSTRAINT fk_project
    FOREIGN KEY(project_id) 
	  REFERENCES Projects(project_id),
  CONSTRAINT fk_assigned_to
    FOREIGN KEY(assigned_to) 
	  REFERENCES Users(user_id),
  CONSTRAINT fk_added_by
    FOREIGN KEY(added_by) 
	  REFERENCES Users(user_id)
);
