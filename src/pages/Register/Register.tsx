import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { AuthWrapSC } from '../../components/AuthWrap/AuthWrapSC';
import FormField from '../../components/FormField/FormField';
import { FormFieldErrorSC } from '../../styles/FormFieldErrorSC';
import { REGEXSPS } from '../../utils/REGEXPS';
import Button from '../../components/Button/Button';
import { FlexWrapSC } from '../../styles/FlexWrapSC';
import { postRegisterUser } from '../../utils/api';
import { setAuth } from '../../store/slices/authSlice';
import { ERR_MSG } from '../../utils/ERR_MSG';
import { HttpStatus } from '../../utils/http-status.enum';

type Inputs = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  // TODO: Temp, remove
  // Or create a helper hook that returns data, loading, and error states
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<null | Inputs>(null);

  useEffect(() => {
    if (formData) {
      setLoading(true);

      console.log('SHOULD FETCH NOW');
      const controller = new AbortController();

      const tryRegister = async () => {
        try {
          const res = await postRegisterUser(formData, {
            signal: controller.signal,
          });

          if (res.status !== HttpStatus.CREATED) {
            throw new Error('Bad Request');
          }

          const { access_token } = res.data;
          let decoded_AT: { email: string; username: string } =
            jwt_decode(access_token);
          const { email, username } = decoded_AT;

          dispatch(setAuth({ user: { email, username }, access_token }));
          navigate(from, { replace: true });
        } catch (err) {
          console.log('ERRORRRRR: ', err);
        } finally {
          setLoading(false);
        }
      };

      tryRegister();

      return () => {
        controller.abort();
      };
    }
  }, [dispatch, formData, from, navigate]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFormData(data);
  };

  // TODO: Maybe move error mesages to a helper constants file, or get them from server if somehow this passes
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
              <FormFieldErrorSC>
                {ERR_MSG.REGISTER_USER.F_NAME}
              </FormFieldErrorSC>
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
              <FormFieldErrorSC>
                {ERR_MSG.REGISTER_USER.L_NAME}
              </FormFieldErrorSC>
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
            <FormFieldErrorSC>
              {ERR_MSG.REGISTER_USER.USERNAME}
            </FormFieldErrorSC>
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
            <FormFieldErrorSC>{ERR_MSG.REGISTER_USER.EMAIL}</FormFieldErrorSC>
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
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </footer>
    </AuthWrapSC>
  );
};

export default Register;
