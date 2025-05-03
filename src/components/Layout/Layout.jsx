import AppBar from '../AppBar/AppBar';
import s from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={s.app}>
      <AppBar />
      {children}
    </div>
  );
};

export default Layout;
