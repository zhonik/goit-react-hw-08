import s from './AuthNav.module.css';

import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const AuthNav = () => {
  return (
    <div>
      <NavLink className={buildLinkClass} to='/register'>
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to='/login'>
        Log In
      </NavLink>
    </div>
  );
};

export default AuthNav;
