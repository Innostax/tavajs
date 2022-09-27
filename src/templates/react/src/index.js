import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
<% if(isStore){%>import createStore from "./createStore";
import { Provider } from "react-redux";<%}%>

<% if(isAuth0) {%>import { Auth0Provider } from './react-spa'<%}%>
<% if(isStore){%> import rootReducer from './rootReducer'
const store = createStore(rootReducer) <%}%>
<% if(isAuth0) {%>const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID,REACT_APP_AUTH0_AUDIENCE,} = process.env<%}%>

ReactDOM.render(
  <React.StrictMode>
    <% if(isStore) {%> <Provider store={store}><%}%>
      <% if(isAuth0) {%><Auth0Provider
  domain={REACT_APP_AUTH0_DOMAIN}
  client_id={REACT_APP_AUTH0_CLIENT_ID}
  redirect_uri={window.location.origin}
  audience={REACT_APP_AUTH0_AUDIENCE}
  ><%}%>

      <App />

      <% if(isAuth0) {%></Auth0Provider><%}%>
      <% if(isStore) {%> </Provider><%}%>
  </React.StrictMode>,
  document.getElementById("root")
);
