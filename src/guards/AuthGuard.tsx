import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../store/slices/authSlice';
import { useAppSelector } from '../store/hooks';

const AuthGuard = () => {
  const location = useLocation();
  const currentUser = useAppSelector(getCurrentUser);

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;
