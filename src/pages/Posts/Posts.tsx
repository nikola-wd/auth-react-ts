import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PageWrap from '../../components/PageWrap/PageWrap';
import type { RootState } from '../../store/store';
import { getAllPosts } from '../../utils/api';

type Post = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
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

const Posts = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [posts, setPosts] = useState<Post[] | []>([]);

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

  return (
    <PageWrap pageTitle="Home">
      {currentUser && <h3>Welcome, {currentUser!.username}</h3>}
      <br />
      <h3>
        TODO: Remove this page. Only here temporarily for testing. Also test
        ingle post based on slug
      </h3>
      <p>lorem ipsum dolor sit amet, consectetur adip</p>
      <h2>Posts will be rendered here</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {posts &&
        posts.map((post) => (
          <div key={post.id} style={{ padding: 20 }}>
            <Link to={post.slug}>
              <h4>{post.title}</h4>
            </Link>
            <p style={{ marginBlock: '10px' }}>{post.content}</p>
            {/* TODO: date fns */}
            <time>{post.createdAt}</time>
            <strong>Author: </strong> {post?.user?.firstName}{' '}
            {post?.user?.lastName}
          </div>
        ))}
    </PageWrap>
  );
};

export default Posts;
