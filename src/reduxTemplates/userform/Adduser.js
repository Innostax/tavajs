import React, { useState } from "react";

<%if(isMaterialUI){%>
  import {Grid} from '@mui/material';
  import Label from "../../components/atoms/Label";
  import Button from "../../components/atoms/Button";
  import Input from "../../components/atoms/Input";
<%}%>
<%if(!isMaterialUI){%>import {Form, Button} from "react-bootstrap";<%}%>
import Modal from "../../components/organisms/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedUser } from "./users.selectors";
import { actions } from "../Users/users.reducer";
import  isEmpty  from "../../helper";

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
    if (
			!isEmpty(formData.name) &&
			!isEmpty(formData.email) &&
			!isEmpty(formData.username)
		) {
			if (isEmpty(user)) {
				dispatch(addNewUser(formData))
			} else {
				dispatch(editUser(formData))
			}
			handleClose()
		}
  };

  <% if(!isMaterialUI) {%>
    const footer =
      <>
        <Button variant='outline-primary' type='submit' onClick={handleSubmit} active className='w-80' >
          {isEmpty(user) ? 'Add' : 'Update'}
        </Button>
        <Button onClick={handleClose} variant="outline-danger" className='w-80'>Cancel</Button>
      </>
  <%}%>

  return (
    <Modal
    show={true}
    handleClose={handleClose}
    title={isEmpty(user) ? 'Add User' : 'Edit User'}
    reset={reset}			
    <% if(!isMaterialUI) {%>
    footer= {footer}
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
            name={isEmpty(user) ? 'ADD' : 'UPDATE'}
            variant='contained'
            onClick={handleSubmit}
            size='medium'
          />
          <Button
            name='cancel'
            variant='text'
            onClick={handleClose}
            size='medium'
            color='error'
          />
        </Grid>
      </Grid>
        <%}%>
    </Modal>
  );
};

export default AddUser;
