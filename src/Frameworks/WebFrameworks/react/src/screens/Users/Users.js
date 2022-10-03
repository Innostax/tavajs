<% if(isStore){%>import React, {useState,useEffect} from "react";<%}%>
<% if( isBootstrap) {%>import { Button } from "react-bootstrap";<%}%>
<% if( isTailWind) {%>import Button from '../../components/atoms/Button';<%}%>
<% if( isMaterialUI) {%>import { Button,Box } from "@mui/material";<%}%>
<% if(isStore){%>import { useSelector, useDispatch } from "react-redux";<%}%>
import { getUsers  <% if(isBackEnd) {%> ,deleteUsers<%}%>} from "./users.actions"
<% if(isStore){%>import { selectAllUsers } from "./users.selectors";<%}%>
import AddUser from './AddUser'
import DeleteConfirmationModal from './DeleteConfirmationModal'
<% if(isStore){%> import Table from '../../components/organisms/Table';<%}%>
import { actions } from './users.reducer';

const {setSelectedUserModal,setSelectedUser} = actions

<% if(!isBackEnd) {%>const {deleteUser} = actions<%}%>
let deleteId
let username

const Users = () => {
  <% if(isStore ){%> const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);<%}%>

    const [confirmDelete, setConfirmDelete] = useState(false)
    const [show, setShow] = useState(false)

	  const handleShow = () => setShow(true)

    const handleDelete = (id) => {
      <% if(!isBackEnd) {%>
        dispatch(deleteUser({id}))
      <%}%>
      <% if(isBackEnd) {%>
        dispatch(deleteUsers({ id})).then(() => dispatch(getUsers()));
      <%}%>
    };

    <% if(isBootstrap) {%>
    const editFormatter = (id, row) => (
        <>
          <Button size="sm" variant="outline-primary" className='w-80' onClick={() => {
            handleShow()
            dispatch(setSelectedUserModal({id}))
            dispatch(setSelectedUser(row))
            }}>
            Edit
          </Button>
        </>
    )
      <%}%>
      <% if(isMaterialUI) {%>
        const editFormatter = (data) => (
        <>
          <Button  variant='outlined' size='small' onClick={() => {
            handleShow()
            dispatch(setSelectedUserModal(data.id))
            dispatch(setSelectedUser(data))
            }}>
            Edit
          </Button>
        </>
        )
      <%}%>
      <% if(isTailWind) {%>
      const editFormatter = (id, row) => (
      <>
			<Button
				name='Edit'
				variant='rounded-lg text-white'
				color='bg-blue-600'
				size=''
				onClick={() => {
					handleShow()
					dispatch(setSelectedUserModal({ id }))
					dispatch(setSelectedUser(row))
				}}
			/>
      </>
    )
    <%}%>

    <% if(isBootstrap) {%>
    const deleteFormatter= (id,row)=>(
        <>
          <Button
            variant="outline-danger"
            size="sm"
            className='w-80'
            onClick={() => {
              username = row.username
              deleteId = id
              setConfirmDelete(true)
            }}
          >
            Delete
          </Button>
        </>
    )
      <%}%>
      <% if(isMaterialUI) {%>
        const deleteFormatter= (data)=>(
        <>
          <Button
            variant='outlined'
            color="error"
            size="small"
            onClick={() => {
              username = data.username
              deleteId = data.id
              setConfirmDelete(true)
            }}
          >
            Delete
          </Button>
        </>
        )
      <%}%>
      <% if(isTailWind) {%>
        const deleteFormatter= (id,row)=>(
        <>
        <Button
          name='Delete'
          variant='rounded-lg text-white'
          color='bg-red-600'
          align='content-center'
          onClick={() => {
            username = row.username
            deleteId = id
            setConfirmDelete(true)
          }}
        />
		</>
    )
      <%}%>
  <% if(isBootstrap || isTailWind) {%>
    const cols=[
      {
        dataField: 'name',
        text: 'Name'
      },
      {
        dataField: 'username',
        text: 'User Name'
      },
      {
        dataField:'email',
        text:'Email'  
      },
      {
        dataField: 'id',
        text: '',
        align: 'right',
        formatter: deleteFormatter,
      },
      {
        dataField: 'id',
        text: '',
        align: 'left',
        formatter: editFormatter,
      },
    ]
  <%}%>
   
  <% if(isMaterialUI) {%>
    const cols = [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'username',
        header: 'User Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'id',
        accessorFn: (data) => {
          return deleteFormatter(data)
           
        },
      },
      {
        accessorKey: 'editid',
        accessorFn: (data) => {
          return editFormatter(data)
        },
      },
    ]
  <%}%>
  return (
    <>
      <div>
        <h1 <%if(isTailWind) {%>className='text-3xl font-medium mb-5'<%}%> >Welcome to Users Screen</h1>
        <% if(isBootstrap) {%>
          <Button className='m-2' onClick={() => handleShow()}>Add User</Button>
        <%}%>
        <% if(isMaterialUI) {%>
          <Button variant='contained' onClick={() => handleShow()}>Add User</Button>
          <Box sx={{ height: '1.5rem' }} />
        <%}%>
        <% if(isTailWind && isStore) {%>
          <div className='dark:bg-[#1d1717]'>
          <button
            className='text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 '
            onClick={() => handleShow()}>
            Add User
          </button>
        </div>
        <%}%>
        <% if(isStore &&  (isBootstrap || isTailWind)){%> <Table data={users} keyField='id' columns={cols}/><%}%> 
        <% if(isStore && isMaterialUI ){%> <Table data={users} columns={cols}/><%}%> 
      </div>
        {show && <AddUser show={setShow} handleShow={handleShow} />}
        {confirmDelete && (
          <DeleteConfirmationModal
            open={confirmDelete}
            <% if(isMaterialUI) {%>
            setOpen={() => setConfirmDelete(false)}
            <%}else{%>
            setOpen={setConfirmDelete}
            <%}%>
            userId={() => handleDelete(deleteId)}
            username={username}
          />
        )}
    </>
  );
};

export default Users;

