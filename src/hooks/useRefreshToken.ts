import { axiosClient } from '../utils/api';
import {
  setCredentials,
  setTryingLoginPersist,
} from '../store/slices/authSlice';

import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { HttpStatus } from '../utils/http-status.enum';
import { RefreshReturnData, UseRefreshTokenErrorType } from './types';
import { decode_at } from '../utils/decode_at';
import { useAppDispatch } from '../store/hooks';

const axiosReqConfig: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

const useRefreshToken = () => {
  const [isUninitialized, setIsUninitialized] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<UseRefreshTokenErrorType>({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && (isSuccess || isError)) {
      dispatch(setTryingLoginPersist(false));
    }
  }, [isLoading, isSuccess, isError, dispatch]);

  const refresh = async () => {
    dispatch(setTryingLoginPersist(true));
    const refreshReturnData: RefreshReturnData = {
      access_token: null,
      email: null,
      username: null,
    };

    try {
      setIsLoading(true);
      setIsUninitialized(false);

      // TODO: Move endpoint to constants ENDPOINTS {API: ...}
      let response = await axiosClient.get(
        '/auth/local/refresh',
        axiosReqConfig,
      );

      console.log('AXIOS PRIVATE RESPONSE: ', response);

      if (response.status !== HttpStatus.OK) {
        // TODO: Better error handling here
        throw new Error('Something Bad Happened. Please try again');
      }

      const { access_token } = response.data;
      const { email, username } = decode_at(access_token);

      refreshReturnData.access_token = access_token;
      refreshReturnData.email = email;
      refreshReturnData.username = username;

      dispatch(setCredentials({ user: { email, username }, access_token }));
      setIsSuccess(true);
    } catch (error) {
      const err = error as AxiosError;

      setIsError(true);
      setError(err);
      console.log('ERROR: ', err);
    } finally {
      setIsLoading(false);
    }

    return refreshReturnData;
  };

  return [
    refresh,
    {
      isUninitialized,
      isLoading,
      isSuccess,
      isError,
      error,
    },
  ] as const;
};

export default useRefreshToken;
