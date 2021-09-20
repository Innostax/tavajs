import React<% if(isRedux){%>,{ useEffect }<%}%> from "react";
<% if(isRedux) {%>import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./users.actions";
import { selectAllUsers } from "./users.selectors";
import Table from '../../widgets/table'
import { USERS_MODAL_TYPES } from "../usersModal/userModal.constants";
import { actions } from './users.reducer'
import { selectSelectedUserModal } from "./users.selectors";
import getUserModal from "../usersModal";
const {setSelectedUserModal,setSelectedUser} = actions
<%}%>
const Users = () => {
  <% if(isRedux) {%>const dispatch = useDispatch();
const users = useSelector(selectAllUsers);
const userModal = useSelector(selectSelectedUserModal)    
    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);<%}%>


    <% if(isRedux) {%>
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

const cols=[
  {
    dataField: 'id',
    text: 'Id'
  },
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
    formatter: buttonFormatter,
  },
]
<%}%>
  return (
    <>
    <% if(isRedux){%>{userModal&& getUserModal(userModal)}<%}%> 
    <div>
      <h1>Welcome to Users Screen</h1>
      <% if(isRedux){%><h4>Welcome to React Redux Toolkit Crash Course</h4>
      <Table data={users} keyField='id'columns={cols}/>
      <%}%> 
    </div>
    </>
  );
};

export default Users;
