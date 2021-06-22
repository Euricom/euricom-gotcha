import React from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TargetScreen from "./screens/target";
import InfoScreen from "./screens/info";
import CameraScreen from "./screens/camera";
import Nav from "./components/Nav";
import axios from "axios";
import { useIsFetching } from "react-query";
import AttemptScreen from "./screens/attempt";
import { ProvideAppState, useAppState } from "./hooks/useAppState";
import { ReactComponent as Loader } from "./icons/loader.svg";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  useAppState();

  const isFetching = useIsFetching()
  return (
    <React.Fragment>
      {/* <QueryClientProvider client={queryClient}> */}
        {!!isFetching && (
          <div className="fixed right-4 top-4 h-8 bg-transparent-500 animate-pulse text-gray-500">
            <Loader className="animate-spin-slow"></Loader>
          </div>
        )}
        <ProvideAppState>
          <AuthenticatedTemplate>
            <Router>
              <div className="flex flex-col relative justify-start md:items-center">
                <div className="pb-16 min-w-full">
                  <Switch>
                    <Route path="/target">
                      <TargetScreen />
                    </Route>
                    <Route path="/info">
                      <InfoScreen />
                    </Route>
                    <Route path="/camera">
                      <CameraScreen />
                    </Route>
                    <Route path="/attempt">
                      <AttemptScreen />
                    </Route>
                    <Route exact path="/">
                      <Redirect to="/target"></Redirect>
                    </Route>
                  </Switch>
                </div>
                <Nav />
              </div>
            </Router>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate></UnauthenticatedTemplate>
        </ProvideAppState>
      {/* </QueryClientProvider> */}
    </React.Fragment>
  );
}

export default App;
