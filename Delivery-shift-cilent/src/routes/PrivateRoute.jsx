import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
   const { user, loading } = useAuth();


   const location = useLocation();
   

   if(loading){
    return <span className="loading loading-bars loading-xl"></span>
   }
    if(!user){
       return <Navigate to='/login' state={{ from: location }}></Navigate>
    }
    return children;
};

export default PrivateRoute;