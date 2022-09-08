import React, { useState } from "react";

<% if(isMaterialUI) {%>import {Grid} from '@mui/material';<%}%>
<% if(isMaterialUI) {%>import Label from "../../components/atoms/Label";<%}%>
<% if(isMaterialUI) {%>import Button from "../../components/atoms/Button";<%}%>
<% if(isMaterialUI) {%>import Input from "../../components/atoms/Input";<%}%>

<% if(!isMaterialUI) {%>import { Form, Button } from "react-bootstrap";<%}%>
import Modal from "../../components/organisms/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, updateUsers } from "./users.actions";
import { selectSelectedUser } from "./users.selectors";

import { actions } from "../Users/users.reducer";

import { isEmpty } from "../../helper/isEmpty.js";

const { setSelectedUserModal, setSelectedUser } = actions;
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
    const { _id: id } = user;
   
    if (isEmpty(user)) 
    {
      dispatch(addUsers(formData));
      handleClose();
    }
    else 
    {
      dispatch(updateUsers({id , ...formData}));
      handleClose();
    }
  };
  return (
    <Modal
    show={true}
    handleClose={handleClose}
    title={isEmpty(user) ? 'Add User' : 'Edit User'}
    reset={reset}			
    <% if(!isMaterialUI) {%>
      footer={
      <>
        <Button variant='outline-primary' type='submit' onClick={handleSubmit} active>
          {isEmpty(user) ? 'Add' : 'Edit'}
        </Button>
        <Button onClick={handleClose} variant="outline-primary">Cancel</Button>
      </>
      }
    <%}%>
  >
  <% if(!isMaterialUI) {%>
    <Form>
      <Form.Group className='mb-1' controlId='nameInput'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter Name'
          onChange={(e) =>
            setFormData((data) => ({ ...data, name: e.target.value }))
          }
          value={formData.name}
        />
      </Form.Group>
      <Form.Group className='mb-1' controlId='usernameInput'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter User Name'
          onChange={(e) =>
            setFormData((data) => ({ ...data, username: e.target.value }))
          }
          value={formData.username}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='emailInput'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter Email'
          onChange={(e) =>
            setFormData((data) => ({ ...data, email: e.target.value }))
          }
          value={formData.email}
        />
      </Form.Group>
    </Form>
    <%}%>
      <% if(isMaterialUI) {%>
        <Grid>
        <Grid
          mb={2}
          container
          direction='column'
          justifyContent='center'
          alignItems='stretch'
        >
          <Label title='Name'></Label>
          <Input
            className='u-full-width'
            type='text'
            placeholder='Name'
            id='nameInput'
            onChange={(e) =>
              setFormData((data) => ({ ...data, name: e.target.value }))
            }
            value={formData.name}
          />
        </Grid>
        <Grid
          mb={2}
          container
          direction='column'
          justifyContent='center'
          alignItems='stretch'
        >
          <Label title='User Name'></Label>
          <Input
            className='u-full-width'
            type='Username'
            placeholder='curiousgeek'
            id='usernameInput'
            onChange={(e) =>
              setFormData((data) => ({ ...data, username: e.target.value }))
            }
            value={formData.username}
          />
        </Grid>
        <Grid
          mb={2}
          container
          direction='column'
          justifyContent='center'
          alignItems='stretch'
        >
          <Label title='Email'></Label>
          <Input
            className='u-full-width'
            type='email'
            placeholder='test@mailbox.com'
            id='emailInput'
            onChange={(e) =>
              setFormData((data) => ({ ...data, email: e.target.value }))
            }
            value={formData.email}
          />
        </Grid>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Button
            name={isEmpty(user) ? 'ADD' : 'EDIT'}
            variant='contained'
            onClick={handleSubmit}
            size='medium'
          />
          <Button
            name='cancel'
            variant='text'
            onClick={handleClose}
            size='medium'
          />
        </Grid>
      </Grid>
        <%}%>
    </Modal>
  );
};

export default AddUser;
