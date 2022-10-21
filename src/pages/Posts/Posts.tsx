import { Link } from 'react-router-dom';
import CreatedUpdatedAt from '../../components/CreatedUpdatedAt/CreatedUpdatedAt';
import PageWrap from '../../components/PageWrap/PageWrap';
import { useAppSelector } from '../../store/hooks';
import { CustomHttpException } from '../../store/slices/apiSlice';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { useGetAllPublicPostsQuery } from '../../store/slices/postsApiSlice';
import { Post } from '../../types';

const Posts = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: posts, isLoading, error } = useGetAllPublicPostsQuery();

  console.log('isLoading: ', isLoading);

  // TODO: Create a PostPublicCard component

  return (
    <PageWrap pageTitle="Home">
      {currentUser && <h3>Welcome, {currentUser!.username}</h3>}
      <br />
      {isLoading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {error && <p>{(error as CustomHttpException)?.message}</p>}
      {posts &&
        posts.map((post: Post) => (
          <div key={post.id} style={{ padding: 20 }}>
            <Link to={post.slug} className="c-white">
              <h4>{post.title}</h4>
            </Link>
            <p style={{ marginBlock: '10px' }}>{post.content}</p>
            <CreatedUpdatedAt
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
            <p>
              <strong>Author: </strong> {post?.user?.firstName}{' '}
              {post?.user?.lastName}
            </p>
          </div>
        ))}
    </PageWrap>
  );
};

export default Posts;
