import React from 'react';
import Sidenav from './Sidenav';

const Template = () => {
  return (
    <div>
        <Sidenav/>
        <div style={styles.cont}>
            <h3>Template</h3>
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

export default Template