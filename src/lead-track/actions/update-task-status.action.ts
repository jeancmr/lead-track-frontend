import { leadTrackApi } from '@/api/lead-track.api';
import type { TaskStatus } from '@/schemas/task-status-enum';
import type { CreateUpdateTaskResponse } from '../interfaces/create-update-task.response';

export const updateTaskStatusAction = async (
  taskId: string,
  status: TaskStatus,
): Promise<CreateUpdateTaskResponse> => {
  const { data } = await leadTrackApi.patch<CreateUpdateTaskResponse>(`/tasks/${taskId}`, {
    status,
  });
  return data;
};
