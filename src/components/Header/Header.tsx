import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import type { RootState } from '../../store/store';
import { ButtonSC } from '../../styles/ButtonSC';
import { HeaderActionsSC, HeaderSC } from '../../styles/HeaderSC';
import Logo from '../svg/Logo';

const Header = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <HeaderSC>
      <Link to="/">
        <Logo />
      </Link>
      <HeaderActionsSC>
        {!currentUser ? (
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
        ) : (
          <span>
            Welcome, <b>{currentUser.username}</b>
          </span>
        )}

        <NavLink to="/register">
          <ButtonSC type="button">Register</ButtonSC>
        </NavLink>
        <NavLink to="/login">
          <ButtonSC primary type="button">
            Login
          </ButtonSC>
        </NavLink>
      </HeaderActionsSC>
    </HeaderSC>
  );
};

export default Header;
