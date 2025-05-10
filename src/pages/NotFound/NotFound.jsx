import { Navigate } from 'react-router-dom';

const NotFound = () => {
  return <Navigate to={'/'}>Not Found Page</Navigate>;
};

export default NotFound;
