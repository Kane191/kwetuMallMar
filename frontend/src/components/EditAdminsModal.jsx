import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import adminApi from '../api/adminApi';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';

const EditAdminsModal = ({id, adminData, setAdminData, updateAdmin}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const getAdmin = async() => {
    const {data} = await adminApi.get(`/admin/${id}`);
    console.log(data);
    if(data.message === 'Fetched admin successfully!'){
        setAdminData(data.data)
    }
  }

  return (
    <>
      <EditIcon onClick={()=>{
        getAdmin();
        handleShow();
      }}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={updateAdmin}>
            <Row className="mb-3">
                <Col>
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" value={adminData.firstName}
                    onChange={(e)=> setAdminData({...adminData, firstName: e.target.value})}/>
                </Col>
                <Col>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text"  value={adminData.lastName}
                    onChange={(e)=> setAdminData({...adminData, lastName: e.target.value})}/>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"  value={adminData.email}
                    onChange={(e)=> setAdminData({...adminData, email: e.target.value})}/>
                </Col>
                <Col>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="text"  value={adminData.phoneNumber}
                    onChange={(e)=> setAdminData({...adminData, phoneNumber: e.target.value})}/>
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

export default EditAdminsModal