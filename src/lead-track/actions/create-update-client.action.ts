import { leadTrackApi } from '@/api/lead-track.api';
import type { Client } from '@/interfaces/client.interface';
import type { CreateUpdateResponse } from '../interfaces/create-update-client.response';
import type { AxiosError } from 'axios';

export const createUpdateClientAction = async (
  client: Partial<Client>,
): Promise<CreateUpdateResponse> => {
  const { id, ...clientData } = client;

  const isNewClient = id === 0;

  try {
    const { data } = await leadTrackApi<CreateUpdateResponse>({
      url: isNewClient ? 'clients' : `clients/${id}`,
      method: isNewClient ? 'POST' : 'PATCH',
      data: { ...clientData, ownerId: 8 },
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(
      axiosError.response?.data?.message ?? `${isNewClient ? 'Insert' : 'Update'} failed`,
    );
  }
};
