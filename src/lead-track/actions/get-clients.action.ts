import { leadTrackApi } from '@/api/lead-track.api';
import type { ClientsReponse } from '../interfaces/clients.response';

interface Options {
  limit?: number;
  page?: number;
  status?: string;
  search?: string;
}

export const getClientsAction = async (options: Options): Promise<ClientsReponse> => {
  const { limit, page, status, search } = options;

  const { data } = await leadTrackApi.get<ClientsReponse>('/clients', {
    params: {
      limit,
      page,
      status,
      search,
    },
  });

  return data;
};
