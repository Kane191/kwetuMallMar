import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import Form from 'react-bootstrap/Form';
import privateApi from '../../api/privateApi';
import Container from 'react-bootstrap/Container';



const MyAccount = () => {
  const [myData, setMyData] = useState({firstName: '', lastName: '', email: '', phoneNumber: ''});
  const [message, setMessage] = useState(null);
  const getMe = async() => {
    const {data} = await privateApi.get('/user/getme');
    console.log(data); 
    if(data.message === "Successfully fetched authenticated user!"){
        setMyData(data.data);
    }
  }
  const updateUser = async(e) => {
    e.preventDefault();
    const {data} = await privateApi.post('/user/update/me', myData);
    console.log(data);
    if(data.message === 'Updated user successfully!'){
        setMyData(data.data);
        setMessage('Updated details successfully!');
        setTimeout(()=>{
            setMessage(null);
        }, 3000);
    }
  }
  useEffect(()=>{
    getMe();
  },[]);
  return ( 
    <div>
        <NavBar/>
        <Container style={styles.cont}>
            <h3 className="mb-3">My Account</h3>
            <Form onSubmit={updateUser}>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" value={myData.firstName} 
                    onChange={(e)=> setMyData({...myData, firstName: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" value={myData.lastName}
                    onChange={(e)=> setMyData({...myData, lastName: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="text" value={myData.phoneNumber}
                    onChange={(e)=> setMyData({...myData, phoneNumber: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={myData.email}
                    onChange={(e)=> setMyData({...myData, email: e.target.value})}/>
                </Form.Group>
                <button style={{...styles.btn, ...styles.submitBtn}}>Update</button>
                {message? <p>{message}</p> : null}
            </Form>
        </Container>
    </div>
  )
}

const styles = {
    cont: {
        display: 'block',
        padding: '0 100px',
    },
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

export default MyAccount