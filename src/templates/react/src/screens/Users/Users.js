<% if(isStore && (isCrudWithNode||isCrud)){%>import React, {useState,useEffect} from "react";<%}%>
<% if((isCrudWithNode||isCrud) && !isMaterialUI) {%>import { Button } from "react-bootstrap";<%}%>
<% if((isCrudWithNode||isCrud) && isMaterialUI) {%>import { Button,Box } from "@mui/material";<%}%>
<% if(isStore && (isCrudWithNode||isCrud)){%>import { useSelector, useDispatch } from "react-redux";<%}%>
<% if(isCrudWithNode||isCrud){%>import { getUsers  <% if(isCrudWithNode) {%> ,deleteUsers<%}%>} from "./users.actions";<%}%>
<% if(isStore && (isCrudWithNode||isCrud)){%>import { selectAllUsers } from "./users.selectors";<%}%>
<% if(isCrudWithNode||isCrud) {%>import AddUser from './AddUser';<%}%>
<% if((isCrudWithNode||isCrud) && isMaterialUI) {%>import DeleteConfirmationModal from '../../components/organisms/DeleteConfirmationModal';<%}%>
<% if((isCrudWithNode||isCrud) && !isMaterialUI) {%>import DeleteConfirmationModal from './DeleteConfirmationModal';<%}%>
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

    const editFormatter = (id, row) => (
      <% if(!isMaterialUI) {%>
        <>
          <Button size="sm" variant="outline-primary" style={{ width: 70 }} onClick={() => {
            handleShow()
            dispatch(setSelectedUserModal({id}))
            dispatch(setSelectedUser(row))
            }}>
            Edit
          </Button>
        </>
      <%}%>
      <% if(isMaterialUI) {%>
        <>
          <Button  variant='outlined' size='small' onClick={() => {
            handleShow()
            dispatch(setSelectedUserModal({id}))
            dispatch(setSelectedUser(row))
            }}>
            Edit
          </Button>
        </>
      <%}%>
    )

    const deleteFormatter= (id,row)=>(
      <% if(!isMaterialUI) {%>
        <>
          <Button
            variant="outline-danger"
            size="sm"
            style={{ width: 70 }} 
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
        <>
          <Button
            variant='outlined'
            color="error"
            size="small"
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </>
      <%}%>
    )
  <%}%>
  <% if(isCrudWithNode||isCrud) {%>
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
        <% if(isStore && (isCrudWithNode||isCrud)){%> <Table data={users} keyField='id'columns={cols}/><%}%> 
      </div>
      <%if((isCrudWithNode||isCrud)){%>
        {show && <AddUser show={setShow} handleShow={handleShow} />}
        {confirmDelete && (
          <DeleteConfirmationModal
            open={confirmDelete}
            setOpen={setConfirmDelete}
            userId={() => handleDelete(deleteId)}
            username={username}
          />
        )}
      <%}%>
    </>
  );
};

export default Users;

