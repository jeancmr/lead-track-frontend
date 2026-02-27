import type { ClientStatus } from '@/schemas/client-status-enum';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ClientStatus;
}
