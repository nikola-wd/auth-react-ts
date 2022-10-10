import { AxiosRequestConfig } from 'axios';
import { RequestMethod } from '../../utils/request-method.enum';

export type OnRenderRequestType = {
  url: string;
  method?: RequestMethod;
  config?: AxiosRequestConfig;
};

// used in useRefreshToken

// TODO: Type it better
export type UseRefreshTokenErrorType = {
  [key: string]: any;
};

export type RefreshReturnData = {
  access_token: null | string;
  username: null | string;
  email: null | string;
};
