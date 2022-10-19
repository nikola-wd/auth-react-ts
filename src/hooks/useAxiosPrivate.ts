import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectCurrentToken } from '../store/slices/authSlice';

import { axiosClient } from '../utils/api';
import { HttpStatus } from '../utils/http-status.enum';
import useRefreshToken from './useRefreshToken';

// TODO: Maybe I need to update the authSlice with the new AT here as well

const useAxiosPrivate = () => {
  const [refresh] = useRefreshToken();
  const currentAT = useAppSelector(selectCurrentToken);

  useEffect(() => {
    const requestIntercept = axiosClient.interceptors.request.use(
      (config) => {
        // Here we know it's not a retry (first attempt)
        if (!config.headers!['Authorization']) {
          config.headers!['Authorization'] = `Bearer ${currentAT}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosClient.interceptors.response.use(
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
          const { access_token: newAccessToken } = await refresh();

          console.log('newAccessToken ', newAccessToken);

          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // do the request again with the new AT
          return axiosClient(prevRequest);
        }

        // TODO: Test reject by making RT live shorter. In that case, maybe rediret to login, but remember the previous route so that the user after login gets on the same page again
        return Promise.reject(error);
      },
    );

    // clean up interceptors
    return () => {
      axiosClient.interceptors.request.eject(requestIntercept);
      axiosClient.interceptors.response.eject(responseIntercept);
    };
  }, [currentAT, refresh]);

  return axiosClient;
};

export default useAxiosPrivate;
