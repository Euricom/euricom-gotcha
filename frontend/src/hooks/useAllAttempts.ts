import { useQuery } from 'react-query';
import axios from 'axios';

export const getAllAttempts = async () => {
  const { data } = await axios.get(`/attempt`);
  return data;
};

const useGetAllAttempt = () => useQuery(['attempts'], getAllAttempts);

export default useGetAllAttempt;
