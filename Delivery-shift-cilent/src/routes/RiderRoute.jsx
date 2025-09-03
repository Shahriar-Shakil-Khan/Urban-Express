import React from 'react';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';


const RiderRoute = ({ children }) => {


    const { user, loading } = useAuth();

    const { role, roleLoading } = useUserRole();


    if (loading || roleLoading) {

        return <span className="loading loading-spinner loading-xl"></span>

    }

    if (!user || role !== 'rider') {   //only use for rider 

        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>

    }

    return children;

};

export default RiderRoute;