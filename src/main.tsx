import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Layout from 'route/layout';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
);
