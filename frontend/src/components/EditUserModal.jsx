import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import publicApi from '../api/publicApi';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditIcon from '@mui/icons-material/Edit';

const EditUserModal = ({id, userData, setUserData, updateUser}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUser = async()=> {
        const {data} = await publicApi.get(`/user/${id}`);
        console.log(data)
        setUserData(data.data)
    }
  
    return (
      <>
        <EditIcon onClick={()=>{
            getUser()
            handleShow()
          }}
        />
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={updateUser}>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" value={userData.firstName}
                        onChange={(e)=> setUserData({...userData, firstName: e.target.value})}/>
                    </Col>
                    <Col>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text"  value={userData.lastName}
                        onChange={(e)=> setUserData({...userData, lastName: e.target.value})}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"  value={userData.email}
                        onChange={(e)=> setUserData({...userData, email: e.target.value})}/>
                    </Col>
                    <Col>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text"  value={userData.phoneNumber}
                        onChange={(e)=> setUserData({...userData, phoneNumber: e.target.value})}/>
                    </Col>
                </Row>
                <button style={{...styles.btn, ...styles.submitBtn}}>Submit</button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
}

const styles = {
    submitBtn: {
        width: '100%'
    },
    btn: {
        background: '#000',
        color: '#fff',
        border: 'none',
        padding: '10px',
        width: '200px',
        borderRadius: '10px',
        margin: '10px 0'
    }
}
export default EditUserModal