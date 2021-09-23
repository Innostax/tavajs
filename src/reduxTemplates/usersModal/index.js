import React from 'react'
<% if(isCrudWithNode||isCrud) {%> import AddUser from './AddUser'<%}%>
import ShowDetails from './ShowDetails'
import { USERS_MODAL_TYPES } from './userModal.constants'

const getUserModal = (modalName) => {
	switch (modalName) {
		case USERS_MODAL_TYPES.SHOW_USER_MODAL:	
		return <ShowDetails />
		<% if(isCrudWithNode||isCrud) {%> 
		case USERS_MODAL_TYPES.ADD_USER_MODAL:
		return <AddUser/>	
		<%}%>
		default:
			return null
	}
}

export default getUserModal
