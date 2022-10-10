import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useAppDispatch } from '../../store/hooks';
import { logOut } from '../../store/slices/authSlice';
import { ButtonSC } from '../../styles/ButtonSC';
import { HttpStatus } from '../../utils/http-status.enum';
import Dropdown from '../Dropdown/Dropdown';
import Avatar from '../svg/Avatar';

const HeaderUserActions = () => {
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // TODO: If access_token is missing in memory, do the refresh first
  const handleLogout = async () => {
    console.log('Logout!!!!!!!!!');
    setIsLoading(true);

    try {
      const res = await axiosPrivate.get('/auth/local/logout');

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
    <>
      <NavLink to="/my-posts">
        <ButtonSC type="button">My Posts</ButtonSC>
      </NavLink>
      <NavLink to="/posts/create">
        <ButtonSC type="button">TODO: Create Post</ButtonSC>
      </NavLink>
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
    </>
  );
};

export default HeaderUserActions;
