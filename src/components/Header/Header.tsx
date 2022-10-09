import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import type { RootState } from '../../store/store';
import { ButtonSC } from '../../styles/ButtonSC';
import { HeaderActionsSC, HeaderSC } from '../../styles/HeaderSC';
import Logo from '../svg/Logo';
import HeaderPublicActions from './HeaderPublicActions';
import HeaderUserActions from './HeaderUserActions';
import Spinner from '../svg/Spinner';

// TODO: improve Header TryPersistLogic

const Header = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const tryingLoginPersist = useSelector(
    (state: RootState) => state.auth.tryingLoginPersist,
  );

  return (
    <HeaderSC>
      {currentUser && !tryingLoginPersist ? (
        <Link to="/">
          <Logo />
        </Link>
      ) : (
        <Logo />
      )}

      <HeaderActionsSC>
        {tryingLoginPersist ? (
          <Spinner />
        ) : (
          <>
            <NavLink to="/posts">
              <ButtonSC type="button">Posts</ButtonSC>
            </NavLink>
            {/* TODO: Fix login buttons blinking */}
            {!currentUser ? <HeaderPublicActions /> : <HeaderUserActions />}
          </>
        )}
      </HeaderActionsSC>
    </HeaderSC>
  );
};

export default Header;
