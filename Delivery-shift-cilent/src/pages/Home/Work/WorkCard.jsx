// src/pages/Home/Work/WorkCard.jsx
import React from "react";

const WorkCard = ({ Icon, title, description }) => {
  return (
    <div className="card bg-base-100 border border-base-300 rounded-2xl shadow-sm hover:shadow-md transition-transform duration-500 hover:scale-105">
      <div className="card-body">
        {/* Check if Icon is passed and render it */}
        {Icon && <Icon className="text-4xl text-primary" aria-hidden="true" />}
        
        {/* Render the title */}
        <h3 className="card-title text-lg mt-2">{title}</h3>
        
        {/* Render the description */}
        <p className="text-base-content/70 leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  );
};

export default WorkCard;
