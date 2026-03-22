import { useSearchParams } from 'react-router';
import { getClientsAction } from '../actions/get-clients.action';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUpdateClientAction } from '../actions/create-update-client.action';
import { useAuthStore } from '@/auth/store/auth.store';
import { deleteClientAction } from '../actions/delete-client.action';

export const useClients = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const queryLimit = Number(searchParams.get('limit')) || 10;
  const queryPage = Number(searchParams.get('page')) || 1;
  const limit = queryLimit < 0 ? 10 : queryLimit;
  const page = queryPage < 0 ? 1 : queryPage;
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

  const deleteMutation = useMutation({
    mutationFn: deleteClientAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  return { ...query, mutation, deleteMutation };
};
