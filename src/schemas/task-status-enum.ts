import { z } from 'zod';

export const taskStatusEnum = z.enum(['to-do', 'in-progress', 'done']);

export type TaskStatus = z.infer<typeof taskStatusEnum>;
