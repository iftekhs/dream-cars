import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useRole from '../../hooks/useRole';
import Loader from '../Shared/Loader/Loader';
import AllUsers from './Admin/AllUsers/AllUsers';
import MyProducts from './Sellers/MyProducts/MyProducts';
import MyOrders from './Users/MyOrders/MyOrders';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userRole] = useRole(user?.email);

  if (userRole) {
    if (userRole === 'user') {
      return <MyOrders></MyOrders>;
    }
    if (userRole === 'seller') {
      return <MyProducts></MyProducts>;
    }
    return <AllUsers></AllUsers>;
  }

  return <Loader></Loader>;
};

export default Dashboard;
