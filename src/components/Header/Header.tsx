import { ButtonSC } from '../../styles/ButtonSC';
import { HeaderActionsSC, HeaderSC } from '../../styles/HeaderSC';
import Logo from '../svg/Logo';

// TODO: Move to types files
type User = {
  firstName: string;
  email?: string;
};

interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => {
  return (
    <HeaderSC>
      <Logo />

      <HeaderActionsSC>
        {!user ? (
          <>
            <ButtonSC type="button">Register</ButtonSC>
            <ButtonSC primary type="button">
              Login
            </ButtonSC>
          </>
        ) : (
          <span>
            Welcome, <b>{user.firstName}</b>
          </span>
        )}
      </HeaderActionsSC>
    </HeaderSC>
  );
};

export default Header;
