import { IIssue } from './issue';

export interface IProject {
  project_id: number;
  name: string;
  description: string;
  issues: IIssue[];
}
