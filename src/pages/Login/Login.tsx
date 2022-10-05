import { AuthWrapSC } from '../../components/AuthWrap/AuthWrapSC';
import { ButtonSC } from '../../styles/ButtonSC';
import FormField from '../../components/FormField/FormField';
import { useForm, SubmitHandler } from 'react-hook-form';
import React from 'react';
import { FormFieldWrap } from '../../styles/FormFieldWrap';
import { InputSC } from '../../components/Input/InputSC';
import { FormFieldErrorSC } from '../../styles/FormFieldErrorSC';
import { Link } from 'react-router-dom';
import { REGESPS } from '../../utils/REGEXPS';

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('username')); // watch input value by passing the name of it

  return (
    <AuthWrapSC>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="#login_username"
          label="Username (Only lowercase alphanumeric characters, underscores and dots.)"
          error={errors.username}
        >
          <input
            type="text"
            id="login_username"
            {...register('username', {
              required: true,
              minLength: 3,
              pattern: REGESPS.Username,
            })}
          />
          {errors.username && (
            <FormFieldErrorSC>This field is required</FormFieldErrorSC>
          )}
        </FormField>
        <FormField id="#login_email" label="Email Address" error={errors.email}>
          <input
            type="text"
            id="login_email"
            {...register('email', { required: true, pattern: REGESPS.Email })}
          />
          {errors.email && (
            <FormFieldErrorSC>This field is required</FormFieldErrorSC>
          )}
        </FormField>

        {/* <input {...register('username', { required: true })} />
        <FormField id="login_password" type="password">
          Password &nbsp;
          <small>(Forgot Password?)</small>
        </FormField> */}

        <ButtonSC
          primary
          isWide
          size="large"
          type="submit"
          onClick={() => console.log('yoo')}
        >
          Login
        </ButtonSC>
      </form>

      <footer>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </footer>
    </AuthWrapSC>
  );
};

export default Login;
