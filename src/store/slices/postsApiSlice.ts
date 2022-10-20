import { Post } from '../../pages/Posts/types';
import { apiSlice } from './apiSlice';

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllPublicPosts: build.query<Post[], void>({
      query: () => '/posts',
      keepUnusedDataFor: 5, // 5s
    }),
    createPost: build.mutation({
      query: (data) => ({
        // TODO: Why is api prefix needed here and not in authApiSlice?
        url: '/api/v1/posts',
        method: 'POST',
        body: { ...data },
      }),
    }),
  }),
});

export const { useGetAllPublicPostsQuery, useCreatePostMutation } =
  postsApiSlice;
