import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { selectAllUsers } from "../users.selectors";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../users.reducer";

const { userAdded } = actions;

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
  const userlength = users.length;
  const nextUserId = users[userlength - 1]?.id + 1;
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
      dispatch(
        userAdded({
          id: userId ? userId : nextUserId,
          name,
          email,
          username,
          tyepe: userId ? "Update" : "Add",
        })
      );
      if (actionName === "Update") {
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
