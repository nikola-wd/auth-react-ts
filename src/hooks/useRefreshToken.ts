import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { axiosClient } from '../utils/api';
import { setAuth } from '../store/slices/authSlice';

import { AxiosRequestConfig } from 'axios';

type DecodedAT = {
  email: string;
  username: string;
};

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const axiosReqConfig: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  const refresh = async () => {
    const response = await axiosClient.get(
      '/auth/local/refresh',
      axiosReqConfig,
    );

    console.log('AXIOS PRIVATE RESPONSE: ', response);

    const { access_token } = response.data;

    const { email, username }: DecodedAT = jwt_decode(access_token);

    console.log('SETTING NEW AT!!!!!!!!!!!!!!!!!!!!!!!!!!');
    dispatch(setAuth({ user: { email, username }, access_token }));

    return access_token;
  };

  return refresh;
};

export default useRefreshToken;
