import { useParams } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import { useAuth } from '../hooks/auth';
import { useEndpoint } from '../hooks/api';
import {
  lookupIssuePriorityLabel,
  lookupIssueStatusLabel,
} from '../utils/levels';

import type { IProject } from '../typings/project';

const ProjectDetailPage = (): JSX.Element => {
  const { id } = useParams();
  const { auth } = useAuth();
  const { data, loading } = useEndpoint<IProject>(
    `/project/${Number(id) || 0}`,
    auth
  );

  return (
    <DefaultLayout>
      <h1>Project Detail</h1>
      {loading ? <p>Loading...</p> : null}
      {data ? (
        <>
          <h2>Details</h2>
          <p>{data.description}</p>
          <h2>Issues</h2>
          {data.issues ? (
            <table border={1}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Added by</th>
                  <th>Assigned to</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.issues.map((issue) => (
                  <tr key={issue.issue_id}>
                    <td>#{issue.issue_id}</td>
                    <td>{issue.title}</td>
                    <td>{issue.added_by_name}</td>
                    <td>{issue.assigned_to_name}</td>
                    <td>{lookupIssuePriorityLabel(issue.status)}</td>
                    <td>{lookupIssueStatusLabel(issue.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </>
      ) : null}
    </DefaultLayout>
  );
};

export default ProjectDetailPage;
