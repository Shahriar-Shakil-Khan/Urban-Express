// src/components/services/ServiceList.js
import React from 'react';
import ServiceCard from './ServiceCard';
import { FaShippingFast, FaStore, FaWarehouse, FaCashRegister, FaExchangeAlt, FaHome } from 'react-icons/fa';

const serviceData = [
  {
    "icon": <FaShippingFast />,
    "title": "Express & Standard Delivery",
    "description": "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
  },
  {
    "icon": <FaStore />,
    "title": "Nationwide Delivery",
    "description": "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
  },
  {
    "icon": <FaWarehouse />,
    "title": "Fulfillment Solution",
    "description": "We also offer customized service with inventory management support, online order processing, packaging, and after-sales support."
  },
  {
    "icon": <FaCashRegister />,
    "title": "Cash on Home Delivery",
    "description": "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
  },
  {
    "icon": <FaExchangeAlt />,
    "title": "Corporate Service / Contract In Logistics",
    "description": "Customized corporate services which includes warehouse and inventory management support."
  },
  {
    "icon": <FaHome />,
    "title": "Parcel Return",
    "description": "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
  }
];

const ServiceList = () => {
  return (
    <div className="bg-[#062023] py-16 px-4 md:px-10">

        <div className='max-w-7xl mx-auto text-center mb-10'>
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
      <p className="text-gray-200 max-w-2xl mx-auto">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>
        </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serviceData.map((service, index) => (
          <ServiceCard 
            key={index} 
            // icon={service.icon} 
            // title={service.title} 
            // description={service.description} 
            service={service}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
