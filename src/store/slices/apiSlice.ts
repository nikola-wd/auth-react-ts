import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
// import type { BaseQueryFn } from '@reduxjs/toolkit/query';

import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RefreshReturnData } from '../../types';
import { decode_at } from '../../utils/decode_at';
import { HttpStatus } from '../../utils/http-status.enum';
import { RootState } from '../store';
import { setCredentials, logOut } from './authSlice';
import { UserStateType } from './types';

// TODO: do this better and move from this file
export type CustomHttpException = {
  statusCode?: number;
  status: number;
  message?: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const access_token = (getState() as RootState).auth.access_token;
    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`);
    }
    return headers;
  },
});

// TODO: Maybe beter type annotations
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | CustomHttpException
> = async (args, api, extraOptions: {}) => {
  // > = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log('API SLICE RESPONSE: ', result);

  // TODO: Figure out if this is done correctly. And configure Nest not to redirect any requests startign with /api to index.html
  if (result?.error?.status === 'PARSING_ERROR') {
    throw new Error('Bad Request');
  }

  // originalStatus
  if (result?.error?.status === HttpStatus.UNAUTHORIZED) {
    console.log('result?.error: ', result.error);

    // sending RT to get new AT
    console.log('sending refresh token');
    const refreshResult = await baseQuery(
      '/auth/local/refresh',
      api,
      extraOptions,
    );
    console.log('refreshResult: ', refreshResult);
    if (refreshResult.data) {
      const { access_token } = refreshResult.data as RefreshReturnData;
      const { email, username } = decode_at(access_token as string);

      console.log('ApiSlice refreshResult: ', refreshResult);
      console.log('ApiSlice refreshResult.data: ', refreshResult.data);

      // store the new access_token
      api.dispatch(
        setCredentials({
          access_token,
          user: { email, username } as UserStateType,
        }),
      );
      // retry the original query with new AT
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
