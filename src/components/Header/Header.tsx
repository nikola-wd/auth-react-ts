import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import type { RootState } from '../../store/store';
import { ButtonSC } from '../../styles/ButtonSC';
import { HeaderActionsSC, HeaderSC } from '../../styles/HeaderSC';
import Logo from '../svg/Logo';
import HeaderPublicActions from './HeaderPublicActions';
import HeaderUserActions from './HeaderUserActions';

const Header = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <HeaderSC>
      {currentUser ? (
        <Link to="/">
          <Logo />
        </Link>
      ) : (
        <Logo />
      )}

      <NavLink to="/posts">
        <ButtonSC type="button">Posts</ButtonSC>
      </NavLink>

      <HeaderActionsSC>
        {!currentUser ? <HeaderPublicActions /> : <HeaderUserActions />}
      </HeaderActionsSC>
    </HeaderSC>
  );
};

export default Header;
