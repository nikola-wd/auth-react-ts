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
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    firstName: string;
    lastName: string;
  };
};
