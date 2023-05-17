import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const EditCategoryModal = ({id, name, categoryData, setCategoryData, updateCategory}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   const getCategory = async () => {
//     const {data} = await publicApi.get(`/categories/${id}`)
//     console.log(data)
//   }

  return (
    <>
      {/* <button style={styles.btn} onClick={handleShow}>Add category</button> */}
      <EditIcon onClick={()=>{
        setCategoryData({...categoryData, name: name, id: id })
        handleShow()
      }}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={updateCategory}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={categoryData.name} onChange={(e)=>setCategoryData({...categoryData, name: e.target.value})}/>
               
            </Form.Group>
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

export default EditCategoryModal

// EditCategoryModal