export type RefreshReturnData = {
  access_token: null | string;
  username: null | string;
  email: null | string;
};

export type RegisterUserParams = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type LoginUserParams = {
  email: string;
  password: string;
};

export type CustomResponseError = {
  statusCode: number;
  message?: string;
  error?: string;
};

// TODO: Merge to one if possible
export type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  title: string;
  content: string;
  userId: number;
  user?: {
    id?: number;
    firstName?: string;
    lastName?: string;
  } | null;
};

// TODO: Merge to one if possible
export type PostType = {
  id: number;
  slug?: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    firstName: string;
    lastName: string;
  };
};

export type PostIDType = {
  postID: number;
};

export type PostSlugType = {
  postSlug: string;
};

export type CreatePostInputs = {
  title: string;
  slug: string;
  content: string;
};

export type EditPostInputs = {
  title: string;
  content: string;
};

export type UpdateSinglePost = {
  payload: EditPostInputs;
};

export type UpdatePostDto = PostIDType & UpdateSinglePost;

export type CreatedAtUpdatedAtType = {
  createdAt: Date;
  updatedAt: Date;
};
