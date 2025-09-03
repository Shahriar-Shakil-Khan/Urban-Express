import React from 'react';
import useAuth from './useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({

    baseURL: `https://delivery-app-server-one.vercel.app`
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {

    config.headers.Authorization = `Bearer ${user.accessToken}`

        return config;

    }, error => {

        return Promise.reject(error);
     })

      axiosSecure.interceptors.response.use(res => {
        return res;

    }, error => {
        
        const status = error.status;

        if (status === 403) {

            navigate('/forbidden');

        }
        else if (status === 401) {

            logOut()

                .then(() => {

                    navigate('/login')

                })

                .catch(() => { })

        }

        return Promise.reject(error);

    })




    return axiosSecure;
};

export default useAxiosSecure;