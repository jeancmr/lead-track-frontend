import type { AxiosError } from 'axios';
import { leadTrackApi } from '@/api/lead-track.api';
import type { User } from '@/interfaces/user.interface';

export const checkAuthAction = async (): Promise<User> => {
  try {
    const { data } = await leadTrackApi.get<User>('/auth/verify');
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? 'Check status failed');
  }
};
