import { AuthWrap } from '../../components/AuthWrap/AuthWrapSC';
import { ButtonSC } from '../../styles/ButtonSC';
import { FieldSC } from '../../components/Input/InputSC';

const Login = () => {
  return (
    <div>
      <AuthWrap>
        <h2>Login</h2>
        <FieldSC />
        <FieldSC tag="textarea" />

        <ButtonSC
          primary
          isWide
          size="large"
          onClick={() => console.log('yoo')}
        >
          Login
        </ButtonSC>
      </AuthWrap>
    </div>
  );
};

export default Login;
