import React from 'react';
import { useLocalState } from '../../../util/useLocalStorage';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const [jwtAdmin, setJwtAdmin] = useLocalState("", "jwtAdmin");
    if (jwtAdmin === undefined) setJwtAdmin("");    
    return jwtAdmin !== '' ? children : <Navigate to="/login-admin" />;
}

export default PrivateRoute;