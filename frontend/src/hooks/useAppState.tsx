// Hook (use-appState.js)
import React, {
  useEffect,
  useContext,
  createContext,
  useMemo,
  PropsWithChildren,
  useState,
} from "react";
import { useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import useLocalStorage from "./useLocalStorage";
import useGetUser from "./useUser";
import axios from "axios";

const appStateContext = createContext<any>({});

export function ProvideAppState({ children }: PropsWithChildren<any>) {
  const appState = useProvideAppState();
  return (
    <appStateContext.Provider value={appState}>
      {children}
    </appStateContext.Provider>
  );
}

export const useAppState = () => {
  return useContext(appStateContext);
};
// Provider hook that creates appState object and handles state
function useProvideAppState() {
  const [state, setState] = useState({});

  const request = useMemo(
    () => ({
      scopes: ["User.Read"],
    }),
    []
  );

  const { login, error, result } = useMsalAuthentication(
    InteractionType.Silent,
    request
  );

  useEffect(() => {
    if (error) {
      login(InteractionType.Redirect, request);
    }
  }, [error, login, request]);

  const [account, setAccount] = useLocalStorage(
    "gotcha-account",
    JSON.stringify(result)
  );

  const { data } = useGetUser();

  useEffect(() => {
    if (result) {
      setAccount(result);
    }
  }, [result, setAccount]);

  useEffect(() => {
    axios.defaults.headers.common.Authorization = `Bearer ${account?.accessToken}`;
  }, [account]);

  // Return the user object and appState methods
  return {
    user: data,
    state,
    setState,
  };
}
