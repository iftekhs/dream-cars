import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layouts/Main';
import Home from '../Pages/Home/Home';
import NotFound from '../Pages/Shared/NotFound/NotFound';
import axios from 'axios';
import Category from '../Pages/Category/Category';
import { cl } from '../Helpers/Helpers';
import Login from '../Pages/Login/Login';

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
        path: '/category/:id',
        element: (
          <>
            <Category></Category>
          </>
        ),
        loader: async ({ params }) => axios.get(cl(`/category/${params.id}`)),
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound></NotFound>,
  },
]);

export default router;
