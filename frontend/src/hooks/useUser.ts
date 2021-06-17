import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export const getUser = async ({userName, email}: any) => {
  const { data } = await axios.post(`/user`, {userName, email});
  return data;
};

const useGetUser = () => {
  const queryClient = useQueryClient();

  return useMutation(getUser, { onSuccess: (user: any) => {
    queryClient.setQueryData('user', user)
  }});
}

export default useGetUser;
