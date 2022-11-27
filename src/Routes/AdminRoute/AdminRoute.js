import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useRole from '../../hooks/useRole';
import Loader from '../../Pages/Shared/Loader/Loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [userRole, userRoleLoading] = useRole(user?.email);
  const location = useLocation();

  if (loading || userRoleLoading) {
    return <Loader></Loader>;
  }

  if (user && userRole === 'admin') {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
