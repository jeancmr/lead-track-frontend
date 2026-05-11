import { useState } from 'react';
import { toast } from 'sonner';
import { useNote } from './useNote';
import type { Note } from '@/interfaces/note.interface';
import type { User } from '@/interfaces/user.interface';
import type { ClientNoteFormValues } from '../schemas/client-note.schema';

export const useClientPageNotes = (user: User | null, idClient: number) => {
  const [noteDialog, setNoteDialog] = useState(false);

  const [selectedNote, setSelectedNote] = useState<Note | null>();

  const { mutation: noteMutation, onDeleteNote } = useNote();

  const handleNoteSubmit = async (noteData: ClientNoteFormValues) => {
    const noteBody = {
      note: { content: noteData.content, id: noteData.id || '' },
      userId: user?.id,
      clientId: idClient,
    };

    await noteMutation.mutateAsync(noteBody, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    handleCloseNoteDialog();
  };

  const handleOpenNoteDialog = async (note: Note) => {
    setSelectedNote(note);
    setNoteDialog(true);
  };

  const handleCloseNoteDialog = () => {
    setNoteDialog(false);

    setTimeout(() => {
      setSelectedNote(null);
    }, 200);
  };
  return {
    noteModule: {
      noteDialog,
      selectedNote,
      handleCloseNoteDialog,
      handleNoteSubmit,
      handleOpenNoteDialog,
      onDeleteNote,
      setNoteDialog,
      setSelectedNote,
    },
  };
};
