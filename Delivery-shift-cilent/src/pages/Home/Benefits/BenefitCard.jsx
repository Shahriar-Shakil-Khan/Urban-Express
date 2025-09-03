// src/components/BenefitCard.js
import React from "react";

const BenefitCard = ({ image, title, description }) => {
  return (
    <div className="card bg-gradient-to-b from-[#5524B7] to-[#380B60] shadow-lg rounded-lg p-6 w-full mb-6">
      {/* Left side - Image */}
      <div className="flex flex-col lg:flex-row items-center justify-between p-8 bg-gray-100 rounded-lg shadow-md">
        <div >
          <img className="w-30"
            src={image}
            alt={title}
            
          />
        </div>
        {/* Horizontal line */}
        <div className="h-20 w-1 bg-gray-300 mx-4 hidden lg:block"></div>

        {/* Right side - Title and Description */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
      </div>


      
    </div>
  );
};

export default BenefitCard;
