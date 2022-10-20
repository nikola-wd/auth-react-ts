import { Link } from 'react-router-dom';
import AdminPostCard from '../../components/AdminPostCard/AdminPostCard';
import PageWrap from '../../components/PageWrap/PageWrap';
import Spinner from '../../components/svg/Spinner';
// import useOnRenderRequest from '../../hooks/useOnRenderRequest'; TODO: remove file
import { useGetAllPostsByUserQuery } from '../../store/slices/postsApiSlice';
import { ButtonSC } from '../../styles/ButtonSC';
import { PlgSC } from '../../styles/PLgSC';

// TODO: Move from this file
export type PostByUser = {
  id: number;
  slug: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

const MyPosts = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllPostsByUserQuery();

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
        Something Bad Happened. Try refreshing the page, or go back to posts
      </p>
    );
  } else if (isSuccess && posts) {
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

  return (
    <PageWrap pageTitle="My Posts">
      <PlgSC>
        <Link to="create" className="c-white">
          Create a new post?
        </Link>
      </PlgSC>
      {content}
    </PageWrap>
  );
};

export default MyPosts;

// TODO: Handle no fetched posts

// TODO: If not logged in, this route should either redirect to login, or redirect to 404
