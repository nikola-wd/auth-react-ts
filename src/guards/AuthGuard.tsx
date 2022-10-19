import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { selectCurrentToken } from '../store/slices/authSlice';
import { useAppSelector } from '../store/hooks';

const AuthGuard = () => {
  const location = useLocation();
  const currentToken = useAppSelector(selectCurrentToken);

  return currentToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;
