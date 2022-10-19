import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: '/auth/local/signin',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: build.mutation({
      query: (credentials) => ({
        url: '/auth/local/signup',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    // TODO: Implement logOut, and forgot password
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
