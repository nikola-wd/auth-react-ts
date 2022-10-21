import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import FormField from '../../components/FormField/FormField';
import PageWrap from '../../components/PageWrap/PageWrap';
import Spinner from '../../components/svg/Spinner';
import {
  useDeletePostMutation,
  useGetSinglePostByIDQuery,
  useUpdatePostMutation,
} from '../../store/slices/postsApiSlice';
import { ButtonSC } from '../../styles/ButtonSC';
import { FormFieldErrorSC } from '../../styles/FormFieldErrorSC';
import { FormWrapSC } from '../../styles/FormWrapSC';
import { CustomResponseError, EditPostInputs } from '../../types';

// TODO: Maybe refactor from PUT to PATCH
const EditPost = () => {
  const { postId } = useParams<string>();
  const navigate = useNavigate();

  const [
    updatePost,
    {
      isLoading: isUpdatingLoading,
      isSuccess: isUpdatingSuccess,
      isError: isUpdatingError,
      error: updatingError,
    },
  ] = useUpdatePostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPostInputs>();

  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSinglePostByIDQuery({ postID: parseInt(postId as string) });

  const [
    deletePost,
    {
      isLoading: isDeletingLoading,
      isSuccess: isDeletingSuccess,
      isError: isDeletingError,
      error: deletingError,
    },
  ] = useDeletePostMutation();

  const onSubmit: SubmitHandler<EditPostInputs> = (formData) => {
    if (typeof postId === 'string') {
      updatePost({ postID: parseInt(postId), payload: formData });
    }
  };

  const onDelete = () => {
    // TODO: on BE on delete cascade and set posts visibility to disabled, will need a new migration as well
    if (typeof postId === 'string') {
      deletePost({ postID: parseInt(postId) });
    }
  };

  useEffect(() => {
    if (isDeletingSuccess) {
      navigate('/my-posts');
    }
  }, [isDeletingSuccess, navigate]);

  let content = <></>;

  if (isLoading) {
    content = (
      <p>
        <Spinner /> Loading...
      </p>
    );
  } else if ((isError && error) || (isUpdatingError && updatingError)) {
    let err = error || updatingError;

    console.log('UPDATE POST ERROR: ', err);

    content = (
      <p>
        Something Bad Happened. Try refreshing the page, or go back to posts
      </p>
    );
  } else if (isSuccess && post) {
    // TODO: custom PublicPostCardSC component
    content = (
      <div>
        <Link to="/my-posts" className="tdn">
          <ButtonSC>Back to my posts</ButtonSC>
        </Link>

        <FormWrapSC>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              id="#update_post_title"
              label="Title"
              error={errors.title}
            >
              <input
                type="text"
                id="update_post_title"
                defaultValue={post?.title || ''}
                {...register('title', {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors.title && (
                <FormFieldErrorSC>Title must not be empty</FormFieldErrorSC>
              )}
            </FormField>

            <FormField
              id="#update_post_content"
              label="Content"
              error={errors.content}
            >
              <input
                type="text"
                id="update_post_content"
                defaultValue={post?.content || ''}
                {...register('content', {
                  required: true,
                  minLength: 3,
                })}
              />
              {errors.content && (
                <FormFieldErrorSC>Content must not be empty</FormFieldErrorSC>
              )}
            </FormField>

            <Button
              primary
              isWide
              size="large"
              type="submit"
              loading={isUpdatingLoading || isLoading}
            >
              Update Post
            </Button>

            {/* TODO: implement the logic for updating the post slug as well, and if it already exists send a warning */}
          </form>
        </FormWrapSC>

        {isUpdatingLoading && (
          <p>
            <Spinner /> Updating Post...
          </p>
        )}

        {isUpdatingSuccess && (
          <p>
            Finished Updating The Post, check it out:{' '}
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
          </p>
        )}
      </div>
    );
  }

  return (
    <PageWrap pageTitle={`Edit Post: ${post?.title || 'Loading Title...'}`}>
      {content}

      <ButtonSC danger onClick={onDelete} disabled={isDeletingLoading}>
        Delete Post: TODO: add confirmation modal
        {isDeletingLoading && <Spinner />}
      </ButtonSC>

      {!isDeletingLoading &&
        isDeletingError &&
        (deletingError as CustomResponseError)?.message && (
          <p style={{ color: 'crimson' }}>
            {(deletingError as CustomResponseError)?.message}
          </p>
        )}
    </PageWrap>
  );
};

export default EditPost;

// TODO: Research if abort controller is needed with rtk query
// TODO: if form is touched but not submitted, popup are you sure. Also, abort controller
