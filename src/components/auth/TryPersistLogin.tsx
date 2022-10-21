import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTryRefreshAccessTokenQuery } from '../../store/slices/authApiSlice';
import {
  selectCurrentToken,
  setCredentials,
  setTryingLoginPersist,
} from '../../store/slices/authSlice';
import Button from '../Button/Button';
import Spinner from '../svg/Spinner';

const TryPersistLogin = () => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();
  const dispatch = useAppDispatch();

  // TODO: Maybe convert to mutation so that we don't try refetch for public pages
  const { data, isLoading, isSuccess, isError } = useTryRefreshAccessTokenQuery(
    {},
  );

  console.log('LOCATION: ', location);
  useEffect(() => {
    if (isLoading) {
      console.log('SET INITIAL GLOBAL LOADER___________________');
      dispatch(setTryingLoginPersist(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess || isError) {
      console.log('RESET INITIAL GLOBAL LOADER___________________');
      dispatch(setTryingLoginPersist(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  // TODO: Maybe a helper array with public routes
  if (location.pathname.startsWith('/posts')) {
    return <Outlet />;
  }

  let content = <></>;

  if (token) {
    return <Outlet />;
  }

  if (isLoading) {
    content = (
      <p>
        <Spinner /> Loading...
      </p>
    );
  } else if (isError) {
    content = (
      <div className="errmsg">
        <p>Current Path: {location.pathname}</p>
        <p>Please Login Again</p>
        {/* TODO: Maybe redirect instead of showing this message */}
        <Link to="/login">
          <Button danger> Please login again</Button>
        </Link>
      </div>
    );
  } else if (isSuccess) {
    dispatch(setCredentials({ ...data }));
    content = <Outlet />;
  }

  return content;
};

export default TryPersistLogin;
