import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./screens/users";

export default function Routes() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/users" component={Users}></Route>
      </Switch>
    </div>
  );
}
