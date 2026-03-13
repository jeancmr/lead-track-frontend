import { useSearchParams } from 'react-router';
import { getClientsAction } from '../actions/get-clients.action';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUpdateClientAction } from '../actions/create-update-client.action';
import { useAuthStore } from '@/auth/store/auth.store';

export const useClients = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const limit = Number(searchParams.get('limit')) || 9;
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all';

  const query = useQuery({
    queryKey: ['clients', { limit, page, search, status, user }],
    queryFn: () => getClientsAction({ limit, page, search, status }),
    staleTime: 1000 * 6 * 5,
  });

  const mutation = useMutation({
    mutationFn: createUpdateClientAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  return { ...query, mutation };
};
