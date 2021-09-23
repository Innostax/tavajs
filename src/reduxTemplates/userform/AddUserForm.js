import React, { useEffect, useState } from 'react'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { useDispatch,useSelector } from 'react-redux'
import { actions } from '../Users/users.reducer'
import { Row, Col, Button } from 'react-bootstrap'
import { selectSelectedUser } from '../Users/users.selectors'

const { setSelectedUserModal,setSelectedUser,editUser,addNewUser } = actions

const AddUserForm = () => {
    const dispatch = useDispatch()
    const resetModal = () => {dispatch(setSelectedUserModal(null))
        dispatch(setSelectedUser(null))
    }
    const user = useSelector(selectSelectedUser)
    const [formData, setFormData] = useState(Object.keys(user).length !== 0?user:{
        name: "",
        username: "",
        email: "",
    });


    useEffect(() => {
        dispatch(showModal())
        return () => {
            dispatch(hideModal())
        }
    }, [dispatch])

    const handleSubmit=()=>{
        if(Object.keys(user).length !== 0)
            dispatch(editUser(formData))
        else
        dispatch(addNewUser(formData))
    }
    return (
        <Modal
            title={Object.keys(user).length !== 0?'Edit User':'Add User'}
            reset={resetModal}
            size='lg'
        >
            <Row>
                <Col>
                    <label>
                        <b>Name :</b>
                    </label>
                </Col>
                <Col>
                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="ABC"
                        id="nameInput"
                        onChange={(e) => setFormData((data) => ({ ...data, name: e.target.value }))}
                        value={formData.name}
                    />
                </Col>
            </Row>
            <Row className='pt-2'>
                <Col>
                    <label>
                        <b>User Name :</b>
                    </label>
                </Col>
                <Col>

                    <input
                        className="u-full-width"
                        type="text"
                        placeholder="curiousgeek"
                        id="usernameInput"
                        onChange={(e) => setFormData((data) => ({ ...data, username: e.target.value }))}
                        value={formData.username}
                    />
                </Col>
            </Row>
            <Row className='pt-2'>
                <Col>
                    <label>
                        <b>Email :</b>
                    </label>
                </Col>
                <Col>
                    <input
                        className="u-full-width"
                        type="email"
                        placeholder="test@mailbox.com"
                        id="emailInput"
                        onChange={(e) => setFormData((data) => ({ ...data, email: e.target.value }))}
                        value={formData.email}
                    />
                </Col>
            </Row>
            <Row className='pt-2'>
                <Button 
                onClick={handleSubmit}
                    size='sm'
                >
                   {Object.keys(user).length !== 0?'EDIT':'ADD'}
                </Button>
            </Row>
        </Modal>
    )
}
export default AddUserForm