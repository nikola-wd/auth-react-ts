import { AuthWrapSC } from '../../components/AuthWrap/AuthWrapSC';
import FormField from '../../components/FormField/FormField';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import { FormFieldWrap } from '../../styles/FormFieldWrap';
import { InputSC } from '../../components/Input/InputSC';
import { FormFieldErrorSC } from '../../styles/FormFieldErrorSC';
import { Link } from 'react-router-dom';
import { REGEXSPS } from '../../utils/REGEXPS';
import Button from '../../components/Button/Button';
import { FlexWrapSC } from '../../styles/FlexWrapSC';

type Inputs = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setLoading(true);
  };

  console.log(watch('username')); // watch input value by passing the name of it

  // TODO: Temp, remove
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AuthWrapSC>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexWrapSC cols={2}>
          <FormField
            id="#register_firstName"
            label="First Name"
            error={errors.firstName}
          >
            <input
              type="text"
              id="register_firstName"
              {...register('firstName', {
                required: true,
              })}
            />
            {errors.firstName && (
              <FormFieldErrorSC>This field is required</FormFieldErrorSC>
            )}
          </FormField>
          <FormField
            id="#register_lastName"
            label="Last Name"
            error={errors.lastName}
          >
            <input
              type="text"
              id="register_lastName"
              {...register('lastName', {
                required: true,
              })}
            />
            {errors.lastName && (
              <FormFieldErrorSC>This field is required</FormFieldErrorSC>
            )}
          </FormField>
        </FlexWrapSC>
        <FormField
          id="#register_username"
          label={
            <>
              Username{' '}
              <small>
                (Only lowercase alphanumeric characters, underscores and dots.)
              </small>
            </>
          }
          error={errors.username}
        >
          <input
            type="text"
            id="register_username"
            {...register('username', {
              required: true,
              minLength: 3,
              pattern: REGEXSPS.Username,
            })}
          />
          {errors.username && (
            <FormFieldErrorSC>This field is required</FormFieldErrorSC>
          )}
        </FormField>
        <FormField
          id="#register_email"
          label="Email Address"
          error={errors.email}
        >
          <input
            type="text"
            id="register_email"
            {...register('email', { required: true, pattern: REGEXSPS.Email })}
          />
          {errors.email && (
            <FormFieldErrorSC>This field is required</FormFieldErrorSC>
          )}
        </FormField>
        <FormField
          id="#register_password"
          label={
            <>
              Password{' '}
              <small>
                (6 - 16 characters; Minimum 1 of each: uppercase, lowercase,
                number, special character)
              </small>
            </>
          }
          error={errors.password}
        >
          <input
            type="password"
            id="register_password"
            {...register('password', {
              required: true,
              pattern: REGEXSPS.Password,
            })}
          />
          {errors.password && (
            <FormFieldErrorSC>This field is required</FormFieldErrorSC>
          )}
        </FormField>
        l
        <Button
          primary
          isWide
          size="large"
          type="submit"
          loading={loading}
          onClick={() => console.log('yoo')}
        >
          Login
        </Button>
      </form>
      <footer>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </footer>
    </AuthWrapSC>
  );
};

export default Register;
