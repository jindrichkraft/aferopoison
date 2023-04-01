import DefaultLayout from '../layouts/DefaultLayout';
import { useAuth } from '../hooks/auth';
import { useEndpoint } from '../hooks/api';

import type { IProject } from '../typings/project';

const ProjectPage = (): JSX.Element => {
  const { auth } = useAuth();
  const { data, loading } = useEndpoint<IProject[]>('/project', auth);
  console.log(data);

  return (
    <DefaultLayout>
      <h1>Projects</h1>
      {loading ? <p>Loading...</p> : null}
      {data ? data.map((project) => (
        <div key={project.project_id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      )) : null}
    </DefaultLayout>
  );
};

export default ProjectPage;
