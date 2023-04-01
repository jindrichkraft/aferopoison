import { useNavigate, useParams } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import { useAuth } from '../hooks/auth';
import { useEndpoint } from '../hooks/api';
import {
  lookupIssuePriorityLabel,
  lookupIssueStatusLabel,
} from '../utils/levels';

import type { IProject } from '../typings/project';

const ProjectDetailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useAuth();
  const { data, loading } = useEndpoint<IProject>(
    `/project/${Number(id) || 0}`,
    auth
  );

  return (
    <DefaultLayout>
      {loading ? <p>Loading...</p> : null}
      {data ? (
        <>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <h2>Issues</h2>
          {data.issues ? (
            <>
              <button>Add an issue</button>
              <table border={1}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Added by</th>
                    <th>Assigned to</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.issues.map((issue) => (
                    <tr key={issue.issue_id}>
                      <td>#{issue.issue_id}</td>
                      <td>{issue.title}</td>
                      <td>{issue.added_by_name}</td>
                      <td>{issue.assigned_to_name}</td>
                      <td>{lookupIssuePriorityLabel(issue.priority)}</td>
                      <td>{lookupIssueStatusLabel(issue.status)}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/issue/${issue.issue_id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : null}
        </>
      ) : null}
    </DefaultLayout>
  );
};

export default ProjectDetailPage;
