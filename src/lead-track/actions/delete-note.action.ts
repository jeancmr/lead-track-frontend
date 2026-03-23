import { leadTrackApi } from '@/api/lead-track.api';
import type { AxiosError } from 'axios';

export const deleteNoteAction = async (noteId: string): Promise<{ message: string }> => {
  try {
    const { data } = await leadTrackApi.delete<{ message: string }>(`/notes/${noteId}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? `Delete process failed`);
  }
};
