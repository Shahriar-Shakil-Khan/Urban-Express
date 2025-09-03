// import React from 'react';
// import merchant from '../../../assets/merchant/merchant.png'

// const Merchant = () => {
//     return (
//         <div className="hero  p-10 bg-[#5524B7] mb-2 rounded-3xl">
//   <div className="hero-content flex-col lg:flex-row-reverse">
//     <img src={merchant} alt="" />
//     <div>
//       <h1 className="text-5xl font-bold">Customer Satisfaction is Our First Priority</h1>
//       <p className="py-6">
//         Courier delivers your parcels promptly to every corner of Bangladesh, ensuring they arrive securely and on time. With our dependable service, you can count on us for fast, safe, and affordable deliveries across the nation.
//       </p>
//       <button className="btn rounded-2xl btn-success mr-8 text-amber-50">Merchant</button>
//       <button className=" btn btn-outline rounded-2xl text-amber-50">Get Started</button>
//     </div>
//   </div>
// </div>
//     );
// };

// export default Merchant;


import React from 'react';
import merchant from '../../../assets/merchant/merchant.png'

const Merchant = () => {
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="hero p-10 bg-[#5524B7] mb-2 rounded-3xl">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={merchant} alt="" />
                <div>
                    <h1 className="text-5xl font-bold">Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6">
                        Courier delivers your parcels promptly to every corner of Bangladesh, ensuring they arrive securely and on time. With our dependable service, you can count on us for fast, safe, and affordable deliveries across the nation.
                    </p>
                    <button
                        className="btn rounded-2xl btn-success mr-8 text-amber-50"
                        onClick={handleScrollTop}
                    >
                        Merchant
                    </button>
                    <button
                        className="btn btn-outline rounded-2xl text-amber-50"
                        onClick={handleScrollTop}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Merchant;


