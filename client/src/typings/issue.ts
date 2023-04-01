import { IProject } from './project';

export interface IIssue {
  issue_id: number;
  title: string;
  description: string;
  time_added: string;
  project_id: IProject['project_id'];
}
