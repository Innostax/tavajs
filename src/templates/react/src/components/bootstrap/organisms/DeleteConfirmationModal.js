import { Modal, Button } from 'react-bootstrap'

const DeleteConfirmationModal = ({ open, setOpen, deleteUser }) => {
	const handleClose = () => setOpen(false)
	return (
		<div>
			<Modal show={open} onHide={handleClose}>
				<Modal.Header className='border-0'>
					<Modal.Title className='f-32 font-semi-bold'>Delete</Modal.Title>
					<button className='btn-close' onClick={handleClose}></button>
				</Modal.Header>
				<Modal.Body className='py-0 mb-0'>
					You are going to delete this row
				</Modal.Body>
				<Modal.Footer className='justify-content-end border-0'>
				<Button
						variant='outline-primary'
						onClick={() => {
							handleClose()
						}}
					>
						Close
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							deleteUser()
							handleClose()
						}}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default DeleteConfirmationModal