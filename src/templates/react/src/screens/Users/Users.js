<% if(isStore && (isCrudWithNode||isCrud)){%>import React, {useState,useEffect} from "react"<%}%>
<% if(isCrudWithNode||isCrud) {%>import { Button } from "react-bootstrap";<%}%>
<% if(isStore && (isCrudWithNode||isCrud)){%>import { useSelector, useDispatch } from "react-redux";<%}%>
<% if(isCrudWithNode||isCrud){%>import { getUsers  <% if(isCrudWithNode) {%> ,deleteUsers<%}%>} from "./users.actions";<%}%>
<% if(isStore && (isCrudWithNode||isCrud)){%>import { selectAllUsers } from "./users.selectors";<%}%>
<% if(isCrudWithNode||isCrud) {%>import AddUser from './AddUser'<%}%>
<% if(isStore && (isCrudWithNode||isCrud)){%> import Table from '../../components/organisms/Table'<%}%>


<% if(isCrud ||isCrudWithNode) {%>import { actions } from './users.reducer'
const {setSelectedUserModal,setSelectedUser} = actions<%}%>
<% if(isCrud) {%>const {deleteUser} = actions<%}%>

const Users = () => {
  <% if(isStore && (isCrudWithNode||isCrud)){%> const dispatch = useDispatch();
const users = useSelector(selectAllUsers);
    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);<%}%>

  

    <% if(isCrudWithNode||isCrud) {%> 
      const [show, setShow] = useState(false)
	const handleShow = () => setShow(true)
    const handleDelete = (id) => {
      <% if(isCrud) {%>
      dispatch(deleteUser({id}))
      <%}%>
      <% if(isCrudWithNode) {%>
      dispatch(deleteUsers({ id}));
      <%}%>
    };

  const editFormatter = (id, row) => (
    <Button size="sm" onClick={() => {
      handleShow()
      dispatch(setSelectedUserModal({id}))
      dispatch(setSelectedUser(row))
    }}>
      Edit
    </Button>
  )

    const deleteFormatter= (id)=>(
      <Button
      variant="danger"
      size="sm"
      onClick={() => handleDelete(id)}
    >
      Delete
    </Button>
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
        <% if(isCrudWithNode||isCrud) {%>
      <Button className='m-2' onClick={() => handleShow()}>Add User</Button>
      <%}%>
      <% if(isStore && (isCrudWithNode||isCrud)){%> <Table data={users} keyField='id'columns={cols}/><%}%> 
    </div>
    
    <%if((isCrudWithNode||isCrud)){%>{show && <AddUser show={setShow} handleShow={handleShow} />}<%}%>
    </>
  );
};

export default Users;

