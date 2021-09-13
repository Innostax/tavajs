import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./users.actions";
import { selectAllUsers } from "./users.selectors";
import { Button } from "react-bootstrap";
import { actions } from "./users.reducer";
import Adduser from "./userform/Adduser";
const Users = () => {
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
      <h4>Welcome to React Redux Toolkit Crash Course</h4>
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
        })}
    </div>
  );
};

export default Users;
