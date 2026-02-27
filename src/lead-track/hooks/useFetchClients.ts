import { useSearchParams } from 'react-router';
import { getClientsAction } from '../actions/get-clients.action';
import { useQuery } from '@tanstack/react-query';

export const useFetchClients = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get('limit')) || 9;
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all';

  return useQuery({
    queryKey: ['clients', { limit, page, search, status }],
    queryFn: () => getClientsAction({ limit, page, search, status }),
    staleTime: 1000 * 6 * 5,
  });
};
