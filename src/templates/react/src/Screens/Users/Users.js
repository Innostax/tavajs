<% if(isRedux){%>import React, { useEffect,<% if(isCrud) {%> useState <%}%> } from "react";<%}%>
<% if(isRedux) {%>import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./users.actions";
import { selectAllUsers } from "./users.selectors";<%}%>
<% if(isCrud) {%> import { actions } from "./users.reducer";<%}%>

<% if(isCrud) {%> import { Button } from "react-bootstrap";<%}%>
<% if(isCrud) {%> import Adduser from "./useform/Adduser";<%}%>


    const Users = () => {
<% if(isCrud){%>
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
  });
  const { userDeleted } = actions;
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  const handleEditClick = (event, user) => {
    setEditFormData(user);
  }; 

  return (
    <div>
      <h1>Welcome to Users Screen</h1>
    
     <Adduser editFormData={editFormData} />
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
        })
        }
      
    </div>
  );
  
 <%}%>

<% if((!isCrud)&&(isRedux)) {%>const dispatch = useDispatch();
const users = useSelector(selectAllUsers);    
    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);

  return (
    <div>
      <h1>Welcome to Users Screen</h1>
      <h4>Welcome to React Redux Toolkit Crash Course</h4>
      {users && users.map((user, i) => <p key={i}>{user.name}</p>)}
    </div>
  );
  
  <%}%>
  <% if((!isRedux)) {%> 
    return(
      <div>
        <h1>Welcome to Users Screen</h1>
      </div>
    )
    <%}%>
};

export default Users;
