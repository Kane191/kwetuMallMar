import React from 'react';
import Alert from 'react-bootstrap/Alert';

const NotLoggedInAlert = ({show, setShow, path}) => {
  
  return (
    <>
    {
        show ?
        <Alert style={styles.alert} variant="danger" onClose={() => setShow(false)} dismissible>
            You are not logged in! Login <Alert.Link href={path}>here</Alert.Link>
        </Alert>
        : null
    }
    </>
  )
}

const styles = {
    alert: {
        position: 'absolute',
        width: '50vw',
        left: 0,
        right: 0,
        top: '20px',
        margin: '0 auto',
        zIndex: 1
    }
}
export default NotLoggedInAlert