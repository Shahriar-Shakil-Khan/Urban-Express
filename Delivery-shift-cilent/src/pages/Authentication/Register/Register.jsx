import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';
import { FaImage } from "react-icons/fa";

const Register = () => {
        const {handleSubmit, register,formState: { errors }} = useForm();
        const [profilePic, setProfilePic] = useState('');
        const axiosInstance = useAxios();

        const { createUser, updateUserProfile } = useAuth();

        const location = useLocation();
        const from = location.state?.from || '/';
        const navigate= useNavigate();

        const onSubmit = (data) => {
            createUser(data.email, data.password)
            .then(async() => {
                //console.log(result.user);




            
            const userInfo = {
                
                    email: data.email,
                    role: 'user', 
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

            
            await axiosInstance.post('/users', userInfo);
                //console.log(userRes.data);


                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                .then(() => {
                        //console.log('profile name pic updated');
                        navigate(from);
                    })
                    .catch(() => {
                        //console.log('Error updating profile');
                    })


            })
            .catch(() => {
                // Handle registration error
                //console.error("Registration error");
            });
        };


        const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        //console.log(image)

        const formData = new FormData();
        formData.append('image', image);


        const imagUploadUrl = (`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`)
        const res = await axios.post(imagUploadUrl, formData)

        // setProfilePic(res.data.data.url);
         setProfilePic(res.data.data.url);


    }


    return (

        <div className="card bg-base-100  max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-4xl font-bold text-center">Create A New Account</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">


                        <label className="label">Name</label>
                        <input type="text" className="input" placeholder="Your Name" {...register("name", { required: true })}/>
                        {errors.name && <p className='text-red-600'>Name is required</p>}


                        <label className="label flex items-center gap-2">
                                <FaImage className="text-[#5524B7] text-lg" />
                                Profile Picture
                                </label>
                                <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="file-input file-input-bordered w-full pl-10"
                                    placeholder="Your Profile picture"
                                    accept="image/*"
                                />
                                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5524B7] pointer-events-none" />
                                </div>

                            
                            <label className="label">Email</label>
                            <input type="email" className="input" placeholder="Email" {...register("email", { required: true })}/>
                            {errors.email && <p className='text-red-600'>Email is required</p>}

                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" {...register("password", { required: true, minLength: 8 })}/>
                            {errors.password?.type === "required" && <p className='text-red-600'>Password is required</p>}
                            {errors.password?.type === "minLength" && <p className='text-red-600'>Password must be at least 8 characters</p>}

                            
                            <button className="btn btn-primary mt-4 text-xl">Register</button>
                        </fieldset>
                        <p className='text-center mt-6'><span>Already have an account? </span> <Link to='/login' className='text-primary font-medium'>Login</Link> </p>
                    </form>

                     <SocialLogin />
                </div>
        </div>
    );
};

export default Register;




