<% if(isStore && (isCrudWithNode||isCrud)){%>import React, {useState,useEffect} from "react";<%}%>
<% if((isCrudWithNode||isCrud) && !isMaterialUI) {%>import { Button } from "react-bootstrap";<%}%>
<% if((isCrudWithNode||isCrud) && isMaterialUI) {%>import { Button,Box } from "@mui/material";<%}%>
<% if(isStore && (isCrudWithNode||isCrud)){%>import { useSelector, useDispatch } from "react-redux";<%}%>
<% if(isCrudWithNode||isCrud){%>import { getUsers  <% if(isCrudWithNode) {%> ,deleteUsers<%}%>} from "./users.actions";<%}%>
<% if(isStore && (isCrudWithNode||isCrud)){%>import { selectAllUsers } from "./users.selectors";<%}%>
<% if(isCrudWithNode||isCrud) {%>import AddUser from './AddUser';<%}%>
<% if(isCrudWithNode||isCrud) {%>import DeleteConfirmationModal from './DeleteConfirmationModal';<%}%>
<% if(isStore && (isCrudWithNode||isCrud)){%> import Table from '../../components/organisms/Table';<%}%>
<% if(isCrud ||isCrudWithNode) {%>import { actions } from './users.reducer';

const {setSelectedUserModal,setSelectedUser} = actions<%}%>

<% if(isCrud) {%>const {deleteUser} = actions<%}%>
<% if (isCrudWithNode || isCrud) {%> let deleteId
  let username<%}%>

const Users = () => {
  <% if(isStore && (isCrudWithNode||isCrud)){%> const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);<%}%>

  <% if(isCrudWithNode||isCrud) {%> 
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [show, setShow] = useState(false)

	  const handleShow = () => setShow(true)

    const handleDelete = (id) => {
      <% if(isCrud) {%>
        dispatch(deleteUser({id}))
      <%}%>
      <% if(isCrudWithNode) {%>
        dispatch(deleteUsers({ id})).then(() => dispatch(getUsers()));
      <%}%>
    };

  
      <% if(!isMaterialUI) {%>
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
      <%}%>
    )

    
      <% if(!isMaterialUI) {%>
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
      <%}%>
    )
  <%}%>
  <% if((isCrudWithNode||isCrud) && !isMaterialUI) {%>
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
  <% if((isCrudWithNode||isCrud) && isMaterialUI) {%>
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
        <h1>Welcome to Users Screen</h1>
        <% if((isCrudWithNode||isCrud) && !isMaterialUI) {%>
          <Button className='m-2' onClick={() => handleShow()}>Add User</Button>
        <%}%>
        <% if((isCrudWithNode||isCrud) && isMaterialUI) {%>
          <Button variant='contained' onClick={() => handleShow()}>Add User</Button>
          <Box sx={{ height: '1.5rem' }} />
        <%}%>
        <% if(isStore &&  !isMaterialUI && (isCrudWithNode||isCrud)){%> <Table data={users} keyField='id' columns={cols}/><%}%> 
        <% if(isStore && isMaterialUI &&(isCrudWithNode||isCrud)){%> <Table data={users} columns={cols}/><%}%> 

      </div>
      <%if((isCrudWithNode||isCrud)){%>
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
      <%}%>
    </>
  );
};

export default Users;

