import { NavLink } from 'react-router-dom';
import { ButtonSC } from '../../styles/ButtonSC';

const HeaderPublicActions = () => {
  return (
    <>
      <NavLink to="/register">
        <ButtonSC type="button">Register</ButtonSC>
      </NavLink>
      <NavLink to="/login">
        <ButtonSC primary type="button">
          Login
        </ButtonSC>
      </NavLink>
    </>
  );
};

export default HeaderPublicActions;
