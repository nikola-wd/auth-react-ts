import { RequestMethod } from '../../utils/request-method.enum';
import { apiSlice } from './apiSlice';

import { RefreshReturnData } from '../../types';

// TODO: Maybe tags are needed
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: '/auth/local/signin',
        method: RequestMethod.POST,
        // TODO: type annotate credentials
        body: { ...credentials },
      }),
    }),
    register: build.mutation({
      query: (credentials) => ({
        url: '/auth/local/signup',
        method: RequestMethod.POST,
        // TODO: type annotate credentials
        body: { ...credentials },
      }),
    }),
    // TODO: Research if AC should really be sent when loggin the user out!
    logout: build.mutation({
      query: () => ({
        url: '/auth/local/logout',
        method: RequestMethod.POST,
        body: {},
      }),
    }),
    tryRefreshAccessToken: build.query({
      query: () => '/auth/local/refresh',
    }),
    // TODO: Implement forgot password
  }),
});

export const {
  useTryRefreshAccessTokenQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApiSlice;
