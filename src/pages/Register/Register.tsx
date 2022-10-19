import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { FormWrapSC } from '../../styles/FormWrapSC';
import FormField from '../../components/FormField/FormField';
import { FormFieldErrorSC } from '../../styles/FormFieldErrorSC';
import { REGEXSPS } from '../../utils/REGEXPS';
import Button from '../../components/Button/Button';
import { FlexWrapSC } from '../../styles/FlexWrapSC';
import { setCredentials } from '../../store/slices/authSlice';
import { ERR_MSG } from '../../utils/ERR_MSG';
// import { HttpStatus } from '../../utils/http-status.enum';
import { RegisterUserInputs } from './types';
import { useAppDispatch } from '../../store/hooks';
import { useRegisterMutation } from '../../store/slices/authApiSlice';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [registerUser, { isLoading }] = useRegisterMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<RegisterUserInputs>();

  const onSubmit: SubmitHandler<RegisterUserInputs> = async (data) => {
    // setFormData(data);

    try {
      const userData = await registerUser({ ...data }).unwrap();
      console.log('Register User Data: ', userData);

      // TODO: Test if this still works, or I need to import error from useRegisterMutation
      // if (res.status !== HttpStatus.CREATED) {
      //   throw new Error('Bad Request');
      // }

      dispatch(setCredentials({ ...userData }));
      navigate(from, { replace: true });
    } catch (err) {
      // TODO: handle error better
      console.log('Register ERRORRRRR: ', err);
    }
  };

  // TODO: Maybe move error mesages to a helper constants file, or get them from server if somehow this passes
  return (
    <FormWrapSC>
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
          loading={isLoading}
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
    </FormWrapSC>
  );
};

export default Register;
