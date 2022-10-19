import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreatedUpdatedAt from '../../components/CreatedUpdatedAt/CreatedUpdatedAt';
import PageWrap from '../../components/PageWrap/PageWrap';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { getAllPosts } from '../../utils/api';
import { Post } from './types';

const Posts = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [posts, setPosts] = useState<Post[] | []>([]);

  // TODO: Refactor this component to use useOnRenderRequest or create a similar one that doesn't send the Bearer token in headers

  // TODO: Fix the double call
  useEffect(() => {
    // TODO: Abort controller
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.data);
        console.log(res);
      } catch (error) {
        const err = error as AxiosError;
        console.log('asdasd: ', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // TODO: Create a PostPublicCard component

  return (
    <PageWrap pageTitle="Home">
      {currentUser && <h3>Welcome, {currentUser!.username}</h3>}
      <br />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {posts &&
        posts.map((post) => (
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

// TODO: if updated at is the same as created at, only show created at
