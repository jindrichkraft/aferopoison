export const GET_ALL_PROJECTS_QUERY =
  'SELECT Projects.* FROM Projects ' +
  'JOIN UserProjects ON Projects.project_id = UserProjects.project_id ' +
  'WHERE UserProjects.user_id = $1';
export const GET_PROJECT_BY_ID_QUERY =
  'SELECT Projects.* FROM Projects ' +
  'JOIN UserProjects ON Projects.project_id = UserProjects.project_id ' +
  'WHERE UserProjects.user_id = $1 AND Projects.project_id = $2';
