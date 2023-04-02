import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import Loader from '../components/elements/Loader';
import { useAuth } from '../hooks/auth';
import { useEndpoint } from '../hooks/api';

import type { IProfile } from '../typings/profile';

const ProfilePage = (): JSX.Element => {
  const { username } = useParams();
  const { auth } = useAuth();
  const { data, loading, refetch } = useEndpoint<IProfile>(
    `/profile/${username}`,
    auth,
    {
      autoFetch: false,
    }
  );

  useEffect(() => {
    if (username) refetch();
  }, [username]);

  return (
    <DefaultLayout>
      <h1>Profile</h1>
      {loading ? <Loader /> : null}
      {data ? (
        <>
          <p>Name: {data.display_name}</p>
          <p>Username: {data.username}</p>
        </>
      ) : null}
    </DefaultLayout>
  );
};

export default ProfilePage;
