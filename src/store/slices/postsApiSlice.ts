import { apiSlice } from './apiSlice';

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    create: build.mutation({
      query: (data) => ({
        // TODO: Why is api prefix needed here and not in authApiSlice?
        url: '/api/v1/posts',
        method: 'POST',
        body: { ...data },
      }),
    }),
  }),
});

export const { useCreateMutation } = postsApiSlice;
