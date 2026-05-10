import { leadTrackApi } from '@/api/lead-track.api';
import type { Task } from '@/interfaces/task.interface';

export const getTasksByUserAction = async (userId: number): Promise<Task[]> => {
  if (!userId) return [];

  const { data } = await leadTrackApi.get<Task[]>(`/tasks/user/${userId}`);

  return data;
};
