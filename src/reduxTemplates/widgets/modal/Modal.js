import React from 'react'
import  Modal from 'react-bootstrap/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { selectShowModal } from './modal.selectors'
import { actions } from './modal.slice'
const { hideModal } = actions

export default function ViceModal({
	children,
	footer,
	title,
	reset,
	size = 'lg',
}) {
	const show = useSelector(selectShowModal)
	const dispatch = useDispatch()

	const handleClose = () => {
		dispatch(hideModal())
		if (reset) reset()
	}
	return (
		<Modal
			show={show}
			onHide={handleClose}
			size={size}
		>
			<Modal.Header className='border-0'>
							<Modal.Title className='f-32 font-semi-bold'>{title}</Modal.Title>	
			</Modal.Header>
			<Modal.Body
				className='py-0 mb-0'
				>
				{children}
			</Modal.Body>
			<Modal.Footer className='justify-content-start border-0'>
				{footer}
			</Modal.Footer>
		</Modal>
	)
}

