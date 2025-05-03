import s from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      <NavLink className={buildLinkClass} to='/'>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={buildLinkClass} to='/contacts'>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
