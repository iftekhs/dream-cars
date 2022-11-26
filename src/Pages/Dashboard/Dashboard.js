import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useRole from '../../hooks/useRole';
import AllUsers from './Admin/AllUsers/AllUsers';
import MyProducts from './Sellers/MyProducts/MyProducts';
import MyOrders from './Users/MyOrders/MyOrders';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userRole] = useRole(user?.email);

  if (userRole === 'user') {
    return <MyOrders></MyOrders>;
  } else if (useRole === 'seller') {
    return <MyProducts></MyProducts>;
  }

  return <AllUsers></AllUsers>;
};

export default Dashboard;
