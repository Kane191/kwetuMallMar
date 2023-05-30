import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import publicApi from '../../api/publicApi';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL
    console.log(backendUrl)
    const getProducts = async () => {
        const { data } = await publicApi.get('/products')
        console.log(data);
        setProducts(data.data);
    }
    useEffect(()=> {
        getProducts()
    },[])
    return (
        <>
            <NavBar/>
            <Container>
            {/* Home */}
            <Row xs={1} md={3} lg={4} className="g-4">
                {products.map((product) => (
                    <Col key={product._id}>
                    <Card>
                        <Card.Img variant="top" src={backendUrl+product.image} />
                        <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text style={styles.desc}>
                            {product.description.substring(0, 45)}...
                        </Card.Text>
                        <div style={styles.flex}>
                            <span>Ksh {product.price}</span>
                            <button style={styles.btn} onClick={()=> navigate(`/details/${product._id}`)}>View</button>
                        </div>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
            </Container>
        </>
    )
}

const styles = {
    // desc: {
    //     whiteSpace: 'nowrap',
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     // maxHeight: '100px'
    // }
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        background: 'none',
        border: '1px solid #000',
        padding: '5px 40px'
    }
}

export default Home