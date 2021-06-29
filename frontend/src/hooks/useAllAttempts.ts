import { useQuery } from 'react-query';
import axios from 'axios';
import { useAppState } from './useAppState';

export const getAllAttempts = async () => {
  const { data } = await axios.get(`/attempt`);
  return data;
};

const useGetAllAttempt = () => {
  const { user } = useAppState();
  return useQuery(['attempts'], getAllAttempts, { enabled: !!user, refetchInterval:30000});
}

export default useGetAllAttempt;
