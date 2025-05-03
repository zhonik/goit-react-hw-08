import s from './AuthNav.module.css';

import { NavLink } from 'react-router-dom';

const AuthNav = () => {
  return (
    <div>
      <NavLink className={s.link} to='/register'>
        Register
      </NavLink>
      <NavLink className={s.link} to='/login'>
        Log In
      </NavLink>
    </div>
  );
};

export default AuthNav;
