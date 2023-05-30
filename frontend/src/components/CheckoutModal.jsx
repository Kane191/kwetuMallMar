import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import privateApi from '../api/privateApi';
import Button from 'react-bootstrap/Button';
const CheckoutModal = ({cart}) => {
    const [show, setShow] = useState(false);
    const [pickupoints, setPickuppoints] = useState([]);
    const [locations, setLocations] = useState([]);
    const [names, setNames] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getNames = (e) => {
      let filteredPickupoints = pickupoints.filter((pickupoint)=>{
        return pickupoint.location === e;
      });
      setNames(filteredPickupoints);
    }
    const getPickupPoints = async() => {
        const { data } = await privateApi.get('pickuppoints');
        console.log(data)
        if(data.message === 'Fetched pickupPoints successfully!'){
          setPickuppoints(data.data);
          let arr = [];
          for(let i = 0; i<data.data.length; i++){ 
            arr = [...arr, data.data[i].location];
          }
          let newArr = new Set(arr);
          setLocations([...newArr]);
        }
    }
    const checkout = async(e) => {
      e.preventDefault();
      const { data } = await privateApi.post('/cart/clear', cart);
      console.log(data);
    }
    useEffect(()=> {getPickupPoints()}, [])
    return (
      <>
        <Button variant="primary" style={styles.btn2}  onClick={handleShow}>
          Proceed to checkout
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Checkout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={checkout} style={styles.form}>
                <Form.Group className="mb-3">
                    <Form.Label>Pick checkout location</Form.Label>
                    <Form.Select required onChange={(e)=> getNames(e.target.value)}>
                        <option></option>
                        {
                          locations.map((location)=>{
                            return(
                              <option key={location} value={location}>{location}</option>
                            )
                          })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Choose pick up point</Form.Label>
                    <Form.Select required>
                        <option></option>
                        {
                          names.map((name)=>{
                            return(
                              <option key={name.name} value={name.name}>{name.name}</option>
                            )
                          })
                        }
                    </Form.Select>
                </Form.Group>
           
                <Button variant="primary" type="submit" style={styles.btn}>
                    Checkout 
                </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    )
}

const styles = {
  form: {
    padding: '0 35px 20px'
  },
  btn: {
      width: '100%', 
      background: 'black',
      border: 'none'
  },
  btn2: {
      width: '300px', 
      background: 'black',
      border: 'none',
      display: 'block',
      margin: '0 auto'
  }
}
export default CheckoutModal