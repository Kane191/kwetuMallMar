import React, {useState, useEffect} from 'react';
import privateApi from '../../api/privateApi';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0)
  const getItemsCount = async() => {
    try {
        const { data } = await privateApi.get('/cart/items/count');
        console.log(data);
        setCount(data.number);
    } catch (error) {
        console.log(error.message)
    }
  }
  useEffect(()=>{
    getItemsCount()
  }, [])
  return (
    <Container style={styles.nav} className="mb-3">
        <a style={styles.link} href='/'>KwetuMall</a>
        <div style={styles.icons}>
            <AccountCircleIcon style={styles.icon}/>
            <ShoppingCartIcon style={styles.icon} onClick={()=> navigate('/cart')}/>
            <p style={styles.cartNo}>{count}</p>
        </div>
    </Container>
  )
}
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0,0,0,0.3)',
        padding: '20px 0 5px',
    },
    icons: {
        // marginRight: '10px'
        // border: '1px solid black',
        width: '85px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    link: {
        textDecoration: 'none',
        color: '#000',
        fontWeight: 500,
        fontSize: '1.2em'
    },
    cartNo: {
        marginTop: '-10px',
        marginLeft: '-25px',
        fontSize: '0.6em',
        fontWeight: 500,
        background: '#000',
        color: '#fff',
        height: '1.6em',
        width: '1.6em',
        textAlign: 'center',
        borderRadius: '50%',
        padding: 0
    },
    icon: {
        cursor: 'pointer'
    }
}

export default NavBar