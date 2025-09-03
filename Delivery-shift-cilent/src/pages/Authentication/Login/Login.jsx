import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';

const Login = () => {

    const { signIn }= useAuth();

    const {handleSubmit, register,formState: { errors }} = useForm();

    const onSubmit = (data) => {
         signIn(data.email, data.password)
         .then(() => {
          navigate(from)
        })
        .catch(() => {
          // Handle error if needed
        });
    };

    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate= useNavigate();

    return (
        <div className="card bg-base-100 w-800 max-w-sm shrink-0 shadow-2xl p-6">
            <form onSubmit={handleSubmit(onSubmit)} >

            <div className="card-body" >
                 <h1 className="text-4xl font-bold text-center">Login</h1>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" {...register("email")} />

                    <label className="label">Password</label>
                    <input type="password" 
                    className="input" placeholder="Password" {...register("password", { required: true , minLength:8 })} />
                    {
                        errors.password?.type === "required" && <p className='text-red-600'>Password is required</p>
                    }
                    {
                        errors.password?.type === "minLength" && <p className='text-red-600'>Password must be at least 8 characters</p>
                    }

                    
                    <button className="btn btn-primary mt-4 text-xl">Login</button>
                </fieldset>

                <p className='text-center mt-6'><span>Don't have an account? </span> <Link state={{ from }} to='/register' className='text-primary font-medium'>Register</Link> </p>

            </div>   






            </form>
            <SocialLogin  />
        </div>
    );
};

export default Login;