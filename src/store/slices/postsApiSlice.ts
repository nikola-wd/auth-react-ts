import { PostByUser } from '../../pages/MyPosts/MyPosts';
import { Post } from '../../pages/Posts/types';
import { apiSlice } from './apiSlice';

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // TODO: Add logic to invalidate all and user's post on create, delete, and update
    getAllPublicPosts: build.query<Post[], void>({
      query: () => '/posts',
      keepUnusedDataFor: 5, // 5s
    }),
    getAllPostsByUser: build.query<PostByUser[], void>({
      query: () => '/posts/by-user-id',
    }),
    createPost: build.mutation({
      query: (data) => ({
        url: '/posts',
        method: 'POST',
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetAllPublicPostsQuery,
  useGetAllPostsByUserQuery,
  useCreatePostMutation,
} = postsApiSlice;
