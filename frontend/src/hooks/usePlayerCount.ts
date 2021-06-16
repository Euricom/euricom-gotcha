import { useQuery } from 'react-query';
import axios from 'axios';

export const getPlayerCount = async () => {
  const { data } = await axios.get(`/user/count`);
  return data;
};

const useGetPlayerCount = () => useQuery(['user/count'], getPlayerCount, { initialData: {playing: 0, found: 0}});

export default useGetPlayerCount;
