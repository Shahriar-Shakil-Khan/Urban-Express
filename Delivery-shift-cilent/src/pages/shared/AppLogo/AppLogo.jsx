import React from 'react';
import app_logo from '../../../assets/app_logo.png'
import { Link } from 'react-router';

const AppLogo = () => {
    
    return (
        <Link to='/'>
        <div className="flex items-end relative">
        <img className="w-14 h-14" src={app_logo} alt="App Logo" />
        <p className="font-bold text-xl absolute bottom-[-.2rem] left-[2.01rem]">
            <span className="text-2xl font-extrabold text-white">U</span>rbanExpress
        </p>
    </div>


        </Link>
    );
};

export default AppLogo;