import React, { useState } from "react";
import { Row } from "react-bootstrap";
import Modal from "../../components/organisms/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedUser } from "./users.selectors";
import Label from "../../components/atoms/Label";
import Button from "../../components/atoms/Button";
import { actions } from "../Users/users.reducer";
import Input from "../../components/atoms/Input";
import { isEmpty } from "../../helper/isEmpty.js";

const { setSelectedUserModal, setSelectedUser, editUser, addNewUser } = actions;
const AddUser = ({ show, handleClose, reset }) => {
  const initialUserData = {
    name: "",
    username: "",
    email: "",
  };
  const dispatch = useDispatch();
  const resetModal = () => {
    dispatch(setSelectedUserModal(null));
    dispatch(setSelectedUser(null));
  };

  handleClose = () => {
    setFormData(initialUserData);
    show(false);
    resetModal();
  };

  const user = useSelector(selectSelectedUser);

  const [formData, setFormData] = useState(
    isEmpty(user) ? initialUserData : user
  );

  const handleSubmit = () => {
    if (isEmpty(user)) dispatch(addNewUser(formData));
    else dispatch(editUser(formData));
  };
  return (
    <Modal
      show={true}
      handleClose={handleClose}
      title={isEmpty(user) ? "Add User" : "Edit User"}
      reset={reset}
    >
      <Row>
        <Label title="Name" />
      </Row>
      <Row>
        <Input
          className="u-full-width"
          type="text"
          placeholder="Name"
          id="nameInput"
          onChange={(e) =>
            setFormData((data) => ({ ...data, name: e.target.value }))
          }
          value={formData.name}
        />
      </Row>
      <Row className="pt-2">
        <Label title="User Name" />
      </Row>
      <Row>
        <Input
          className="u-full-width"
          type="Username"
          placeholder="curiousgeek"
          id="usernameInput"
          onChange={(e) =>
            setFormData((data) => ({ ...data, username: e.target.value }))
          }
          value={formData.username}
        />
      </Row>
      <Row className="pt-2">
        <Label title="Email" />
      </Row>
      <Row>
        <Input
          className="u-full-width"
          type="email"
          placeholder="test@mailbox.com"
          id="emailInput"
          onChange={(e) =>
            setFormData((data) => ({ ...data, email: e.target.value }))
          }
          value={formData.email}
        />
      </Row>
      <Row className="pt-2">
        <Button
          name={isEmpty(user) ? "ADD" : "EDIT"}
          onClick={handleSubmit}
          size="sm"
        />
      </Row>
    </Modal>
  );
};

export default AddUser;
