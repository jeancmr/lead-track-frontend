import { leadTrackApi } from '@/api/lead-track.api';
import type { Client } from '@/interfaces/client.interface';

export const getClientByIdAction = async (id: string): Promise<Client> => {
  if (!id) throw new Error('ID is required');

  const { data } = await leadTrackApi.get<Client>(`/clients/${id}`);

  return data;
};
