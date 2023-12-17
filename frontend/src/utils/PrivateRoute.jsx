import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children, ...rest}) => {
    let { user } = useContext(AuthContext)
    
    // console.log(user.user_id)
    // return user.user_id !== 1 ? <Navigate to='/auth/signin'/> : children;

    return !user ? <Navigate to='/auth/signin'/> : children;
}

export default PrivateRoute;