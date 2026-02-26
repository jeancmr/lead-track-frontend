import type { Client } from '@/interfaces/client.interface';
import type { Meta } from '@/interfaces/meta.interface';

export interface ClientsReponse {
  clients: Client[];
  meta: Meta;
}
