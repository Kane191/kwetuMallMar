import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import publicApi from '../../../api/publicApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({firstName: '', lastName: '', email: '', phoneNumber: '', password: ''});
  const [errorMsg, setErrorMsg] = useState(null);
  const register = async(e) => {
    e.preventDefault();
    try {
        const { data } = await publicApi.post('/admin/register',registerData);
        console.log(data)
        if(data.message === 'Admin created successfully!'){
            navigate('/admin/login')
        } 
    } catch (error) {
        setErrorMsg('Something went wrong, try again')
    }
  }
  return (
    <div style={styles.cont}>
         <Form style={styles.form} onSubmit={register}>
            <h3>Register</h3>
            <Row className="mb-3">
                <Col>
                <Form.Control type="text" placeholder="First name" value={registerData.firstName} required
                onChange={(e)=> setRegisterData({...registerData, firstName: e.target.value})}/>
                </Col>
                <Col>
                <Form.Control type="text" placeholder="Last name" value={registerData.lastName} required
                onChange={(e)=> setRegisterData({...registerData, lastName: e.target.value})}/>
                </Col>
            </Row>
            
            <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email" value={registerData.email} required
                onChange={(e)=> setRegisterData({...registerData, email: e.target.value})}/>
            </Form.Group>

            <Row className="mb-3">
                <Col>
                <Form.Control type="text" placeholder="Phone number" value={registerData.phoneNumber} required
                onChange={(e)=> setRegisterData({...registerData, phoneNumber: e.target.value})}/>
                </Col>
                <Col>
                <Form.Control type="password" placeholder="Password" value={registerData.password} required
                onChange={(e)=> setRegisterData({...registerData, password: e.target.value})}/>
                </Col>
            </Row>

            <Button variant="primary" type="submit" style={styles.btn}>
                Submit
            </Button>
            {errorMsg ? <p style={styles.err}>{errorMsg}</p> : null}
            
        </Form>
    </div>
  )
}

const styles= {
    cont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url('/shopping.png')`,
        overflowY:'hidden'
    },
    form: {
        minWidth: '450px',
        maxWidth: '500px',
        // border: '1px solid #000',
        padding: '30px',
        borderRadius: '10px',
        background: '#fff'
        // height: 'max-content'
    },
    btn: {
        width: '100%',
        background: '#000',
        outline: 'none',
        border: 'none'
    },
    err: {
        color: 'red',
        fontSize: '0.7em'
    }
}

export default Register