import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';

import Error from '@Components/error';
import Dashboard from '@App/dashboard/layout';
import Dividends from '@App/dividends/layout';
import Stocks from '@App/stocks/layout';
import AppLayout from '@App/layout';

export default function Layout() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Outlet />,
      errorElement: <Error />,
      children: [
        {
          path: 'app',
          element: <AppLayout />,
          children: [
            {
              path: '',
              element: <Navigate to="dashboard" replace={!0} />,
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
              path: 'stocks',
              element: <Stocks />,
              children: [
                {
                  path: ':id',
                  element: <></>,
                },
              ],
            },
            {
              path: 'account',
              element: <Outlet/>,
              children: [
                {
                  path: '',
                  element: <Navigate to="profile" replace={!0} />,
                },
                {
                  path: 'profile',
                  element: <></>,
                },
                {
                  path: 'settings',
                  element: <></>,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: 'logout',
      element: <></>,
    },
    {
      path: 'login',
      element: <></>,
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
}
