import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useDispatch } from 'react-redux'
import { actions } from '../../screens/Users/users.reducer'

const DeleteConfirmation = ({ id }) => {
	const dispatch = useDispatch()
	const { deleteUser } = actions

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const handleDelete = () => dispatch(deleteUser({ id }))

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

export default DeleteConfirmation
