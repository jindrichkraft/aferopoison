import DefaultLayout from '../layouts/DefaultLayout';
import { useAuth } from '../hooks/auth';
import { useEndpoint } from '../hooks/api';
import {
  lookupIssuePriorityLabel,
  lookupIssueStatusLabel,
} from '../utils/levels';

import type { IIssue } from '../typings/issue';

const HomePage = (): JSX.Element => {
  const { auth } = useAuth();
  const { data, loading } = useEndpoint<IIssue[]>('/issue', auth);

  return (
    <DefaultLayout>
      <h1>Home</h1>
      <h2>My Issues</h2>
      {loading ? <p>Loading...</p> : null}
      {data ? (
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((issue) => (
              <tr key={issue.issue_id}>
                <td>#{issue.issue_id}</td>
                <td>{issue.project_name || ''}</td>
                <td>{issue.title}</td>
                <td>{lookupIssuePriorityLabel(issue.priority)}</td>
                <td>{lookupIssueStatusLabel(issue.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </DefaultLayout>
  );
};

export default HomePage;
