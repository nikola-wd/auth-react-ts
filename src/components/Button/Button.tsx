import { ButtonSC } from '../../styles/ButtonSC';
import Spinner from '../svg/Spinner';

interface ButtonProps {
  primary?: boolean;
  isWide?: boolean;
  size?: 'small' | 'large';
  type?: 'button' | 'submit';
  loading?: undefined | boolean;
  onClick?: () => void;
}

const Button = ({
  primary = false,
  isWide = false,
  size,
  children,
  type = 'button',
  loading,
  onClick,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <ButtonSC
      type={type}
      primary={primary}
      isWide={isWide}
      size={size}
      onClick={onClick}
      disabled={loading}
    >
      {children}

      {loading ? <Spinner /> : null}
    </ButtonSC>
  );
};

export default Button;
