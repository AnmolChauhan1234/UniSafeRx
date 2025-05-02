import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../common/Loader';

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <Loader />;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}


// export default function ProtectedRoute({ children }) {
//   const { isLoggedIn, loading } = useAuth();
  
//   if (loading) return <Loader />;
//   if (!isLoggedIn) return <Navigate to="/login" replace />;
  
//   return children;
// }