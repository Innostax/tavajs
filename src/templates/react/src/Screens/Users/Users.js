import React<% if(isRedux){%>,{ useEffect }<%}%> from "react";
<% if(isCrudWithNode||isCrud) {%>import { Button } from "react-bootstrap";<%}%>
<% if(isRedux) {%>import { useSelector, useDispatch } from "react-redux";
import { getUsers  <% if(isCrudWithNode) {%> ,deleteUsers<%}%>} from "./users.actions";
import { selectAllUsers, selectSelectedUserModal } from "./users.selectors";
import Table from '../../widgets/table'
import { USERS_MODAL_TYPES } from "../usersModal/userModal.constants";
import { actions } from './users.reducer'
import getUserModal from "../usersModal";
const {setSelectedUserModal,setSelectedUser} = actions
<% if(isCrud) {%>const {deleteUser} = actions<%}%>
<%}%>
const Users = () => {
  <% if(isRedux) {%>const dispatch = useDispatch();
const users = useSelector(selectAllUsers);
const userModal = useSelector(selectSelectedUserModal)    
    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);<%}%>

    <% if(isRedux && !isCrudWithNode &&!isCrud ) {%>
    const buttonFormatter = (id, row) => (
      <button
        size='sm'
        variant='primary'
        className='font-weight-normal'
        onClick={()=>{
          dispatch(setSelectedUser(row))
          dispatch(setSelectedUserModal(USERS_MODAL_TYPES.SHOW_USER_MODAL))}}
      >
      Show All Details
      </button>
    )
    <%}%>

    <% if(isCrudWithNode||isCrud) {%> 
    const handleDelete = (id) => {
      <% if(isCrud) {%>
      dispatch(deleteUser(id))
      <%}%>
      <% if(isCrudWithNode) {%>
      dispatch(deleteUsers({ Id: id }));
      <%}%>
    };

  const editFormatter = (id, row) => (
    <Button size="sm" onClick={() => {
      dispatch(setSelectedUserModal(USERS_MODAL_TYPES.ADD_USER_MODAL))
      dispatch(dispatch(setSelectedUser(row)))
    }}>
      Edit
    </Button>
  )

    const deleteFormatter= (id,row)=>(
      <Button
      variant="danger"
      size="sm"
      onClick={() => handleDelete(id)}
    >
      Delete
    </Button>
    )
    <%}%>
    <% if(isRedux) {%> 
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
  <% if(isCrudWithNode||isCrud) {%>
    {
      dataField: '_id',
      text: '',
      align: 'right',
      formatter: deleteFormatter,
    },
    {
      dataField: '_id',
      text: '',
      align: 'left',
      formatter: editFormatter,
    },
  <%}%>  
  <% if(isRedux&&!isCrudWithNode&&!isCrud) {%>
  {
    dataField: '_id',
    text: '',
    align: 'right',
    formatter: buttonFormatter,
  },
  <%}%>
]
<%}%>
  return (
    <>
    <% if(isRedux){%>{userModal&& getUserModal(userModal)}<%}%> 
    <div>
      <h1>Welcome to Users Screen</h1>
      <% if(isRedux){%><h4>Welcome to React Redux Toolkit Crash Course</h4>
      <%}%>
        <% if(isCrudWithNode||isCrud) {%>
      <Button className='m-2' onClick={() => dispatch(setSelectedUserModal(USERS_MODAL_TYPES.ADD_USER_MODAL))}>Add User</Button>
      <%}%>
      <% if(isRedux){%> <Table data={users} keyField='_id'columns={cols}/><%}%> 
    </div>
    </>
  );
};

export default Users;

