// src/components/Benefits.js
import React from "react";
import BenefitCard from "./BenefitCard";

// Import the images (You can put them in the public or src/assets folder)
import liveParcelTrackingImg from "../../../assets/benefits/benefits3.png";
import safeDeliveryImg from "../../../assets/benefits/benefits1.png";
import supportImg from "../../../assets/benefits/benefits2.png";

const benefits = [
  {
    image: liveParcelTrackingImg,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    image: safeDeliveryImg,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    image: supportImg,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const Benefits = () => {
  return (
    <div className="container mx-auto py-12 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-200 mb-8">
        Our Benefits
      </h2>
      <p className="text-lg text-center text-gray-200 mb-12">
        Discover the key features and advantages that make our service stand
        out!
      </p>

      {/* Flex container for cards */}
      <div className="flex flex-col gap-6 ">
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={index}
            image={benefit.image}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Benefits;
