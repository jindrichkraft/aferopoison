export const GET_ALL_ISSUES_QUERY =
  'SELECT Issues.* ' +
  'FROM Issues ' +
  'JOIN UserProjects ON Issues.project_id = UserProjects.project_id ' +
  'WHERE UserProjects.user_id = $1';
export const GET_ALL_ISSUES_ASSIGNED_TO_USER_QUERY =
  'SELECT Issues.*, Projects.name AS project_name ' +
  'FROM Issues ' +
  'INNER JOIN Projects ON Issues.project_id = Projects.project_id ' +
  'JOIN UserProjects ON Issues.project_id = UserProjects.project_id ' +
  'WHERE UserProjects.user_id = $1 AND Issues.assigned_to = $2';
export const GET_ALL_ISSUES_BY_PROJECT_ID_QUERY =
  'SELECT Issues.*, u1.display_name AS added_by_name, u2.display_name AS assigned_to_name ' +
  'FROM Issues ' +
  'JOIN Users u1 ON Issues.added_by = u1.user_id ' +
  'JOIN Users u2 ON Issues.assigned_to = u2.user_id ' +
  'WHERE Issues.project_id = $1';
