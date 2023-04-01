import type { IIssue } from '../typings/issue';

const ISSUE_PRIORITY_LOOKUP_TABLE: { [key in IIssue['priority']]: string } = {
  1: 'Low',
  2: 'Normal',
  3: 'High',
  4: 'Critical',
};

export const lookupIssuePriorityLabel = (priorityLevel: IIssue['priority']) => {
  return ISSUE_PRIORITY_LOOKUP_TABLE[priorityLevel];
};

const ISSUE_STATUS_LOOKUP_TABLE: { [key in IIssue['status']]: string } = {
  1: 'Ready',
  2: 'In progress',
  3: 'Reviewed',
  4: 'Testing',
  5: 'Done',
};

export const lookupIssueStatusLabel = (statusLevel: IIssue['status']) => {
  return ISSUE_STATUS_LOOKUP_TABLE[statusLevel];
};
