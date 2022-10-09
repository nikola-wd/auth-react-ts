import { useRef, useEffect, useState } from 'react';
import AdminPostCard from '../../components/AdminPostCard/AdminPostCard';
import PageWrap from '../../components/PageWrap/PageWrap';
import Spinner from '../../components/svg/Spinner';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ButtonSC } from '../../styles/ButtonSC';

export type PostByUser = {
  id: number;
  slug: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

const MyPosts = () => {
  const axiosPrivate = useAxiosPrivate();

  const effectRan = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostByUser[]>([]);

  // TODO: implement abort controllers in all components if needed
  // TODO: Maybe if detected that the the token expired, logout
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      console.log(
        'Should fetch my posts here________________________________________',
      );
      (async () => {
        try {
          setIsLoading(true);
          const res = await axiosPrivate.get('/posts/by-user-id');

          console.log(res);
          console.log(res.status);

          setPosts(res.data);
        } catch (err) {
          console.log(err);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      })();
    }

    return () => {
      effectRan.current = true;
    };
  }, [axiosPrivate]);
  // eslint - disable - next - line;

  let content = <></>;

  if (isLoading) {
    content = (
      <p>
        <Spinner /> Loading...
      </p>
    );
  } else if (isError) {
    content = (
      <p>
        <Spinner /> Loading...
      </p>
    );
  } else if (posts) {
    if (!posts.length) {
      content = (
        <div>
          <p>You currently have no posts</p>
          <ButtonSC>Create One?</ButtonSC>
        </div>
      );
    } else {
      content = (
        <>
          {posts.map((post) => (
            <AdminPostCard
              key={post.id}
              id={post.id}
              slug={post.slug}
              title={post.title}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          ))}
        </>
      );
    }
  }

  return <PageWrap pageTitle="My Posts">{content}</PageWrap>;
};

export default MyPosts;

// TODO: Handle no fetched posts

// TODO: If not logged in, this route should either redirect to login, or redirect to 404
