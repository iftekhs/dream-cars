import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layouts/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: (
          <>
            <h4>Awesome!</h4>
          </>
        ),
      },
    ],
  },
]);

export default router;
