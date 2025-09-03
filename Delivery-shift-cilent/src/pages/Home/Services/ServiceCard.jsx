// src/components/services/ServiceCard.js
import React from 'react';
import { FaShippingFast, FaStore, FaWarehouse, FaCashRegister, FaExchangeAlt, FaHome } from 'react-icons/fa'; // Add the relevant icons

const ServiceCard = ({ service }) => {
    const { icon, title, description } = service;
  return (
    <div // ...existing code...
className="bg-gradient-to-b from-[#342652] to-[#4b1977] shadow-md rounded-2xl p-6 border hover:shadow-2xl hover:scale-105 hover:border-primary transition-all duration-300 ease-in">
      <div className=" p-6 rounded-lg  text-center">
        <div className="text-4xl mb-4 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
