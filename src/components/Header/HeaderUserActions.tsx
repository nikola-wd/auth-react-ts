import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/slices/authSlice';
import type { RootState } from '../../store/store';
import { ButtonSC } from '../../styles/ButtonSC';
import { getLogoutUser } from '../../utils/api';
import { HttpStatus } from '../../utils/http-status.enum';
import Dropdown from '../Dropdown/Dropdown';
import Avatar from '../svg/Avatar';

const HeaderUserActions = () => {
  const access_token = useSelector(
    (state: RootState) => state.auth.access_token
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  // TODO: If access_token is missing in memory, do the refresh first
  const handleLogout = async () => {
    console.log('Logout!!!!!!!!!');
    setIsLoading(true);

    try {
      const res = await getLogoutUser({
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // TODO: Update HttpStatus.OK (200) to a more appropriate one
      console.log(res.status);

      if (res.status !== HttpStatus.OK) {
        console.log('res err: ', res);
        // TODO: Better err handling
      } else {
        console.log('res is ok');
        dispatch(logOut());
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dropdown
      label={
        <>
          Username <Avatar />
        </>
      }
    >
      <span>test@test.com</span>
      <ButtonSC
        primary
        type="button"
        onClick={handleLogout}
        disabled={isLoading}
      >
        Logout
      </ButtonSC>
    </Dropdown>
  );
};

export default HeaderUserActions;
