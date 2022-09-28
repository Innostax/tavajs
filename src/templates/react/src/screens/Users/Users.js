<% if(isStore && (isCrudWithNode||isCrud)){%>import React, {useState,useEffect} from "react";<%}%>
<% if((isCrudWithNode||isCrud) && isBootstrap) {%>import { Button } from "react-bootstrap";<%}%>
<% if((isCrudWithNode||isCrud) && isTailWind) {%>import Button from '../../components/atoms/Button';<%}%>
<% if((isCrudWithNode||isCrud) && isMaterialUI) {%>import { Button,Box } from "@mui/material";<%}%>
<% if(isStore && (isCrudWithNode||isCrud)){%>import { useSelector, useDispatch } from "react-redux";<%}%>
<% if(isCrudWithNode||isCrud){%>import { getUsers  <% if(isCrudWithNode) {%> ,deleteUsers<%}%>} from "./users.actions";<%}%>
<% if(isStore && (isCrudWithNode||isCrud)){%>import { selectAllUsers } from "./users.selectors";<%}%>
<% if(isCrudWithNode||isCrud) {%>import AddUser from './AddUser';<%}%>
<% if((isCrudWithNode||isCrud) && isMaterialUI) {%>import DeleteConfirmationModal from '../../components/organisms/DeleteConfirmationModal';<%}%>
<% if((isCrudWithNode||isCrud) && (isBootstrap || isTailWind)) {%>import DeleteConfirmationModal from './DeleteConfirmationModal';<%}%>
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
      <% if(isBootstrap) {%>
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
      <% if(isTailWind) {%>
      <>
			<Button
				name='Edit'
				variant='rounded-lg'
				color='bg-blue-600'
				size=''
				onClick={() => {
					handleShow()
					dispatch(setSelectedUserModal({ id }))
					dispatch(setSelectedUser(row))
				}}
			/>
      </>
    <%}%>
    )

    const deleteFormatter= (id,row)=>(
      <% if(isBootstrap) {%>
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
      <% if(isTailWind) {%>
        <>
        <Button
          name='Delete'
          variant='rounded-lg'
          color='bg-red-600'
          align='content-center'
          onClick={() => {
            username = row.username
            deleteId = id
            setConfirmDelete(true)
          }}
        />
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
        
        <% if((isCrudWithNode||isCrud) && isBootstrap) {%>
          <Button className='m-2' onClick={() => handleShow()}>Add User</Button>
        <%}%>
        
        <% if((isCrudWithNode||isCrud) && isMaterialUI) {%>
          <Button variant='contained' onClick={() => handleShow()}>Add User</Button>
          <Box sx={{ height: '1.5rem' }} />
        <%}%>

        <% if((isCrudWithNode||isCrud) && isTailWind) {%>
          <div className='dark:bg-[#1d1717]'>
          <button
            className='text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 '
            onClick={() => handleShow()}
          >
            Add User
          </button>
        </div>
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

