import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '../store/store';
import { axiosPrivateClient } from '../utils/api';
import { HttpStatus } from '../utils/http-status.enum';
import useRefreshToken from './useRefreshToken';

// TODO: Maybe I need to update the authSlice with the new AT here as well

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const currentAT = useSelector((state: RootState) => state.auth.access_token);

  useEffect(() => {
    const requestIntercept = axiosPrivateClient.interceptors.request.use(
      (config) => {
        // Here we know it's not a retry (first attempt)
        if (!config.headers!['Authorization']) {
          config.headers!['Authorization'] = `Bearer ${currentAT}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivateClient.interceptors.response.use(
      // token didn't expire, and we did get a good response
      (response) => response,
      // token expired
      async (error) => {
        const prevRequest = error?.config;
        // TODO: check on the backend. HttpStatus.UNAUTHORIZED should be thrown if at expired
        // TODO: Should be converted to 403 - FORBIDDEN on the backend
        // sent property helps us retry only once
        if (
          error?.response?.status === HttpStatus.UNAUTHORIZED &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          // Get the new access token
          const newAccessToken = await refresh();

          console.log('newAccessToken ', newAccessToken);

          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // do the request again with the new AT
          return axiosPrivateClient(prevRequest);
        }

        // TODO: Test reject by making RT live shorter. In that case, maybe rediret to login, but remember the previous route so that the user after login gets on the same page again
        return Promise.reject(error);
      },
    );

    // clean up interceptors
    return () => {
      axiosPrivateClient.interceptors.request.eject(requestIntercept);
      axiosPrivateClient.interceptors.response.eject(responseIntercept);
    };
  }, [currentAT, refresh]);

  return axiosPrivateClient;
};

export default useAxiosPrivate;

// export default {};
