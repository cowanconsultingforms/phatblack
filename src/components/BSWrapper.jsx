import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BootstrapWrapper = ({ children }) => {
    return <div className="bootstrap-scope">{children}</div>;
};

export default BootstrapWrapper;