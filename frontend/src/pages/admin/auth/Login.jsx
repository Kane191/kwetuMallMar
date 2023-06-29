import React, { useState } from 'react'
import Cookies from "js-cookie";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import publicApi from '../../../api/publicApi';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({email: '', password: ''});

  const login = async(e) => {
    e.preventDefault();
    const {data} = await publicApi.post('/admin/login', loginData);
    console.log(data);
    if(data.message === 'Admin successfully authenticated!'){
        Cookies.set('adminToken', data.token);
        navigate('/admin');
    }
  }
  return (
    <div style={styles.cont}>
        <Form style={styles.form} onSubmit={login}>
            <h3 style={styles.divider} className="mb-3">Login</h3>
            
            <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email" value={loginData.email} required
                onChange={(e)=> setLoginData({...loginData, email: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password" value={loginData.password} required
                onChange={(e)=> setLoginData({...loginData, password: e.target.value})}/>
            </Form.Group>


            <Button variant="primary" type="submit" style={styles.btn}>
                Submit
            </Button>
            
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
    },
    divider: {
        // height: '1px',
        // background: 'rgba(0,0,0,0.3)',
        // marginBottom: '10px',
        borderBottom: '1px solid rgba(0,0,0,0.3)'
    }
}

export default Login