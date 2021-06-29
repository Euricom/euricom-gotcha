import { useQuery } from 'react-query';
import axios from 'axios';
import { useAppState } from './useAppState';

export const getAlive = async () => {
  // Only return filled array when ther is 1 player remaining
  const { data } = await axios.get(`/user/alive`);
  return data;
};

const useGetAlive = () => {
  const { user } = useAppState();
  return useQuery(['user/alive'], getAlive, {initialData: {},enabled: !!user, refetchInterval:5000});
}

export default useGetAlive;
