

import { Modal } from 'react-bootstrap'
export default function TavaJSModal({
	children,
	shouldOpen,
	handleClose,
	footer,
	title,
	size="sm-down",
}) {
	
	return (
		<Modal show={shouldOpen} onHide={handleClose} size={size}>
            <Modal.Header closeButton className='border-0'>
                <Modal.Title className='f-32 font-semi-bold'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='py-0 mb-0'>{children}</Modal.Body>
            <Modal.Footer className='justify-content-between border-0'>
                {footer}
            </Modal.Footer>
        </Modal>
	)
}
