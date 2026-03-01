import type { Client } from '@/interfaces/client.interface';

export interface CreateUpdateResponse {
  message: string;
  data: Client;
}
