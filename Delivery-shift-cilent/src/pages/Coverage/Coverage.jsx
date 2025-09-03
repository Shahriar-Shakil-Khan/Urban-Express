import React from 'react';
import CoverageMap from './CoverageMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const services = useLoaderData();
    //console.log(services);
    return (
        <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-[#3e1d80] to-[#380B60] mt-12 mb-12 rounded-4xl">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">We have a presence in 64 districts.</h1>
      
      
      <CoverageMap services={services} />
    </div>
    );
};

export default Coverage;