import { useRef, useEffect, useState } from 'react';
import PageWrap from '../../components/PageWrap/PageWrap';
import Spinner from '../../components/svg/Spinner';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const MyPosts = () => {
  const axiosPrivate = useAxiosPrivate();

  const effectRan = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // TODO: implement abort controllers in all components if needed
  // TODO: Maybe if detected that the the token expired, logout
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      console.log('Should fetch my posts here');
      (async () => {
        try {
          setIsLoading(true);
          const res = await axiosPrivate.get('/posts/by-user-id');

          console.log(res);
          console.log(res.status);

          setIsSuccess(true);
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
  } else if (isSuccess) {
    content = <>Posts cards will go here</>;
  }

  return <PageWrap pageTitle="My Posts">{content}</PageWrap>;
};

export default MyPosts;
