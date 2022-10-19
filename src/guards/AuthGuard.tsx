import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { selectCurrentUser } from '../store/slices/authSlice';
import { useAppSelector } from '../store/hooks';

const AuthGuard = () => {
  const location = useLocation();
  const currentUser = useAppSelector(selectCurrentUser);

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthGuard;
