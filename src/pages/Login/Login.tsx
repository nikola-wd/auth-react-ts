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
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setLoading(true);
  };

  console.log(watch('username')); // watch input value by passing the name of it

  // TODO: Temp, remove
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AuthWrapSC>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="#login_username"
          label="Username"
          error={errors.username}
        >
          <input
            type="text"
            id="login_username"
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
        <FormField id="#login_email" label="Email Address" error={errors.email}>
          <input
            type="text"
            id="login_email"
            {...register('email', { required: true, pattern: REGEXSPS.Email })}
          />
          {errors.email && (
            <FormFieldErrorSC>This field is required</FormFieldErrorSC>
          )}
        </FormField>
        <FormField
          id="#login_password"
          label={
            <>
              Password{' '}
              <small>
                <Link to="/register">Forgot Password?</Link>
              </small>
            </>
          }
          error={errors.password}
        >
          <input
            type="password"
            id="login_password"
            {...register('password', {
              required: true,
              pattern: REGEXSPS.Password,
            })}
          />
          {errors.password && (
            <FormFieldErrorSC>This field is required</FormFieldErrorSC>
          )}
        </FormField>

        {/* <input {...register('username', { required: true })} />
        <FormField id="login_password" type="password">
          Password &nbsp;
          <small>(Forgot Password?)</small>
        </FormField> */}

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
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </footer>
    </AuthWrapSC>
  );
};

export default Login;
