import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getClientByIdAction } from '../actions/get-client-by-id.action';
import { createUpdateNoteAction } from '../actions/create-update-note.action';
import { deleteNoteAction } from '../actions/delete-note.action';

export const useClient = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['client', { id }],
    queryFn: () => getClientByIdAction(id),
    staleTime: 1000 * 6 * 5,
  });

  const noteMutation = useMutation({
    mutationFn: createUpdateNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });

  return { ...query, noteMutation, deleteNoteMutation };
};
