import { z } from 'zod';
import { taskStatusEnum } from '@/schemas/task-status-enum';

export const clientTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  dueDate: z.string(),
  status: taskStatusEnum.default('to-do'),
  assignedTo: z.number().optional(),
});

export type ClientTaskFormValues = z.output<typeof clientTaskSchema>;
