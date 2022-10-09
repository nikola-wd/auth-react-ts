import { useEffect, useRef, useState, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import usePersist from '../../../hooks/usePersist';
import useRefreshToken from '../../../hooks/useRefreshToken';
import { setAuth } from '../../../store/slices/authSlice';
import type { RootState } from '../../../store/store';
import Button from '../../Button/Button';
import Spinner from '../../svg/Spinner';

// TODO: useRefreshMutation (check github)

const TryPersistLogin = () => {
  const token = useSelector((state: RootState) => state.auth.access_token);

  const [persist] = usePersist();
  const effectRan = useRef<boolean>(false);
  const [trueSuccess, setTrueSuccess] = useState<boolean>(false);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshToken();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        console.log('Verifying refresh token');
        try {
          // TODO: When finished, dispatch setAuth here,
          // or maybe create another useEffect that sets the data when trueSuccess is true
          const { access_token, username, email } = await refresh();
          if (access_token && username && email) {
            setAuth({
              access_token,
              user: {
                username,
                email,
              },
            });
          }
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      // When page is refreshed, we lose the data
      // TODO: Maybe remove persist
      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // used to remove the missing deps error
    // so that this runs only once, when the component mounts
    // eslint-disable-next-line
  }, []);

  let content: ReactElement = <></>;

  // TODO: Maybe remove persist helper
  if (!persist) {
    // persist: no
    console.log('PersistLogin:no persist');
    content = <Outlet />;
  } else if (isLoading) {
    // persist: yes, token: no
    console.log('PersistLogin:loading');
    // TODO: Maybe overlay loader component here
    content = (
      <p>
        <Spinner /> Loading...
      </p>
    );
  } else if (isError) {
    // persist: yes, token: no
    console.log('PersistLogin:error');
    // TODO: Maybe global overlay error comp
    content = (
      <div className="errmsg">
        <p>{error?.data?.message}</p>
        {/* TODO: Maybe redirect instead of showing this message */}
        <Link to="/login">
          <Button danger> Please login again</Button>
        </Link>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    // persist: yes, token: yes
    console.log('PersistLogin:success');
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // persist: yes, token: yes
    console.log('PersistLogin:token and uninitialized');
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default TryPersistLogin;
