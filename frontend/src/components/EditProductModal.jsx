import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import publicApi from '../api/publicApi';
import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EditProductModal = ({id, productData, setProductData, updateProduct}) => {
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getCategories = async () => {
        const { data } = await publicApi.get('/categories/')
        console.log(data)
        setCategories(data.data)
    }
    const getProduct = async () => {
        const {data} = await publicApi.get(`/products/${id}`)
        setProductData(data.data)
        console.log(data)
    }
    useEffect(()=>{
        getCategories()
    },[]);
  return (
    <>
      <EditIcon onClick={()=>{
        getProduct()
        handleShow()
      }}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={updateProduct}>
            <Row className='mb-3'>
                <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={productData.name}
                onChange={(e)=> setProductData({...productData, name: e.target.value})}/>
                </Col>
                
            </Row>
            <Row className='mb-3'>
               
                <Col>
                <Form.Label>Buying price</Form.Label>
                <Form.Control type="number" value={productData.buyingPrice || 0}
                onChange={(e)=> setProductData({...productData, buyingPrice: e.target.value})}/>
                </Col>
            </Row>
            <Form.Group className='mb-3'>
                <Form.Label>Selling price</Form.Label>
                <Form.Control type="number" value={productData.price}
                onChange={(e)=> setProductData({...productData, price: e.target.value})}/>
            </Form.Group>
            <Row className='mb-3'>
                <Col>
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" value={productData.stock}
                onChange={(e)=> setProductData({...productData, stock: e.target.value})}/>
                </Col>
                <Col>
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example" value={productData.category[0]}
                onChange={(e)=> setProductData({...productData, category: [...productData.category, e.target.value]})}>
                    <option></option>
                    {
                        categories.map((category)=> <option key={category._id} value={category.name}>{category.name}</option>)
                    }
                </Form.Select>
                </Col>
            </Row>
            <div style={styles.flex}>
                <p>
                    {
                        productData.category.map((catry)=> catry+ ' ')
                    }
                </p>
                
                {
                    productData.category.length > 0 ? 

                    <DeleteIcon style={styles.cursor} onClick={()=>setProductData({...productData, category: []})}/>

                    : null
                }
            </div>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" type="text" value={productData.description}
                onChange={(e)=> setProductData({...productData, description: e.target.value})}/>
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
export default EditProductModal