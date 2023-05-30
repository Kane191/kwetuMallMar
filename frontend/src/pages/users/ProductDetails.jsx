import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import Cookies from 'js-cookie';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import publicApi from '../../api/publicApi';
import privateApi from '../../api/privateApi';
import Container from 'react-bootstrap/Container';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [err, setErr] = useState(null);
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  const getProduct = async()=>{
    const { data } = await publicApi.get(`/products/${id}`);
    console.log(data.data)
    setProduct(data.data)
  }
  const addToCart = async()=>{
    if(quantity < 1){
      // alert('You must add atleast one item')
      setErr('You must add atleast one item')
    }
    const token = Cookies.get('token');
    if(!token){
      setErr('You must be logged in');
    }
    const { data } = await privateApi.post(`/cart/add/${product._id}`, {quantity: quantity});
    console.log(data);
    if(data.message === 'Added to cart successfully!'){
      navigate('/cart')
    }

  }

  useEffect(()=>{
    getProduct()
  },[]);

  return (
    <Container>
      <NavBar/>
    <Row>
      <Col>
        <img src={backendUrl+product.image} alt="" style={styles.mimg} className="mb-3"/>
        <div style={styles.dflex}>
          {
            product.images?
            product.images.map((image)=><img src={backendUrl+image} alt="" style={styles.img}/>)
            : null
          }
        </div>
      </Col>
      <Col>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Ksh {product.price * quantity}</p>
        <div>
          <button onClick={()=>setQuantity(quantity-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={()=>setQuantity(quantity+1)}>+</button>
          <button onClick={addToCart}>Add to cart</button>
        </div>
        {err ? <p>{err}</p> : null}
      </Col>
    </Row>
    </Container>
  )
}

const styles = {
  img:{
    height: '120px',
    width: '120px'
  },
  dflex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  mimg: {
    height: '60vh',
    width: '100%'
  }
}
export default ProductDetails