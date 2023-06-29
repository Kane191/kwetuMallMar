import React, {useState, useEffect} from 'react';
import Sidenav from './Sidenav';
import adminApi from '../../api/adminApi';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditAdminsModal from '../../components/EditAdminsModal';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [adminData, setAdminData] = useState({firstName: '', lastName: '', phoneNumber: '',email: ''});

  const getAdmins = async() => {
    const { data } = await adminApi.get('/admin');
    console.log(data)
    if(data.message === 'Fetched all admins successfully!'){
        setAdmins(data.data)
    }
  }

  const updateAdmin = async(e)=> {
    e.preventDefault();
    const {data} = await adminApi.post(`/admin/update/${adminData._id}`,adminData);
    console.log(data);
    if(data.message === 'Updated admin successfully!'){
      setAdmins(admins.map((admin)=>{
        if(admin._id === data.data._id){
          return data.data;
        }else{
          return admin;
        }
      }));
    }
  }

  const deleteAdmin = async(id) => {
    const { data } = await adminApi.post(`/admin/delete/${id}`);
    console.log(data)
    if(data.message === 'Deleted admin successfully!'){
      setAdmins(admins.filter((admin)=> admin._id !== id))
    }
  }

  useEffect(()=>{
    getAdmins()
  },[]);

  return (
    <div>
        <Sidenav/>
        <div style={styles.cont}>
            <h3>Admins</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                admins.map((admin)=>{
                  return (
                    <tr key={admin._id}>
                      <td>{admin.firstName + ' ' + admin.lastName}</td>
                      <td>{admin.email}</td>
                      <td>{admin.phoneNumber}</td>
                      <td>
                        <EditAdminsModal id={admin._id} adminData={adminData} setAdminData={setAdminData} updateAdmin={updateAdmin}/>
                        <DeleteIcon onClick={()=> deleteAdmin(admin._id)}/>
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
    }
}

export default Admins