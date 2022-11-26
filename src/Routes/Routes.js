import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layouts/Main';
import Home from '../Pages/Home/Home';
import NotFound from '../Pages/Shared/NotFound/NotFound';
import axios from 'axios';
import Category from '../Pages/Category/Category';
import { cl } from '../Helpers/Helpers';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Blogs from '../Pages/Blogs/Blogs';
import DashboardLayout from '../Layouts/DashboardLayout';
import MyOrders from '../Pages/Dashboard/MyOrders/MyOrders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>,
      },
      {
        path: '/blogs',
        element: <Blogs></Blogs>,
      },
      {
        path: '/category/:id',
        element: (
          <PrivateRoute>
            <Category></Category>
          </PrivateRoute>
        ),
        loader: async ({ params }) => axios.get(cl(`/category/${params.id}`)),
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: '/dashboard',
        element: <MyOrders></MyOrders>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound></NotFound>,
  },
]);

export default router;
