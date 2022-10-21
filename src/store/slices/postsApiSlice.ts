import { PostByUser } from '../../pages/MyPosts/MyPosts';
import {
  Post,
  PostIDType,
  PostSlugType,
  PostType,
  UpdatePostDto,
} from '../../types';
import { RequestMethod } from '../../utils/request-method.enum';
import { apiSlice } from './apiSlice';

export const postsApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ['Posts', 'SinglePost'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllPublicPosts: build.query<Post[], void>({
        query: () => '/posts',
        keepUnusedDataFor: 20, // 5s TODO: increase or remove (default is 60sec)
        providesTags: ['Posts'],
      }),
      createPost: build.mutation({
        query: (data) => ({
          url: '/posts',
          method: RequestMethod.POST,
          body: { ...data },
        }),
        invalidatesTags: ['Posts'],
      }),
      getSinglePostByID: build.query<PostType, PostIDType>({
        query: ({ postID }) => `/posts/by-id/${postID}`,
        keepUnusedDataFor: 20, // 5s TODO: increase or remove (default is 60sec)
        providesTags: ['SinglePost'],
      }),
      getSinglePostBySlug: build.query<PostType, PostSlugType>({
        query: ({ postSlug }) => `/posts/by-slug/${postSlug}`,
        keepUnusedDataFor: 20,
        providesTags: ['SinglePost'],
      }),
      updatePost: build.mutation<PostType, UpdatePostDto>({
        query: ({ postID, payload }) => ({
          url: `/posts/by-id/${postID}`,
          method: RequestMethod.PUT,
          body: { ...payload },
        }),
        invalidatesTags: ['SinglePost', 'Posts'],
      }),
      deletePost: build.mutation<void, PostIDType>({
        query: ({ postID }) => ({
          url: `/posts/by-id/${postID}`,
          method: RequestMethod.DELETE,
        }),
        invalidatesTags: ['Posts'],
      }),
      getAllPostsByUser: build.query<PostByUser[], void>({
        query: () => '/posts/by-user-id',
        keepUnusedDataFor: 20,

        providesTags: ['Posts'],
        // TODO: add provides tags here
      }),
    }),
  });

export const {
  useGetAllPublicPostsQuery,
  useGetSinglePostByIDQuery,
  useGetSinglePostBySlugQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAllPostsByUserQuery,
} = postsApiSlice;
