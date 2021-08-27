import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";

const App = () => {
  return (
    <>
      { <%- renderCondition %>}<p>MADE IN INDIA</p>

      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
        <Routes />
      </Router>
    </>
  );
};

export default App;
