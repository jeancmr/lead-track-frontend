import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';
import type { PropsWithChildren } from 'react';
import { useAuthStore } from './auth/store/auth.store';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
  });

  if (isLoading) return <CustomFullScreenLoading />;

  return children;
};

export const LeadTrackApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
    </QueryClientProvider>
  );
};
