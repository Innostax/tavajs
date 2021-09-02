import React, { useEffect } from "react";
<%- demoUserComponentImports %>
const Users = () => {
  <%- demoUserDispatch %>

  return (
    <div>
      <h1>Welcome to Users Screen</h1>
      <%- demoUserDataRender %>
    </div>
  );
};

export default Users;
