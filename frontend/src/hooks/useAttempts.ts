import { useQuery } from 'react-query';
import axios from 'axios';

export const getAttempt = async (id: any) => {
  if (typeof id === 'undefined') return;
  const { data } = await axios.get(`/attempt/${id}`);
  return data;
};

const useGetAttempt = (id:any) => useQuery(['attempt', id], () => getAttempt(id));

export default useGetAttempt;
