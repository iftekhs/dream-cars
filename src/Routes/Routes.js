import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layouts/Main';
import Home from '../Pages/Home/Home';
import NotFound from '../Pages/Shared/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: (
          <>
            <Home></Home>
          </>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound></NotFound>,
  },
]);

export default router;
