import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, updateUsers } from "../users.actions";
import { selectAllUsers } from "../users.selectors";
function Adduser(props) {
  const editFormData = props.editFormData;
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [actionName, setActionName] = useState("Add user");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const userlength = users?.length;
  console.log(userlength);
  const nextUserId = userlength > 0 ? users[userlength - 1].id + 1 : 0;

  console.log(nextUserId);
  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);

  useEffect(() => {
    if (editFormData.id) {
      setName(editFormData.name);
      setUsername(editFormData.username);
      setEmail(editFormData.email);
      setUserId(editFormData.id);
      setActionName("Update");
    }
  }, [editFormData]);

  const handleClick = () => {
    if (name && email) {
      console.log(nextUserId);
      if (actionName)
        if (actionName === "Add user") {
          dispatch(
            addUsers({
              nextUserId,
              name,
              email,
              username,
            })
          );
        }
      console.log(userId);
      if (actionName === "Update") {
        dispatch(
          updateUsers({
            Id: userId,
            name,
            email,
            username,
          })
        );
        setUserId("");
        setActionName("Add user");
      }
      setError(null);
    } else {
      setError("Fill in all fields");
    }
    setName("");
    setEmail("");
  };

  return (
    <Container>
      <Row>
        <h1>Add User</h1>
      </Row>
      <Row>
        <Col>
          <label>
            <b>Name :</b>
          </label>
          <input
            className="u-full-width"
            type="text"
            placeholder="ABC"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <label>
            <b>User Name :</b>
          </label>
          <input
            className="u-full-width"
            type="text"
            placeholder="curiousgeek"
            id="usernameInput"
            onChange={handleUsername}
            value={username}
          />
          <label>
            <b>Email :</b>
          </label>
          <input
            className="u-full-width"
            type="email"
            placeholder="test@mailbox.com"
            id="emailInput"
            onChange={handleEmail}
            value={email}
          />
          <p style={{ color: "red", fontSize: "14px" }}>{error && error}</p>

          <br />
          <Button onClick={handleClick} variant="outline-success">
            {actionName}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Adduser;
