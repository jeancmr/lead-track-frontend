import type { AxiosError } from 'axios';
import { leadTrackApi } from '@/api/lead-track.api';
import type { Task } from '@/interfaces/task.interface';
import type { CreateUpdateTaskResponse } from '../interfaces/create-update-task.response';

interface TaskBody {
  clientId: number | undefined;
  task: Partial<Task>;
}

export const createUpdateTaskAction = async (
  taskBody: TaskBody,
): Promise<CreateUpdateTaskResponse> => {
  const { id, assignedTo, ...taskInfo } = taskBody.task;
  const { clientId } = taskBody;

  try {
    const { data } = await leadTrackApi<CreateUpdateTaskResponse>({
      url: id ? `tasks/${id}` : 'tasks',
      method: id ? 'PATCH' : 'POST',
      data: { clientId, userId: assignedTo, ...taskInfo },
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message ?? `${id ? 'Insert' : 'Update'} failed`);
  }
};
