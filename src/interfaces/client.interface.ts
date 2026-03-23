import type { ClientStatus } from '@/schemas/client-status-enum';
import type { Note } from './note.interface';
import type { Task } from './task.interface';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ClientStatus;
  createdAt: string;
  notes: Note[];
  tasks: Task[];
}
