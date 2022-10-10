import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../store/slices/authSlice';
import { useAppSelector } from '../store/hooks';

const PublicGuard = () => {
  const location = useLocation();
  const currentUser = useAppSelector(getCurrentUser);

  return !currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PublicGuard;
