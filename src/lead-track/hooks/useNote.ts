import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateNoteAction } from '../actions/create-update-note.action';
import { deleteNoteAction } from '../actions/delete-note.action';
import type { SubmitEvent } from 'react';
import { useAuthStore } from '@/auth/store/auth.store';
import { toast } from 'sonner';

export const useNote = (clientId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

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

  const mutation = useMutation({
    mutationFn: createUpdateNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client'] });
    },
  });

  const handleAddNote = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const note = formData.get('note') as string;

    if (note === '') return;

    const noteBody = {
      note: { content: note, id: '' },
      userId: user?.id,
      clientId: +clientId,
    };

    await noteMutation.mutateAsync(noteBody, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteNoteMutation.mutateAsync(noteId, {
      onSuccess: () => toast.success(`Note deleted succesfully`),
      onError: (error) => toast.error(error.message),
    });
  };

  return { mutation, onDeleteNote: handleDeleteNote };
};
