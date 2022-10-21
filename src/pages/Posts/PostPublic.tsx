import { Link, useParams } from 'react-router-dom';
import CreatedUpdatedAt from '../../components/CreatedUpdatedAt/CreatedUpdatedAt';

import PageWrap from '../../components/PageWrap/PageWrap';
import Spinner from '../../components/svg/Spinner';
import { useGetSinglePostBySlugQuery } from '../../store/slices/postsApiSlice';
import { ButtonSC } from '../../styles/ButtonSC';
import { PlgSC } from '../../styles/PLgSC';
import { CustomResponseError } from '../../types';
import Error404 from '../Error/Error404';

const PostPublic = () => {
  const { slug } = useParams();

  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSinglePostBySlugQuery({ postSlug: slug as string });

  let content = <></>;

  if (isLoading) {
    content = (
      <p>
        <Spinner /> Loading...
      </p>
    );
  } else if (isError && error) {
    if ((error as CustomResponseError)?.statusCode === 404) {
      // TODO: Maybe there is a better way to handle 404

      return <Error404 />;
    } else {
      content = (
        <p>
          Something Bad Happened. Try refreshing the page, or go back to posts
        </p>
      );
    }
  } else if (isSuccess && post) {
    content = (
      <div>
        <Link to="/posts" className="tdn">
          <ButtonSC>All Posts</ButtonSC>
        </Link>
        <PlgSC>{post.content}</PlgSC>
        <CreatedUpdatedAt
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
        />
      </div>
    );
  }

  // TODO: If slug doesn't exist, redirect to posts or to 404.
  // Figure out if this can be done before even accessing this route

  return <PageWrap pageTitle={post?.title ?? null}>{content}</PageWrap>;
};

export default PostPublic;
