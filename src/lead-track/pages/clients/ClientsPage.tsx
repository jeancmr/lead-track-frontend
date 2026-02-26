import { getClientsAction } from '@/lead-track/actions/get-clients.action';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

export const ClientsPage = () => {
  const [searchParams] = useSearchParams();

  const limit = Number(searchParams.get('limit')) || 9;
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all';

  const { data } = useQuery({
    queryKey: ['clients', { limit, page, search, status }],
    queryFn: getClientsAction({ limit, page, search, status }),
    staleTime: 1000 * 6 * 5,
  });

  console.log(data);

  return (
    <div>
      <h2>ClientsPage</h2>
    </div>
  );
};
