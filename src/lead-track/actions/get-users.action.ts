import { leadTrackApi } from '@/api/lead-track.api';
import type { User } from '@/interfaces/user.interface';

export const getUsersAction = async (): Promise<User[]> => {
  const { data } = await leadTrackApi.get<User[]>('/users');

  return data;
};
