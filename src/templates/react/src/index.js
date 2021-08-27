import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

<%- imports %>
<%= envInfo %>
ReactDOM.render(
  <React.StrictMode>
    <%- providerStart %>
    <App />
    <%- providerEnd %>
  </React.StrictMode>,
  document.getElementById('root')
);
