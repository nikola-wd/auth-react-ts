import { AuthWrapSC } from '../../components/AuthWrap/AuthWrapSC';
import { ButtonSC } from '../../styles/ButtonSC';
import FormField from '../../components/FormField/FormField';
import { FlexWrapSC } from '../../styles/FlexWrapSC';

const Register = () => {
  return (
    <AuthWrapSC>
      <h2>Register</h2>

      <FlexWrapSC cols={2}>
        <FormField id="login_first_name">First Name</FormField>
        <FormField id="login_last_name">Last Name</FormField>
      </FlexWrapSC>
      <FormField id="login_username">Username</FormField>
      <FormField id="login_email" type="email">
        Email
      </FormField>
      <FormField id="login_password" type="password">
        Password
      </FormField>
      {/* <InputSC tag="textarea" /> */}

      <ButtonSC primary isWide size="large" onClick={() => console.log('yoo')}>
        Login
      </ButtonSC>

      <footer>
        <p>Already have an account? Sign In</p>
      </footer>
    </AuthWrapSC>
  );
};

export default Register;
