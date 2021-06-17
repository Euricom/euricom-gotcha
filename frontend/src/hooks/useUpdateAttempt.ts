import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export const updateAttempt = async ({approved, id}: any) => {
  const { data } = await axios.post(`/attempt/update/${id}`, {approved});
  return data;
};

const useUpdateAttempt = () => {
  const queryClient = useQueryClient()
  return useMutation(updateAttempt, {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(['attempt', 'user']);
      queryClient.resetQueries();
    }
  });
}

export default useUpdateAttempt;
