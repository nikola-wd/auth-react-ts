import { Link, NavLink } from 'react-router-dom';

import { ButtonSC } from '../../styles/ButtonSC';
import { HeaderActionsSC, HeaderSC } from '../../styles/HeaderSC';
import Logo from '../svg/Logo';
import HeaderPublicActions from './HeaderPublicActions';
import HeaderUserActions from './HeaderUserActions';
import Spinner from '../svg/Spinner';
import {
  getCurrentUser,
  getTryinLoginPersist,
} from '../../store/slices/authSlice';
import { useAppSelector } from '../../store/hooks';

// TODO: improve Header TryPersistLogic

const Header = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const tryingLoginPersist = useAppSelector(getTryinLoginPersist);

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
