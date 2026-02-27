import { leadTrackApi } from '@/api/lead-track.api';
import type { AxiosError } from 'axios';

export const logoutAction = async (): Promise<void> => {
  try {
    await leadTrackApi.post<void>('/auth/logout');
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Login failed');
  }
};
