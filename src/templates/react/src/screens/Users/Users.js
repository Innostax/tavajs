<% if(isRedux && (isCrudWithNode||isCrud)){%>import React, {useState,useEffect} from "react"<%}%>
<% if(isCrudWithNode||isCrud) {%>import { Button } from "react-bootstrap";<%}%>
<% if(isRedux && (isCrudWithNode||isCrud)){%>import { useSelector, useDispatch } from "react-redux";<%}%>
<% if(isCrudWithNode||isCrud){%>import { getUsers  <% if(isCrudWithNode) {%> ,deleteUsers<%}%>} from "./users.actions";<%}%>
<% if(isRedux && (isCrudWithNode||isCrud)){%>import { selectAllUsers } from "./users.selectors";<%}%>
<% if(isCrudWithNode||isCrud) {%>import AddUser from './AddUser'<%}%>
<% if(isRedux && (isCrudWithNode||isCrud)){%> import Table from '../../components/organisms/Table'<%}%>


<% if(isCrud ||isCrudWithNode) {%>import { actions } from './users.reducer'
const {setSelectedUserModal,setSelectedUser} = actions<%}%>
<% if(isCrud) {%>const {deleteUser} = actions<%}%>

const Users = () => {
  <% if(isRedux && (isCrudWithNode||isCrud)){%> const dispatch = useDispatch();
const users = useSelector(selectAllUsers);
    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);<%}%>

  

    <% if(isCrudWithNode||isCrud) {%> 
      const [show, setShow] = useState(false)
	const handleShow = () => setShow(true)
    const handleDelete = (id,row) => {
      <% if(isCrud) {%>
      dispatch(deleteUser(id))
      <%}%>
      <% if(isCrudWithNode) {%>
      dispatch(deleteUsers({ id: row.id }));
      <%}%>
    };

  const editFormatter = (id, row) => (
    <Button size="sm" onClick={() => {
      handleShow()
      dispatch(setSelectedUserModal({id}))
      dispatch(dispatch(setSelectedUser(row)))
    }}>
      Edit
    </Button>
  )

    const deleteFormatter= (id,row)=>(
      <Button
      variant="danger"
      size="sm"
      onClick={() => handleDelete(id,row)}
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
  
]
<%}%>
  return (
    <>
    <div>
      <h1>Welcome to Users Screen</h1>
      <% if(isRedux){%><h4>Welcome to React Redux Toolkit Crash Course</h4>
      <%}%>
        <% if(isCrudWithNode||isCrud) {%>
      <Button className='m-2' onClick={() => handleShow()}>Add User</Button>
      <%}%>
      <% if(isRedux && (isCrudWithNode||isCrud)){%> <Table data={users} keyField='_id'columns={cols}/><%}%> 
    </div>
    
    <%if((isCrudWithNode||isCrud)){%>{show && <AddUser show={setShow} handleShow={handleShow} />}<%}%>
    </>
  );
};

export default Users;

