export const GET_ALL_ISSUES_QUERY =
  'SELECT Issues.* ' +
  'FROM Issues ' +
  'JOIN UserProjects ON Issues.project_id = UserProjects.project_id ' +
  'WHERE UserProjects.user_id = $1 ' +
  'ORDER BY Issues.priority DESC, Issues.time_added';
export const GET_ISSUE_BY_ID_QUERY =
  'SELECT Issues.*, u1.display_name AS added_by_name, u2.display_name AS assigned_to_name  ' +
  'FROM Issues ' +
  'JOIN Users u1 ON Issues.added_by = u1.user_id ' +
  'JOIN Users u2 ON Issues.assigned_to = u2.user_id ' +
  'JOIN UserProjects ON Issues.project_id = UserProjects.project_id ' +
  'WHERE UserProjects.user_id = $1 AND Issues.issue_id = $2';
export const GET_ALL_ISSUES_ASSIGNED_TO_USER_QUERY =
  'SELECT Issues.*, Projects.name AS project_name ' +
  'FROM Issues ' +
  'INNER JOIN Projects ON Issues.project_id = Projects.project_id ' +
  'JOIN UserProjects ON Issues.project_id = UserProjects.project_id ' +
  'WHERE UserProjects.user_id = $1 AND Issues.assigned_to = $2 ' +
  'ORDER BY Issues.priority DESC, Issues.time_added';
export const GET_ALL_ISSUES_BY_PROJECT_ID_QUERY =
  'SELECT Issues.*, u1.display_name AS added_by_name, u2.display_name AS assigned_to_name ' +
  'FROM Issues ' +
  'JOIN Users u1 ON Issues.added_by = u1.user_id ' +
  'JOIN Users u2 ON Issues.assigned_to = u2.user_id ' +
  'WHERE Issues.project_id = $1 ' +
  'ORDER BY Issues.priority DESC, Issues.time_added';
export const CREATE_NEW_ISSUE_QUERY =
  'INSERT INTO Issues (title, description, project_id, assigned_to, added_by, priority, status) ' +
  'SELECT $2, $3, $4, $5, $6, $7, 1 ' +
  'WHERE EXISTS ( ' +
  '  SELECT 1' +
  '  FROM UserProjects ' +
  '  WHERE user_id = $1 AND project_id = $4' +
  ') ' +
  'RETURNING *';
export const UPDATE_ISSUE_BY_ID_QUERY =
  'UPDATE Issues ' +
  'SET title = $3, ' +
  '    description = $4, ' +
  '    assigned_to = $5, ' +
  '    priority = $6,' +
  '    status = $7 ' +
  'WHERE EXISTS ( ' +
  '  SELECT 1' +
  '  FROM UserProjects ' +
  '  JOIN Issues ON issue_id = $2' +
  '  WHERE user_id = $1 AND UserProjects.project_id = Issues.project_id' +
  ') AND issue_id = $2 ' +
  'RETURNING *';
export const DELETE_ISSUE_BY_ID_QUERY =
  'DELETE FROM Issues ' +
  'WHERE project_id IN ( ' +
  '  SELECT project_id ' +
  '  FROM UserProjects ' +
  '  WHERE user_id = $1 ' +
  ') AND issue_id = $2 ' +
  'RETURNING *';
