import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
<% if(isRedux){%>import { store } from "./store";
import { Provider } from "react-redux";<%}%>
<% if(isCognito) {%>import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';<%}%>
<% if(isAuth0) {%>import { Auth0Provider } from './react-spa'<%}%>
<% if(isAuth0) {%>const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID} = process.env<%}%>
<% if(isCognito) {%>const {
  REACT_APP_REGION,
  REACT_APP_USER_POOL_ID,
  REACT_APP_USER_POOL_WEB_CLIENT_IT,
} = process.env;
Amplify.configure( REACT_APP_REGION,
REACT_APP_USER_POOL_ID,
REACT_APP_USER_POOL_WEB_CLIENT_IT)<%}%>
ReactDOM.render(
  <React.StrictMode>
      <% if(isAuth0) {%><Auth0Provider
  domain={REACT_APP_AUTH0_DOMAIN}
  client_id={REACT_APP_AUTH0_CLIENT_ID}
  redirect_uri={window.location.origin}><%}%>

      <% if(isCognito) {%><AmplifyAuthenticator><%}%>
      <% if(isRedux) {%> <Provider store={store}><%}%>
      <App />

      <% if(isRedux) {%> </Provider><%}%>

      <% if(isCognito) {%><AmplifySignOut />
      </AmplifyAuthenticator><%}%>

      <% if(isAuth0) {%></Auth0Provider><%}%>
  </React.StrictMode>,
  document.getElementById("root")
);
