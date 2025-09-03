import React from "react";
import WorkCard from "./WorkCard";
import { LuTruck, LuWallet, LuMapPin, LuBuilding2 } from "react-icons/lu";


const items = [
  { title: "Booking Pick & Drop", description:"From personal packages to business shipments — we deliver on time, every time.", Icon: LuTruck },
  { title: "Cash On Delivery", description:"Pay for your goods only when they arrive at your doorstep. Secure, convenient, and trusted.", Icon: LuWallet },
  { title: "Delivery Hub", description:"Centralized locations that ensure your deliveries are fast, reliable, and seamless across regions.", Icon: LuMapPin },
  { title: "Booking SME & Corporate", description:"Specialized solutions for businesses, ensuring timely deliveries for your shipments and corporate needs.", Icon: LuBuilding2 },
];

const Work = () => {
  return (
    <div className="bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold">How it Works</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {items.map((it) => (
            <WorkCard
              key={it.title}
              Icon={it.Icon}
              title={it.title}
              description={it.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;