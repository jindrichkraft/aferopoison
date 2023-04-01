import { IProject } from './project';
import { IUserInfo } from './auth';

export interface IIssue {
  issue_id: number;
  title: string;
  description: string;
  time_added: string;
  project_id: IProject['project_id'];
  assigned_to: IUserInfo['user_id'];
  added_by: IUserInfo['user_id'];
  priority: number;
  status: number;
  archived: boolean;
  added_by_name: IUserInfo['displayName'];
  assigned_to_name: IUserInfo['displayName'];
}
