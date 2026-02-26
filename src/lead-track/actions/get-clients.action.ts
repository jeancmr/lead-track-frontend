import { leadTrackApi } from '@/api/lead-track.api';
import type { ClientsReponse } from '../interfaces/clients.response';

export const getClientsAction = async (): Promise<ClientsReponse> => {
  const { data } = await leadTrackApi.get<ClientsReponse>('/clients');

  console.log(data);

  return data;
};
