import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LeadTrackApp } from './LeadTrackApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LeadTrackApp />
  </StrictMode>,
);
