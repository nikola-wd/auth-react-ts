import { Link, useParams } from 'react-router-dom';

import PageWrap from '../../components/PageWrap/PageWrap';
import Spinner from '../../components/svg/Spinner';
import useOnRenderRequest from '../../hooks/useOnRenderRequest';
import { ButtonSC } from '../../styles/ButtonSC';
import { PlgSC } from '../../styles/PLgSC';
import { PostDateSC } from '../../styles/PostDateSC';
import { getRelDate } from '../../utils/getRelDate';
import Error404 from '../Error/Error404';

type PostPublicType = {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    firstName: string;
    lastName: string;
  };
};

const PostPublic = () => {
  const { slug } = useParams();

  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error,
    isFinished,
  } = useOnRenderRequest<PostPublicType>({
    url: `/posts/by-slug/${slug}`,
  });

  let content = <></>;

  if (isLoading) {
    content = (
      <p>
        <Spinner /> Loading...
      </p>
    );
  } else if (isError && error) {
    if (error.code === 'ERR_BAD_REQUEST') {
      // TODO: Maybe there is a better way to handle 404

      return <Error404 />;
    } else {
      content = (
        <p>
          Something Bad Happened. Try refreshing the page, or go back to posts
        </p>
      );
    }
  } else if (isFinished && isSuccess && post) {
    // TODO: custom PublicPostCardSC component
    content = (
      <div>
        <Link to="/posts" className="tdn">
          <ButtonSC>All Posts</ButtonSC>
        </Link>
        <PlgSC>{post.content}</PlgSC>

        <PostDateSC>
          <>
            <strong>Created At: </strong>
            <strong>Updated At:</strong>&nbsp; {getRelDate(post.createdAt)}
          </>
        </PostDateSC>
        <PostDateSC>
          <>
            <strong>Updated At:</strong>&nbsp; {getRelDate(post.updatedAt)}
          </>
        </PostDateSC>
      </div>
    );
  }

  // TODO: If slug doesn't exist, redirect to posts or to 404.
  // Figure out if this can be done before even accessing this route

  return <PageWrap pageTitle={post?.title ?? null}>{content}</PageWrap>;
};

export default PostPublic;
