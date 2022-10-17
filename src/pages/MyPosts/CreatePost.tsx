import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import FormField from '../../components/FormField/FormField';
import PageWrap from '../../components/PageWrap/PageWrap';
import Spinner from '../../components/svg/Spinner';
import useMutationRequest from '../../hooks/useMutationRequest';
import { ButtonSC } from '../../styles/ButtonSC';
import { FormFieldErrorSC } from '../../styles/FormFieldErrorSC';
import { FormWrapSC } from '../../styles/FormWrapSC';
import { RequestMethod } from '../../utils/request-method.enum';
import { PostType } from '../Posts/types';
import { CreatePostInputs } from './types';

const CreatePost = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostInputs>();

  const {
    mutate: createPost,
    isLoading: isCreatingLoading,
    isSuccess: isCreatingSuccess,
    isError: isCreatingError,
    error: creatingError,
  } = useMutationRequest();

  useEffect(() => {
    if (isCreatingSuccess) {
      console.log('______SUCCESSSS___________________________');
      navigate('/my-posts');
    }
  }, [isCreatingSuccess, navigate]);

  const onSubmit: SubmitHandler<CreatePostInputs> = (formData) => {
    createPost<PostType, CreatePostInputs>({
      url: '/posts/',
      method: RequestMethod.POST,
      data: formData,
    });
  };

  return (
    <PageWrap pageTitle="Create New Post">
      <div>
        <Link to="/my-posts" className="tdn">
          <ButtonSC>Back to my posts</ButtonSC>
        </Link>

        <FormWrapSC>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField id="#create_post_slug" label="Slug" error={errors.slug}>
              <input
                type="text"
                id="create_post_slug"
                defaultValue=""
                {...register('slug', {
                  required: true,
                })}
              />
              {errors.slug && (
                <FormFieldErrorSC>Slug must not be empty</FormFieldErrorSC>
              )}
            </FormField>

            <FormField
              id="#create_post_title"
              label="Title"
              error={errors.title}
            >
              <input
                type="text"
                id="create_post_title"
                defaultValue=""
                {...register('title', {
                  required: true,
                })}
              />
              {errors.title && (
                <FormFieldErrorSC>Title must not be empty</FormFieldErrorSC>
              )}
            </FormField>

            <FormField
              id="#create_post_content"
              label="Content"
              error={errors.content}
            >
              <textarea
                id="create_post_content"
                defaultValue=""
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
              loading={isCreatingLoading}
            >
              Create Post
            </Button>

            {/* TODO: implement logic for updating the post slug as well, and if it already exists send a warning */}
          </form>
        </FormWrapSC>

        {isCreatingLoading && (
          <p>
            <Spinner /> Updating Post...
          </p>
        )}

        {!isCreatingLoading && isCreatingError && creatingError?.message && (
          <p style={{ color: 'crimson' }}>{creatingError.message}</p>
        )}
      </div>
    </PageWrap>
  );
};

export default CreatePost;

// if form is touched but not submitted, popup are you sure. Also, abort controller
