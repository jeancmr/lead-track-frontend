import type { TaskStatus } from '@/schemas/task-status-enum';

export interface Task {
  id: string;
  assignedTo: number;
  dueDate: string;
  client: string;
  status: TaskStatus;
  title: string;
}
