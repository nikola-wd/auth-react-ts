import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import FormField from '../../components/FormField/FormField';
import PageWrap from '../../components/PageWrap/PageWrap';
import Spinner from '../../components/svg/Spinner';
import useMutationRequest from '../../hooks/useMutationRequest';
import useOnRenderRequest from '../../hooks/useOnRenderRequest';
import { ButtonSC } from '../../styles/ButtonSC';
import { FormFieldErrorSC } from '../../styles/FormFieldErrorSC';
import { FormWrapSC } from '../../styles/FormWrapSC';
import { RequestMethod } from '../../utils/request-method.enum';
import Error404 from '../Error/Error404';
import { PostType } from '../Posts/types';
import { EditPostInputs } from './types';

const EditPost = () => {
  const { postId } = useParams();

  const [postData, setPostData] = useState<PostType | null>(null);

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
    isFinished,
  } = useOnRenderRequest<PostType, null>({
    url: `/posts/by-id/${postId}`,
  });

  const {
    mutate: updatePost,
    cancelRequest,
    data: updatedPost,
    isLoading: isUpdatingLoading,
    isSuccess: isUpdatingSuccess,
    isError: isUpdatingError,
    error: updatingError,
  } = useMutationRequest<PostType>();

  const onSubmit: SubmitHandler<EditPostInputs> = (formData) => {
    console.log('Form Data________________');
    console.log(formData);

    updatePost<PostType, EditPostInputs>({
      url: `/posts/by-id/${postId}`,
      method: RequestMethod.PUT,
      data: formData,
    });
  };

  useEffect(() => {
    if (post) {
      setPostData(post);
    }

    return () => {
      cancelRequest();
    };
  }, [post, cancelRequest]);

  useEffect(() => {
    if (updatedPost) {
      setPostData(updatedPost);
    }
  }, [updatedPost]);

  let content = <></>;

  if (isLoading) {
    content = (
      <p>
        <Spinner /> Loading...
      </p>
    );
  } else if ((isError && error) || (isUpdatingError && updatingError)) {
    let err = error || updatingError;

    if (err?.code === 'ERR_BAD_REQUEST' && err?.response?.status === 404) {
      // TODO: Maybe there is a better way to handle 404

      return <Error404 />;
    } else {
      content = (
        <p>
          Something Bad Happened. Try refreshing the page, or go back to posts
        </p>
      );
    }
  } else if (isFinished && isSuccess && postData) {
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
                defaultValue={postData?.title || ''}
                {...register('title', {
                  required: true,
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
                defaultValue={postData?.content || ''}
                {...register('content', {
                  required: true,
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

            {/* TODO: implement logic for updating the post slug as well, and if it already exists send a warning */}
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
            <Link to={`/posts/${postData.slug}`}>{postData.title}</Link>
          </p>
        )}
      </div>
    );
  }

  return <PageWrap pageTitle={`Edit Post: ${postId}`}>{content}</PageWrap>;
};

export default EditPost;

// if form is touched but not submitted, popup are you sure. Also, abort controller
