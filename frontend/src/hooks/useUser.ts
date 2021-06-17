import { useQuery } from 'react-query';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

export const getUser = async ({userName, email}: any) => {
  const { data } = await axios.post(`/user`, {userName, email});
  return data;
};

const useGetUser = () => {
  const [account] = useLocalStorage("gotcha-account",'');
  return useQuery('user', () => getUser({userName: account?.account?.name, email: account?.account?.username}), { enabled: !!account});
}

export default useGetUser;
