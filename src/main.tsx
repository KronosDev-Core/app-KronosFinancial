import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Core from '@Components/Core';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Core />
  </StrictMode>,
);
