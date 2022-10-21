import React, { useState } from "react";

<% if(isMaterialUI) {%>
  import {Grid} from '@mui/material';
  import Label from "../../components/atoms/Label";
  import Button from "../../components/atoms/Button";
  import Input from "../../components/atoms/Input";
<%}%>
<% if(isBootstrap) {%>import { Form, Button } from "react-bootstrap";<%}%>
<%if(isTailWind){%>
  import Button from '../../components/atoms/Button'
  import Input from '../../components/atoms/Input'  
<%}%>
import Modal from "../../components/organisms/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, updateUsers, getUsers } from "./users.actions";
import { selectSelectedUser } from "./users.selectors";

import { actions } from "../Users/users.reducer";

import  isEmpty  from "../../helper";

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
    if (
      !isEmpty(formData.name) &&
      !isEmpty(formData.email) &&
      !isEmpty(formData.username)
    ) {
      if (isEmpty(user)) {
        dispatch(addUsers(formData));
      }
      else {
        dispatch(updateUsers({ id, ...formData })).then(() => dispatch(getUsers()));
      }
      handleClose();
    }
  };
  return (
    <Modal
    shouldOpen={true}
    handleClose={handleClose}
    title={isEmpty(user) ? 'Add User' : 'Edit User'}
    reset={reset}			
    <% if(isBootstrap) {%>
      footer={
      <>
        <Button variant='outline-primary' type='submit' onClick={handleSubmit} className='w-80' active>
          {isEmpty(user) ? 'Add' : 'Update'}
        </Button>
        <Button onClick={handleClose} variant="outline-danger" className='w-80'>Cancel</Button>
      </>
      }
    <%}%>
  <% if(isTailWind) {%>
    footer={
      <>
        <Button
          name={isEmpty(user) ? 'Add' : 'Update'}
          variant='rounded-lg'
          color='bg-blue-600'
          size=''
          onClick={handleSubmit}
        />
        <Button
          name='Cancel'
          variant='rounded-lg'
          color='bg-red-600'
          align='ml-auto'
          onClick={handleClose}
        />
      </>
    }
  <%}%>
  >
  <% if(isBootstrap) {%>
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
            placeholder='Enter Name'
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
            placeholder='Enter Username'
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
            placeholder='Enter Email'
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
      <% if(isTailWind) {%>
        <Input
				title='Name'
				type='text'
				placeholder='Enter Name'
				onChange={(e) =>
					setFormData((data) => ({ ...data, name: e.target.value }))
				}
				value={formData.name}
				name=''
			/>
			<Input
				title='Username'
				type='text'
				placeholder='Enter Username'
				onChange={(e) =>
					setFormData((data) => ({ ...data, username: e.target.value }))
				}
				value={formData.username}
				name=''
			/>
			<Input
				title='Email'
				type='email'
				placeholder='Enter Email'
				onChange={(e) =>
					setFormData((data) => ({ ...data, email: e.target.value }))
				}
				value={formData.email}
				name=''
			/>
      <%}%>
    </Modal>
  );
};

export default AddUser;
