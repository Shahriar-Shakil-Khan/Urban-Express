import React from 'react';
import { Outlet } from 'react-router';
import lottie from '../assets/Auth/login.json'
import AppLogo from '../pages/shared/AppLogo/AppLogo';

import Lottie from 'lottie-react';

// const AuthLayout = () => {
//     return (
//         <div className=" bg-base-200 p-12 bg-gradient-to-b from-[#5524B7] to-[#380B60]">

//             <div>
               
//                 <AppLogo />
//             </div>
//   <div className="hero-content flex-col lg:flex-row-reverse">
//         <div className=' items-center hidden sm:block'>

//              <Lottie animationData={lottie} loop={true} style={{  height: 546 }}  />
//         </div>

//         <div >

//         <Outlet className="w-2/3"></Outlet>

//         </div>
//   </div>
// </div>
//     );
// };

// ...existing code...
const AuthLayout = () => {
    return (
        <div className="min-h-screen h-full bg-base-200 p-12 bg-gradient-to-b from-[#5524B7] to-[#380B60] border-2">

            <div>
               
                <AppLogo />
             </div>
                     
            <div className="hero-content flex-col lg:flex-row-reverse min-h-[80vh]">
                <div className="items-center hidden lg:block">
                    <Lottie animationData={lottie} loop={true} style={{ height: 546 }} />
                </div>
                <div>
                    <Outlet className="w-2/3" />
                </div>
            </div>

        </div>
      


    );
};


export default AuthLayout;