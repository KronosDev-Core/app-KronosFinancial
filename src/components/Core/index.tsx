import { FC } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Error from '@Components/Template/error';
import App from '@Local/app';

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
          element: <></>,
        },
        {
          path: 'stock',
          element: <></>,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default Core;
