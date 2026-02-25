import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';

export const LeadTrackApp = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
