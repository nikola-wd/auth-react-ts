import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { logOut } from '../../store/slices/authSlice';
import { ButtonSC } from '../../styles/ButtonSC';
import Dropdown from '../Dropdown/Dropdown';
import Avatar from '../svg/Avatar';
import { AuthStateAuthType } from '../../store/slices/types';
import { useLogoutMutation } from '../../store/slices/authApiSlice';

// TODO: type better
const HeaderUserActions: FC<Partial<AuthStateAuthType>> = ({ user }) => {
  const [logout, { isLoading }] = useLogoutMutation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    console.log('Logout!!!!!!!!!');

    // TODO: This is a hack, figure out how to type anotate properly
    await logout({});
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <>
      <NavLink to="/my-posts">
        <ButtonSC type="button">My Posts</ButtonSC>
      </NavLink>
      <NavLink to="/my-posts/create">
        <ButtonSC type="button">Create Post</ButtonSC>
      </NavLink>
      <Dropdown
        label={
          <>
            {user?.username && <span>{user.username}</span>} <Avatar />
          </>
        }
      >
        {user?.email && <span>{user.email}</span>}
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
