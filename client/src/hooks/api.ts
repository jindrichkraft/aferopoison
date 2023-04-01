import { useState, useEffect } from 'react';
import axios from 'axios';

import type { APIEndpoint } from '../typings/api';
import type { IAuthData } from '../typings/auth';

export const useEndpoint = <T>(
  endpoint: APIEndpoint,
  authData?: IAuthData | null | undefined
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}${endpoint}`, {
        headers: authData
          ? {
              Authorization: `${authData.tokenData.tokenType} ${authData.tokenData.accessToken}`,
            }
          : undefined,
      })
      .then(({ data }) => setData(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [authData]);

  return {
    data,
    loading,
    refetch: fetchData,
  };
};
