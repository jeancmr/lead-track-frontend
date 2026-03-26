import { useQuery } from '@tanstack/react-query';
import { getUsersAction } from '../actions/get-users.action';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersAction(),
    staleTime: 1000 * 6 * 5,
  });
};
