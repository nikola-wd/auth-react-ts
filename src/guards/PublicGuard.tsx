import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const PublicGuard = () => {
  const location = useLocation();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return !currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PublicGuard;
