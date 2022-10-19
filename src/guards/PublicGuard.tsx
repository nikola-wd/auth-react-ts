import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { selectCurrentUser } from '../store/slices/authSlice';
import { useAppSelector } from '../store/hooks';

const PublicGuard = () => {
  const location = useLocation();
  const currentUser = useAppSelector(selectCurrentUser);

  return !currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PublicGuard;
