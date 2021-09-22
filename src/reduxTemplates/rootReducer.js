import { combineReducers } from 'redux'
import * as modal from './widgets/modal'
import * as users from "./Screens/Users";

export default combineReducers({
	[modal.name]: modal.reducer,
	[users.name]: users.reducer,
})