import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import App from "./app";
import { MsalProvider } from "@azure/msal-react";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import * as dotenv from "dotenv";
import { QueryClient, QueryClientProvider } from "react-query";
dotenv.config();

// MSAL configuration
const configuration: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_MSAL_CLIENTID || "",
    authority: process.env.REACT_APP_MSAL_TENANT,
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

const pca = new PublicClientApplication(configuration);
const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
