import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import FormField from '../../components/FormField/FormField';
import { FormWrapSC } from '../../styles/FormWrapSC';
import { FormFieldErrorSC } from '../../styles/FormFieldErrorSC';
import { REGEXSPS } from '../../utils/REGEXPS';
import Button from '../../components/Button/Button';
import { setCredentials } from '../../store/slices/authSlice';
import { ERR_MSG } from '../../utils/ERR_MSG';
import { postLoginUser } from '../../utils/api';
import { HttpStatus } from '../../utils/http-status.enum';
import { decode_at } from '../../utils/decode_at';
import { LoginUserInputs } from './types';
import { useAppDispatch } from '../../store/hooks';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<null | LoginUserInputs>(null);
  // const [_, setPersist] = usePersist()

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInputs>();

  useEffect(() => {
    if (formData) {
      setLoading(true);

      console.log('SHOULD FETCH NOW');
      const controller = new AbortController();

      const tryLogin = async () => {
        try {
          const res = await postLoginUser(formData, {
            signal: controller.signal,
          });

          if (res.status !== HttpStatus.OK) {
            throw new Error('Bad Request');
          }

          const { access_token } = res.data;
          const { email, username } = decode_at(access_token);

          dispatch(setCredentials({ user: { email, username }, access_token }));
          navigate(from, { replace: true });
        } catch (err) {
          console.log('ERRORRRRR: ', err);
        } finally {
          setLoading(false);
        }
      };

      tryLogin();

      return () => {
        controller.abort();
      };
    }
  }, [dispatch, formData, from, navigate]);

  const onSubmit: SubmitHandler<LoginUserInputs> = (data) => {
    setFormData(data);
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
    </FormWrapSC>
  );
};

export default Login;
