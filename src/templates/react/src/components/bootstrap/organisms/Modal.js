import { Modal } from 'react-bootstrap'

export default function ViceModal({
	children,
	show,
	handleClose,
	footer,
	title,
	size = 'sm-down',
}) {
	return (
		<Modal show={show} onHide={handleClose} size={size}>
			<Modal.Header className='border-0'>
				<Modal.Title className='f-32 font-semi-bold'>{title}</Modal.Title>
				<button className='btn-close' onClick={handleClose}></button>
			</Modal.Header>
			<Modal.Body className='py-0 mb-0'>{children}</Modal.Body>
			<Modal.Footer className='justify-content-between border-0'>
				{footer}
			</Modal.Footer>
		</Modal>
	)
}
