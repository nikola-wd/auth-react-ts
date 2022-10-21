import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import FormField from '../../components/FormField/FormField';
import { FormWrapSC } from '../../styles/FormWrapSC';
import { FormFieldErrorSC } from '../../styles/FormFieldErrorSC';
import { REGEXSPS } from '../../utils/REGEXPS';
import Button from '../../components/Button/Button';
import { ERR_MSG } from '../../utils/ERR_MSG';
import { LoginUserInputs } from './types';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';
import { useLoginMutation } from '../../store/slices/authApiSlice';

// TODO: Handle error sent from the server on login and register
const Login = () => {
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInputs>();

  const onSubmit: SubmitHandler<LoginUserInputs> = async (data) => {
    try {
      const userData = await login({ ...data }).unwrap();
      console.log('Login User Data: ', userData);

      // TODO: Maybe this can be done from inside authApiSlice. Same for Register
      dispatch(setCredentials({ ...userData }));
      navigate(from, { replace: true });
    } catch (err) {
      // TODO: Handle error better
      console.log('ERRORRRRR: ', err);
    }
  };

  return (
    <FormWrapSC>
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
              // required: true,
              minLength: 3,
              pattern: REGEXSPS.Username,
            })}
          />
          {errors.username && (
            <FormFieldErrorSC>
              {ERR_MSG.REGISTER_USER.USERNAME}
            </FormFieldErrorSC>
          )}
        </FormField>
        <FormField id="#login_email" label="Email Address" error={errors.email}>
          <input
            type="text"
            id="login_email"
            {...register('email', { required: true, pattern: REGEXSPS.Email })}
          />
          {errors.email && (
            <FormFieldErrorSC>{ERR_MSG.REGISTER_USER.EMAIL}</FormFieldErrorSC>
          )}
        </FormField>
        <FormField
          id="#login_password"
          label={
            <>
              Password{' '}
              <small>
                <Link to="/register" tabIndex={-1}>
                  Forgot Password?
                </Link>
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
            <FormFieldErrorSC>
              {ERR_MSG.REGISTER_USER.PASSWORD}
            </FormFieldErrorSC>
          )}
        </FormField>

        <Button
          primary
          isWide
          size="large"
          type="submit"
          loading={isLoading}
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
    </FormWrapSC>
  );
};

export default Login;
