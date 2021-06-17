import { useQuery } from 'react-query';
import axios from 'axios';
import { useAppState } from './useAppState';

export const getAttempt = async (id: any) => {
  if (typeof id === 'undefined') return;
  const { data } = await axios.get(`/attempt/${id}`);
  return data;
};

const useGetAttempt = (id:any) => {
  const { user } = useAppState();
  return useQuery(['attempt', id], () => getAttempt(id), {initialData: {},enabled: (!!user && !user?.killed), refetchInterval:60000});
}

export default useGetAttempt;
