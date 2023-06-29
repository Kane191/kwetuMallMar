import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import NotLoggedInAlert from '../../components/NotLoggedInAlert';

const Sidenav = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const checkIfAuthenticated = () =>{
    const token = Cookies.get('adminToken')
    if(!token){
      setShow(true)
    }
  }

  useEffect(()=>{
    checkIfAuthenticated();
  },[]);

  return (
    <>
      <NotLoggedInAlert show={show} setShow={setShow} path='/admin/login'/>
      <div style={styles.cont}>
        <h4 style={styles.heading}>KwetuMall <br/>Admin Panel</h4>
        <div style={styles.dflex}>
          <div>
            <button style={styles.btn} onClick={()=>navigate('/admin/products')}>Products</button>
            <button style={styles.btn} onClick={()=>navigate('/admin/categories')}>Categories</button>
            <button style={styles.btn}>Pickup Points</button>
            <button style={styles.btn} onClick={()=>navigate('/admin/users')}>Users</button>
            <button style={styles.btn} onClick={()=>navigate('/admin/admins')}>Admins</button>
          </div>
          <div>
            <button style={styles.btn} onClick={()=>navigate('/admin/account')}>My account</button>
            <button style={styles.btn}>Logout</button>
          </div>
        </div>
      </div>
    </>
  )
}

const styles = {
    cont: {
        background: 'rgb(0, 0, 0)',
        width: '250px',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0
    },
    heading: {
        color: '#fff',
        paddingLeft: '15px',
        paddingTop: '10px'
    },
    btn: {
      width: '90%',
      display: 'block',
      border: '1px solid #fff',
      background: '#000',
      color: '#fff',
      margin: '10px auto',
      padding: '10px',
      borderRadius: '10px'
    },
    dflex: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '85%'
    }
}
export default Sidenav