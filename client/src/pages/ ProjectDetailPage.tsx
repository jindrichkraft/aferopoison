import { useParams } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import { useAuth } from '../hooks/auth';
import { useEndpoint } from '../hooks/api';

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
            <ul>
              {data.issues.map((issue) => (
                <li key={issue.issue_id}>
                  #{issue.issue_id} - {issue.title}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
    </DefaultLayout>
  );
};

export default ProjectDetailPage;
