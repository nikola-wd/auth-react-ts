import { AuthWrapSC } from '../../components/AuthWrap/AuthWrapSC';
import { ButtonSC } from '../../styles/ButtonSC';
import FormField from '../../components/FormField/FormField';

const Login = () => {
  return (
    <AuthWrapSC>
      <h2>Login</h2>
      <FormField id="login_username">Username</FormField>
      <FormField id="login_email" type="email">
        Email
      </FormField>
      <FormField id="login_password" type="password">
        Password &nbsp;
        <small>(Forgot Password?)</small>
      </FormField>

      <ButtonSC primary isWide size="large" onClick={() => console.log('yoo')}>
        Login
      </ButtonSC>

      <footer>
        <p>Don't have an account? Register</p>
      </footer>
    </AuthWrapSC>
  );
};

export default Login;
