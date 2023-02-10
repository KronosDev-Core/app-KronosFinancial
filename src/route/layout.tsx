import { FC } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';

import Error from './(components)/error';
import Dashboard from './app/dashboard/layout';
import Dividends from './app/dividends/layout';
import Stocks from './app/stocks/layout';

const Layout: FC = (): JSX.Element => {
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
          element: <Dashboard />,
        },
        {
          path: 'calendar',
          element: <Dividends />,
        },
        {
          path: 'stock',
          element: <Stocks />,
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

export default Layout;
