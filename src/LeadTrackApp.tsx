import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';
import type { PropsWithChildren } from 'react';
import { useAuthStore } from './auth/store/auth.store';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import { Toaster } from './components/ui/sonner';

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus, user } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ['auth', { user }],
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
        <Toaster />
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
