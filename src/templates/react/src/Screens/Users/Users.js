import React, { useEffect } from "react";
<% if(isRedux) {%>import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./users.actions";
import { selectAllUsers } from "./users.selectors";<%}%>
const Users = () => {
  <% if(isRedux) {%>const dispatch = useDispatch();
const users = useSelector(selectAllUsers);    
    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);<%}%>

  return (
    <div>
      <h1>Welcome to Users Screen</h1>
      <% if(isRedux){%><h4>Welcome to React Redux Toolkit Crash Course</h4>
      {users && users.map((user, i) => <p key={i}>{user.name}</p>)}<%}%>
    </div>
  );
};

export default Users;
