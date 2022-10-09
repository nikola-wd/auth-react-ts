import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { axiosClient } from '../utils/api';
import { setAuth, setTryingLoginPersist } from '../store/slices/authSlice';

import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { HttpStatus } from '../utils/http-status.enum';

type DecodedAT = {
  email: string;
  username: string;
};

const axiosReqConfig: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

type RefreshReturnData = {
  access_token: null | string;
  username: null | string;
  email: null | string;
};

type ErrorType = {
  [key: string]: any;
};

const useRefreshToken = () => {
  const [isUninitialized, setIsUninitialized] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>({});

  const dispatch = useDispatch();

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
        console.log('ERROR HAPPENED IN TRY');
        // TODO: Better error handling here
        throw new Error('Something Bad Happened. Please try again');
      }

      const { access_token } = response.data;
      const { email, username }: DecodedAT = jwt_decode(access_token);

      refreshReturnData.access_token = access_token;
      refreshReturnData.email = email;
      refreshReturnData.username = username;

      console.log('SETTING NEW AT!!!!!!!!!!!!!!!!!!!!!!!!!!');
      dispatch(setAuth({ user: { email, username }, access_token }));
      setIsSuccess(true);
    } catch (error) {
      const err = error as AxiosError;
      console.log('ERROR CAUGHT IN CATCH');

      setIsError(true);
      setError(err);
      console.log('ERROR: ', err);
    } finally {
      setIsLoading(false);
    }

    console.log('BEFORE RETURN USEREFRESHTOKEN DATA');
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
