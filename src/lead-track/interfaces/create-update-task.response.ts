import type { Task } from '@/interfaces/task.interface';

export interface CreateUpdateTaskResponse {
  message: string;
  data: Task;
}
