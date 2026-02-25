import { createBrowserRouter, Navigate } from 'react-router';
import { LeadTrackLayout } from './lead-track/layout/LeadTrackLayout';
import { DashboardPage } from './lead-track/pages/dashboard/DashboardPage';
import { ClientsPage } from './lead-track/pages/clients/ClientsPage';
import { ClientPage } from './lead-track/pages/client/ClientPage';
import { TasksPage } from './lead-track/pages/tasks/TasksPage';
import { LoginPage } from './auth/pages/login/LoginPage';
import { Authlayout } from './auth/layout/AuthLayout';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <LeadTrackLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: 'clients',
        element: <ClientsPage />,
      },
      {
        path: 'client/:idClient',
        element: <ClientPage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />,
      },
    ],
  },

  //   AUTH routes
  {
    path: '/auth',
    element: <Authlayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);
