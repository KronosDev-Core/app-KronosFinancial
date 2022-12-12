import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Error from '@Components/Template/error';
import App from '@Local/app';

const Core: FC = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <Error />,
      // children: [
      //   {
      //     path: '/',
      //     element: <App />,
      //   },
      // ],
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
