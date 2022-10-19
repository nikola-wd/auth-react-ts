import { Link, NavLink } from 'react-router-dom';

import { ButtonSC } from '../../styles/ButtonSC';
import { HeaderActionsSC, HeaderSC } from '../../styles/HeaderSC';
import Logo from '../svg/Logo';
import HeaderPublicActions from './HeaderPublicActions';
import HeaderUserActions from './HeaderUserActions';
import Spinner from '../svg/Spinner';
import {
  selectCurrentUser,
  selectTryinLoginPersist,
} from '../../store/slices/authSlice';
import { useAppSelector } from '../../store/hooks';

// TODO: improve Header TryPersistLogic

const Header = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const tryingLoginPersist = useAppSelector(selectTryinLoginPersist);

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
            {!currentUser ? (
              <HeaderPublicActions />
            ) : (
              <HeaderUserActions user={currentUser} />
            )}
          </>
        )}
      </HeaderActionsSC>
    </HeaderSC>
  );
};

export default Header;
