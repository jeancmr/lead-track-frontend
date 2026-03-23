import type { TaskStatus } from '@/schemas/task-status-enum';

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
}
