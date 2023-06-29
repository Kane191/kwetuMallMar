import React, {useState, useEffect} from 'react';
import Sidenav from './Sidenav';
import Form from 'react-bootstrap/Form';
import adminApi from '../../api/adminApi';


const MyAccount = () => {
  const [message, setMessage] = useState(null || '');
  const [myData, setMyData] = useState({firstName: '', lastName: '', phoneNumber: '',email: ''});
  const getMyAccount = async() => {
    const {data} = await adminApi.get('/admin/me');
    console.log(data)
    if(data.message === 'Fetched my admin account successfully!'){
        setMyData(data.data)
    }
  }
  const updateMyAccount = async(e) => {
    e.preventDefault();
    const {data} = await adminApi.post('/admin/me/update', myData);
    console.log(data)
    if(data.message === 'Updated admin successfully!'){
        setMyData(data.data);
        setMessage(data.message);
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    }
  }
  useEffect(()=>{
    getMyAccount();
  },[]);
  return (
    <div>
        <Sidenav/>
        <div style={styles.cont}>
            <h3 className="mb-3">My Account</h3>
            <Form onSubmit={updateMyAccount}>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" value={myData.firstName}
                    onChange={(e)=>setMyData({...myData, firstName: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text"  value={myData.lastName}
                    onChange={(e)=>setMyData({...myData, lastName: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="text"  value={myData.phoneNumber}
                    onChange={(e)=>setMyData({...myData, phoneNumber: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"  value={myData.email}
                    onChange={(e)=>setMyData({...myData, email: e.target.value})}/>
                </Form.Group>
                <button style={{...styles.btn, ...styles.submitBtn}}>Submit</button>
                {message? <p>{message}</p> : null}
            </Form>
        </div>
    </div>
  )
}

const styles = {
    cont: {
        marginLeft: '260px',
        marginRight: '10px',
        paddingTop: '10px'
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