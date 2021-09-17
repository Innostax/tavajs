import React<% if(isRedux){%>,{ useEffect, useState }<%}%> from "react";
<% if(isRedux) {%>import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./users.actions";
import { selectAllUsers } from "./users.selectors";<%}%>
<% if(isCrudWithNode) {%>import { deleteUsers } from "./users.actions";
import { Button } from "react-bootstrap";
import Adduser from "./userform/Adduser";<%}%>


const Users = () => {
  <% if(isCrudWithNode) {%> const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
  });<%}%>

  <% if(isRedux) {%>const dispatch = useDispatch();
const users = useSelector(selectAllUsers);    
    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);<%}%>

    <% if(isCrudWithNode) {%> const handleDelete = (id) => {
      dispatch(deleteUsers({ Id: id }));
    };
  
    const handleEditClick = (event, user) => {
      setEditFormData(user);
    };<%}%>

  return (
    <div>
      <h1>Welcome to Users Screen</h1>
      <% if(isRedux){%><h4>Welcome to React Redux Toolkit Crash Course</h4>
      {users && users.map((user, i) => <p key={i}>{user.name}</p>)}<%}%>

      <% if(isCrudWithNode) {%>
      {users && <Adduser editFormData={editFormData} />}
      {users &&
        users.map((user, i) => {
          const { id, name, username, email } = user;
          return (
            <tr key={i}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{username}</td>
              <td>{email}</td>

              <td>
                <Button onClick={(event) => handleEditClick(event, user)}>
                  Edit
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })} <%}%>

    </div>
  );
};

export default Users;
