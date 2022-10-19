import { apiSlice } from './apiSlice';
// import { LoginUserParams } from '../../types/';

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
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
