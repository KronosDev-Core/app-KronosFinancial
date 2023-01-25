import { FC } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';

import Error from '@Components/Template/error';
import App from '@Local/pages/app';
import Calendar from '@Local/pages/calendar';
import Stock from '@Local/pages/stock';

const Core: FC = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Outlet />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Navigate to="/dashboard" replace={!0} />,
        },
        {
          path: 'dashboard',
          element: <App />,
        },
        {
          path: 'calendar',
          element: <Calendar />,
        },
        {
          path: 'stock',
          element: <Stock />,
          children: [
            {
              path: ':id',
              element: <></>,
            },
          ],
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
};

export default Core;
