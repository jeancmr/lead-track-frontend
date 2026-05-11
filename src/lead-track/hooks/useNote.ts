import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createUpdateNoteAction } from '../actions/create-update-note.action';
import { deleteNoteAction } from '../actions/delete-note.action';

export const useNote = () => {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });

  const mutation = useMutation({
    mutationFn: createUpdateNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });

  const handleDeleteNote = async (noteId: string) => {
    await deleteNoteMutation.mutateAsync(noteId, {
      onSuccess: () => toast.success(`Note deleted succesfully`),
      onError: (error) => toast.error(error.message),
    });
  };

  return { mutation, onDeleteNote: handleDeleteNote };
};
