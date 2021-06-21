import { useQuery } from "react-query";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export const getUser = async ({ userName, email }: any) => {
  if (!(userName && email)) {
  }
  const { data } = await axios.post(`/user`, { userName, email });
  return data;
};

const useGetUser = (result: any) => {
  const [account] = useLocalStorage("gotcha-account", "");
  const data = result || account;
  return useQuery(
    "user",
    () =>
      getUser({
        userName: data?.account?.name,
        email: data?.account?.username,
      }),
    { enabled: !!data?.account }
  );
};

export default useGetUser;
