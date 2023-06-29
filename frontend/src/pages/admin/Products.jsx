import React, {useState, useEffect} from 'react';
import Sidenav from './Sidenav';
import Table from 'react-bootstrap/Table';
import publicApi from '../../api/publicApi';
import DeleteIcon from '@mui/icons-material/Delete';
import AddProductsModal from '../../components/AddProductsModal';
import EditProductModal from '../../components/EditProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: '', image: '', images: [], buyingPrice: '', price: '', stock: '', description: '', category: []
  })
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  const getProducts = async () => {
    const { data } = await publicApi.get('/products/')
    console.log(data)
    setProducts(data.data)
  }
  const createProduct = async(e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', productData.name);
    formData.append('image', productData.image);
    for(let i = 0; i<productData.images.length; i++){
      formData.append('images', productData.images[i])
    }
    formData.append('buyingPrice', productData.buyingPrice);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('description', productData.description);
    for(let i = 0; i<productData.category.length; i++){
      formData.append('category', productData.category[i])
    }

    const { data } = await publicApi.post('/products/create',formData);
    console.log(data);
    if(data.message === 'Product created successfully!'){
      setProducts([...products, data.data])
    }
  }
  const updateProduct = async(e) =>{
    e.preventDefault();
    const {data} = await publicApi.post(`/products/update/${productData._id}`, productData);
    console.log(data)
  }

  const deleteProduct = async (id) => {
    const {data} = await publicApi.post(`/products/delete/${id}`)
    console.log(data)
    if(data.message === 'Deleted product successfully!'){
      setProducts(products.filter((product)=>{
        return product._id !== id
      }))
    }
  }
  useEffect(()=>{
    getProducts()
  },[]);
  return (
    <div>
        <Sidenav/>
        <div style={styles.cont}>
            <h3>Products</h3>
            <AddProductsModal productData={productData} setProductData={setProductData} createProduct={createProduct}/>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                products.map((product)=>{
                  return (
                    <tr key={product._id}>
                      <td>
                        <img src={backendUrl+product.image} style={styles.img}/>
                      </td>
                      <td>{product.name}</td>
                      <td>Ksh {product.price}</td>
                      <td>{product.stock}</td>
                      <td>{product.description.substring(0, 20)}...</td>
                      <td>{product.category.map((catry)=> catry+' ')}</td>
                      <td>
                        <EditProductModal id={product._id} productData={productData} setProductData={setProductData} updateProduct={updateProduct}/>
                        <DeleteIcon onClick={()=> deleteProduct(product._id)}/>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </Table>
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
    img: {
        height: '50px',
        width: '50px'
    }
}
export default Products