import { leadTrackApi } from '@/api/lead-track.api';
import type { AxiosError } from 'axios';
import type { CreateUpdateNoteResponse } from '../interfaces/create-update-note.response';
import type { Note } from '@/interfaces/note.interface';

interface NoteBody {
  clientId: number | undefined;
  userId: number | undefined;
  note: Partial<Note>;
}

export const createUpdateNoteAction = async (
  noteBody: NoteBody,
): Promise<CreateUpdateNoteResponse> => {
  const { id, content } = noteBody.note;

  try {
    const { data } = await leadTrackApi<CreateUpdateNoteResponse>({
      url: id === '' ? 'notes' : `notes/${id}`,
      method: id === '' ? 'POST' : 'PATCH',
      data: { content, userId: noteBody.userId, clientId: noteBody.clientId },
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? `${id ? 'Insert' : 'Update'} failed`);
  }
};
