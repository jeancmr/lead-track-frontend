import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUpdateClientAction } from '../actions/create-update-client.action';
import { getClientByIdAction } from '../actions/get-client-by-id.action';

export const useClient = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['client', { id }],
    queryFn: () => getClientByIdAction(id),
    staleTime: 1000 * 6 * 5,
  });

  const mutation = useMutation({
    mutationFn: createUpdateClientAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });

  return { ...query, mutation };
};
