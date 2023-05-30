import React, {useState, useEffect} from 'react';
import Sidenav from './Sidenav';
import Table from 'react-bootstrap/Table';
import publicApi from '../../api/publicApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserModal from '../../components/EditUserModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async()=>{
    const {data} = await publicApi.get('/user');
    console.log(data);
    setUsers(data.data)
  }
  const deleteUser = async(id) =>{
    const {data} = await publicApi.post(`/user/delete/${id}`);
    console.log(data);
    if(data.message === 'Deleted user successfully!'){
        setUsers(users.filter((user)=>{
            return user._id !== id
        }))
    }
  }

  useEffect(()=>{
    getUsers();
  },[]);

  return (
    <div>
        <Sidenav/>
        <div style={styles.cont}>
            <h3>Users</h3>
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
                users.map((user)=>{
                  return (
                    <tr key={user._id}>
                      <td>{user.firstName + ' ' + user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>
                        <EditUserModal id={user._id}/>
                        <DeleteIcon onClick={()=> deleteUser(user._id)}/>
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

export default Users