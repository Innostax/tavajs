import React,{useEffect} from 'react'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { useSelector,useDispatch } from 'react-redux'
import { actions } from '../Users/users.reducer'
import { selectSelectedUser } from '../../Screens/Users/users.selectors'
import { Row, Col } from 'react-bootstrap'
 
const { setSelectedUserModal } = actions

const ShowDetails = () => {
    const dispatch = useDispatch()
    const resetModal = () => dispatch(setSelectedUserModal(null))
    const user = useSelector(selectSelectedUser)
        useEffect(() => {
		dispatch(showModal())
		return () => {
			dispatch(hideModal())
		}
	}, [dispatch])

	return (					
        <Modal
        title='Show User'
        reset={resetModal}
        size='lg'
    >
        <Row>
            <Col className='p-2'><b>{user.name}</b></Col>
         </Row>   
         <Row>
             <Col><b>ADDRESS</b></Col>
            <Col>{user.address.suite},{user.address.street},{user.address.city}</Col>
         </Row>
         <Row>
             <Col><b>COMPANY</b></Col>
             <Col>{user.company.name}</Col>
         </Row>    
    </Modal>
    )   
}
export default ShowDetails