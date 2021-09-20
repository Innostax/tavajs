import React from 'react'
import ShowDetails from './ShowDetails'
import { USERS_MODAL_TYPES } from './userModal.constants'

const getUserModal = (modalName) => {
	switch (modalName) {
		case USERS_MODAL_TYPES.SHOW_USER_MODAL:	
		return <ShowDetails />
		default:
			return null
	}
}

export default getUserModal
