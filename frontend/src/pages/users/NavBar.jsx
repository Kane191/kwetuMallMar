import React from 'react';
import Container from 'react-bootstrap/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavBar = () => {
  return (
    <Container style={styles.nav} className="mb-3">
        KwetuMall
        <div style={styles.icons}>
            <AccountCircleIcon/>
            <ShoppingCartIcon/>
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
        width: '60px',
        display: 'flex',
        justifyContent: 'space-between'
    }
}

export default NavBar