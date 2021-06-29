import { useQuery } from 'react-query';
import axios from 'axios';
import { useAppState } from './useAppState';

export const getPlayerCount = async () => {
  const { data } = await axios.get(`/user/count`);
  return data;
};

const useGetPlayerCount = () => {
  const { user } = useAppState();
  return useQuery(['user/count'], getPlayerCount, { placeholderData: {playing: 0, found: 0}, enabled: !!user, refetchInterval:5000});
}

export default useGetPlayerCount;
