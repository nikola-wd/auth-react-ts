import { AuthWrapSC } from '../../components/AuthWrap/AuthWrapSC';
import { ButtonSC } from '../../styles/ButtonSC';
import FormField from '../../components/FormField/FormField';
import { useForm, SubmitHandler } from 'react-hook-form';
import React from 'react';
import { FormFieldWrap } from '../../styles/FormFieldWrap';
import { InputSC } from '../../components/Input/InputSC';

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
        {/* <FormField id="login_username">Username</FormField> */}

        <FormField id="#login_email" label="Email Address">
          <input
            type="text"
            id="login_email"
            {...register('username', { required: true })}
          />
          {errors.username && <span>This field is required</span>}
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
        <p>Don't have an account? Register</p>
      </footer>
    </AuthWrapSC>
  );
};

export default Login;
