import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../store/slices/authSlice';

const PublicGuard = () => {
  const location = useLocation();
  const currentUser = useSelector(getCurrentUser);

  return !currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PublicGuard;
