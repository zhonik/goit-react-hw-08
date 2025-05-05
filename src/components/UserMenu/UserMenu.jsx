import { useDispatch, useSelector } from 'react-redux';
import s from './UserMenu.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { Button } from '@mui/material';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={s.wrapper}>
      <p className={s.username}>Welcome, {user.name}</p>
      <Button
        variant='outlined'
        color='secondary'
        sx={{ padding: '0 8px' }}
        type='button'
        onClick={() => dispatch(logOut())}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
