import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
<% if(isCrud || isCrudWithNode) {%>import { useDispatch } from 'react-redux'<%}%>
<% if(isCrud) {%>import { actions } from '../../screens/Users/users.reducer'<%}%>
<% if(isCrudWithNode) {%>import { deleteUsers } from '../../screens/Users/users.actions'<%}%>


const DeleteConfirmationModal = ({ id }) => {
	<% if(isCrud || isCrudWithNode) {%> const dispatch = useDispatch()<%}%>

	<% if(isCrud) {%>
	const { deleteUser } = actions
	<%}%>
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const handleDelete = () => {
		<%if(isCrud) {%>
			dispatch(deleteUser({ id }))
			handleClose()
		<%}%>
		<%if(isCrudWithNode) {%>
			dispatch(deleteUsers({ id }))
			handleClose()
			<%}%>
		}
	return (
		<div>
			<Button
				variant='outlined'
				onClick={handleOpen}
				size='small'
				color='error'
			>
				Delete
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth>
				<DialogTitle>Confirm Delete?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You are going to delete this row
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleDelete} autoFocus color='error' variant="contained">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default DeleteConfirmationModal
