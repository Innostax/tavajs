import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
<%- reduxImport %>

<%- imports %>
<%= envInfo %>
ReactDOM.render(
  <React.StrictMode>
      <%- providerStart %>
      <%- reduxProviderStart %>
      <App />
      <%- reduxProviderEnd %>
    <%- providerEnd %>
  </React.StrictMode>,
  document.getElementById("root")
);
