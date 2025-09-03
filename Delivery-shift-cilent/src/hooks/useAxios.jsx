import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    
    baseURL: `https://delivery-app-server-one.vercel.app`,
    
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;


