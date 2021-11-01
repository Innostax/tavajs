
import Modal from 'react-bootstrap/Modal'

export default function ViceModal({
	children,
	show,
	handleClose,
	footer,
	title,
	size = 'lg',
}) {
	
	return (
		<Modal show={show} onHide={handleClose} size={size}>
			<Modal.Header className='border-0'>
				<Modal.Title className='f-32 font-semi-bold'>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body className='py-0 mb-0'>{children}</Modal.Body>
			<Modal.Footer className='justify-content-start border-0'>
				{footer}
			</Modal.Footer>
		</Modal>
	)
}
