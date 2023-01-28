import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'


const PrivateRoute = ({ children }) => {

    const {currentUser} = useContext(AuthContext)
        
    if(!currentUser) {
            return <Navigate to="/LoginOrSignUp" />;
        }
    return children;

}


export default PrivateRoute