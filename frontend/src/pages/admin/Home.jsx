import React, {useState, useEffect} from 'react';
import Sidenav from './Sidenav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import privateApi from '../../api/privateApi';
import SellIcon from '@mui/icons-material/Sell';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Home = () => {
  const [reports, setReports] = useState({});
  const getReports = async() =>{
    const {data} = await privateApi.get('/admin/reports');
    console.log(data)
    setReports(data);
  }
  useEffect(() =>{
    getReports()
  },[]);
  return (
    <div>
        <Sidenav/>
        {console.log(reports)}
        <div style={styles.cont}>
            <h3>Home</h3>
            <br/>
            <Row xs={1} md={3} lg={4} className="g-4">
              <Col>
                <Card style={styles.card1}>
                  <Card.Body style={styles.flex}>
                    <div>
                      <h2>{reports.users}</h2>
                      <p style={styles.p}>Users</p>
                    </div>
                    <AccountBoxIcon style={styles.icon}/>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={styles.card2}>
                  <Card.Body style={styles.flex}>
                    <div>
                      <h2>{reports.sales}</h2>
                      <p style={styles.p}>Sales</p>
                    </div>
                    <SsidChartIcon style={styles.icon}/>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={styles.card3}>
                  <Card.Body style={styles.flex}>
                    <div>
                      <h2>{reports.salesSum}</h2>
                      <p style={styles.p}>Total sales</p>
                    </div>
                    <SellIcon style={styles.icon}/>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card style={styles.card4}>
                  <Card.Body style={styles.flex}>
                    <div>
                      <h2>{reports.profit}</h2>
                      <p style={styles.p}>Profits</p>
                    </div>
                    <AttachMoneyIcon style={styles.icon}/>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        </div>
    </div>
  )
}

const cardStyles = {
  color: '#fff',
  border: 'none',
  boxShadow: 'inset 0 0 0 1000px rgba(255,255,255,.2)',
}
const styles = {
  cont: {
    marginLeft: '260px',
    marginRight: '10px',
    paddingTop: '10px'
  },
  card1: {
    ...cardStyles,
    backgroundColor: '#2760AB',
  },
  card2: {
    ...cardStyles,
    backgroundColor: '#04956C',
  },
  card3: {
    ...cardStyles,
    backgroundColor: '#503EA7',
  },
  card4: {
    ...cardStyles,
    backgroundColor: '#A53937',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'end'
  },
  icon: {
    fontSize: '70px',
    marginBottom: '15px'
  },
  p: {
    fontSize: '1.2em'
  }
}

export default Home