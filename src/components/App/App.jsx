// import css from './App.module.css';

import { lazy, Suspense, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from '../RestrictedRoute';
import PrivateRoute from '../PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { createTheme, ThemeProvider } from '@mui/material';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('../../pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage '));
const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'));

const theme = createTheme({
  palette: {
    salmon: {
      main: '#FF5733',
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <ThemeProvider theme={theme}>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/register'
              element={<RestrictedRoute redirectTo='/contacts' component={<RegistrationPage />} />}
            />
            <Route
              path='/login'
              element={<RestrictedRoute redirectTo='/contacts' component={<LoginPage />} />}
            />
            <Route
              path='/contacts'
              element={<PrivateRoute redirectTo='/login' component={<ContactsPage />} />}
            />
          </Routes>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
