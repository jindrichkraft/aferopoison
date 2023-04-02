import { Link, useNavigate } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import Loader from '../components/elements/Loader';
import { useAuth } from '../hooks/auth';
import { useEndpoint } from '../hooks/api';
import {
  lookupIssuePriorityLabel,
  lookupIssueStatusLabel,
} from '../utils/levels';

import type { IIssue } from '../typings/issue';

const HomePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { data, loading } = useEndpoint<IIssue[]>('/issue', auth);

  return (
    <DefaultLayout>
      <h1>Home</h1>
      <h2>My Issues</h2>
      {loading ? <Loader /> : null}
      {data ? (
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Project</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((issue) => (
              <tr key={issue.issue_id}>
                <td>#{issue.issue_id}</td>
                <td>
                  <Link to={`/projects/${issue.project_id}`}>
                    {issue.project_name || ''}
                  </Link>
                </td>
                <td>{issue.title}</td>
                <td>{lookupIssuePriorityLabel(issue.priority)}</td>
                <td>{lookupIssueStatusLabel(issue.status)}</td>
                <td>
                  <button onClick={() => navigate(`/issue/${issue.issue_id}`)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </DefaultLayout>
  );
};

export default HomePage;
