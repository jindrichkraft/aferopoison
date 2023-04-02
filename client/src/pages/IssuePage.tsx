import { useParams } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import Loader from '../components/elements/Loader';
import { useAuth } from '../hooks/auth';
import { useEndpoint } from '../hooks/api';
import {
  lookupIssuePriorityLabel,
  lookupIssueStatusLabel,
} from '../utils/levels';

import type { IIssue } from '../typings/issue';

const IssuePage = (): JSX.Element => {
  const { id } = useParams();
  const { auth } = useAuth();
  const { data, loading } = useEndpoint<IIssue>(
    `/issue/${Number(id) || 0}`,
    auth
  );

  return (
    <DefaultLayout>
      {loading ? <Loader /> : null}
      {data ? (
        <>
          <h1>{data.title}</h1>
          <h2>Information</h2>
          <ul>
            <li>Added by: {data.added_by_name}</li>
            <li>Assigned to: {data.assigned_to_name}</li>
            <li>Priority: {lookupIssuePriorityLabel(data.priority)}</li>
            <li>Status: {lookupIssueStatusLabel(data.status)}</li>
            <li>Added on: {data.time_added}</li>
          </ul>
          <h2>Description</h2>
          <p>{data.description}</p>
        </>
      ) : null}
    </DefaultLayout>
  );
};

export default IssuePage;
