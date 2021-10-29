import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Modal from "../../components/organisms/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedUser } from "./users.selectors";
import Label from "../../components/atoms/Label";
import Button from "../../components/atoms/Button";
import { actions } from "../Users/users.reducer";
import Input from "../../components/atoms/Input";
import { isEmpty } from "../../helper";

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
    <>
      <Modal
        show={true}
        handleClose={handleClose}
        title={isEmpty(user) ? "Add User" : "edit User"}
        reset={reset}
        size="lg"
      >
        <Row>
          <Col>
            <Label title="Name :" />
          </Col>
          <Col>
            <Input
              className="u-full-width"
              type="text"
              placeholder="ABC"
              id="nameInput"
              onChange={(e) =>
                setFormData((data) => ({ ...data, name: e.target.value }))
              }
              value={formData.name}
            />
          </Col>
        </Row>
        <Row className="pt-2">
          <Col>
            <Label title="User Name :" />
          </Col>
          <Col>
            <Input
              className="u-full-width"
              type="text"
              placeholder="curiousgeek"
              id="usernameInput"
              onChange={(e) =>
                setFormData((data) => ({ ...data, username: e.target.value }))
              }
              value={formData.username}
            />
          </Col>
        </Row>
        <Row className="pt-2">
          <Col>
            <Label title="Email :" />
          </Col>
          <Col>
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
          </Col>
        </Row>
        <Row className="pt-2">
          <Button
            name={isEmpty(user) ? "ADD" : "EDIT"}
            onClick={handleSubmit}
            size="sm"
          />
        </Row>
      </Modal>
    </>
  );
};

export default AddUser;
