import React, {useState, useEffect} from 'react';
import Sidenav from './Sidenav';
import Table from 'react-bootstrap/Table';
import publicApi from '../../api/publicApi';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCategoryModal from '../../components/AddCategoryModal';
import EditCategoryModal from '../../components/EditCategoryModal';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({name: ''})
  const getCategories = async () => {
    const { data } = await publicApi.get('/categories/')
    console.log(data)
    setCategories(data.data)
  }
  
  const createCategory = async (e) => {
    e.preventDefault();
    const {data} = await publicApi.post('/categories/create', categoryData);
    console.log(data)
    if(data.message === 'Created category successfully!'){
      setCategories([...categories, data.data])
    }
  }

  const updateCategory = async (e) => {
    e.preventDefault();
    const {data} = await publicApi.post(`/categories/update/${categoryData.id}`, categoryData);
    console.log(data)

    if(data.message === 'Updated category successfully!'){
      setCategories(categories.map((category)=>{
        if(categoryData.id === category._id){
          return data.data;
        }else{
          return category;
        }
      }))
    }
  }

  const deleteCategory = async (id) => {
    const {data} = await publicApi.post(`/categories/delete/${id}`)
    console.log(data)
    if(data.message === 'Deleted category successfully!'){
      setCategories(categories.filter((category)=>{
        return category._id !== id
      }))
    }
  }

  useEffect(()=>{
    getCategories()
  },[]);
  return (
    <div>
        <Sidenav/>
        <div style={styles.cont}>
            <h3>Category Home</h3>
            <AddCategoryModal categoryData={categoryData} setCategoryData={setCategoryData} createCategory={createCategory}/>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                categories.map((category)=>{
                  return (
                    <tr key={category._id}>
                      <td>{category._id}</td>
                      <td>{category.name}</td>
                      <td>
                        <EditCategoryModal 
                        id={category._id} 
                        name={category.name} 
                        categoryData={categoryData} 
                        setCategoryData={setCategoryData}
                        updateCategory={updateCategory}
                        />
                        <DeleteIcon onClick={()=> deleteCategory(category._id)}/>
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
    
}
export default Home