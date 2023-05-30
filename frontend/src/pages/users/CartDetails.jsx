import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import privateApi from '../../api/privateApi';
import Container from 'react-bootstrap/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckoutModal from '../../components/CheckoutModal';

const CartDetails = () => {
  const [cart, setCart] = useState([]);
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  const getCart =async()=>{
    const { data } = await privateApi.get('/cart/get');
    console.log(data)
    setCart(data.data)
  }
  const getTotal = () =>{
    // let total = 0
    // for(let i = 0; i< cart.length; i++){
    //   let sum = cart[i].product.price * cart[i].quantity;
    //   total = total+ sum
    // }
    // return total;
    return cart.reduce((a,b)=> a+ (b.product.price * b.quantity) ,0)
  }
  useEffect(()=>{
    getCart();
    // getTotal()
  }, []);
  return (
    <Container>
      <NavBar/>
      {
        cart.map((cartItem)=> {
          return(
            <div key={cartItem.product._id} style={{...styles.flex, ...styles.cont}} className='mb-3'>
              <img style={styles.img} alt={cartItem.product.name} src={backendUrl + cartItem.product.image}/>
              <p>{cartItem.product.name}</p>
              <p>Ksh {cartItem.product.price}</p>
              <p>{cartItem.quantity ? cartItem.quantity: 1}</p>
              <DeleteIcon/>
            </div>
          )
        })
      }
      <p style={styles.total}>Total: Ksh {getTotal()}</p>
      <CheckoutModal cart={cart}/>
    </Container>
  )
}
const styles = {
  flex: {
    display: 'flex'
  },
  cont: {
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    paddingRight: '20px'
  },
  img: {
    height: '70px',
    width: '70px',
    borderRadius: '10px 0 0 10px'
  },
  total: {
    fontWeight: 700,
    textAlign: 'center'
  }
}
export default CartDetails
// 