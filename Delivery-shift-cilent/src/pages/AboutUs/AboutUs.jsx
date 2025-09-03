import React from "react";

const AboutUs = () => (
  <div className="w-full mx-auto mt-6 mb-6 p-16  rounded-xl  bg-white">
    <h1 className="text-4xl font-bold text-[#5524B7] mb-4 text-center">About Us – Urban Express</h1>
    <p className="text-lg text-gray-700 mb-4">
      <span className="font-semibold text-[#5524B7]">Urban Express</span> is a fast, reliable, and user-friendly online delivery platform. We provide services in all <span className="font-bold">64 districts</span> of Bangladesh, ensuring that users can send their necessary items both within their own district and outside the district.
    </p>
    <p className="text-gray-700 mb-4">
      Our platform is designed to make delivery simple and secure. Users place an order, and our admin team assigns the most suitable rider based on the district. With dedicated service centers in every district, Urban Express ensures accessibility and trust for all customers.
    </p>
    <h2 className="text-2xl font-semibold text-[#5524B7] mb-2 mt-6">Pricing Policy</h2>
    <ul className="list-disc list-inside text-gray-600 mb-4">
      <li>
        <span className="font-semibold">Delivery charges</span> are determined based on the location (inside or outside the district).
      </li>
      <li>
        <span className="font-semibold">Weight limit</span> is specified for each package. If the weight exceeds this limit, an extra charge will be applied.
      </li>
      <li>
        <span className="font-semibold">Transparent pricing</span> ensures consistency for all users. The pricing policy is documented for your convenience.
      </li>
    </ul>
    <p className="text-gray-500 mt-4 text-center">
      Thank you for choosing <span className="font-semibold text-[#5524B7]">Urban Express</span>. We look forward to serving you!
    </p>
  </div>
);

export default AboutUs;