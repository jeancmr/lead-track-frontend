import { leadTrackApi } from '@/api/lead-track.api';
import type { AxiosError } from 'axios';

export const deleteClientAction = async (clientId: number): Promise<{ message: string }> => {
  try {
    const { data } = await leadTrackApi.delete<{ message: string }>(`/clients/${String(clientId)}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? `Delete process failed`);
  }
};
