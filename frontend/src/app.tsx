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
import { QueryClient, QueryClientProvider } from "react-query";
import AttemptScreen from "./screens/attempt";
import { ProvideAppState, useAppState } from "./hooks/useAppState";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  useAppState();

  const queryClient = new QueryClient();
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <ProvideAppState>
          <AuthenticatedTemplate>
            <Router>
              <div className="flex flex-col relative justify-start items-center">
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
                <Nav />
              </div>
            </Router>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate></UnauthenticatedTemplate>
        </ProvideAppState>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
