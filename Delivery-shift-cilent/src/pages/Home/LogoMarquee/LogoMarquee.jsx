// import React from "react";
// import Marquee from "react-fast-marquee";

// import amazon from "../../../assets/brands/amazon.png";
// import amazonVector from "../../../assets/brands/amazon_vector.png";
// import moonstar from "../../../assets/brands/moonstar.png";
// import casio from "../../../assets/brands/casio.png";
// import randstad from "../../../assets/brands/randstad.png";
// import startPeople from "../../../assets/brands/start-people 1.png";
// import start from "../../../assets/brands/start.png";

// const logos = [
//   amazon,
//   amazonVector,
//   moonstar,
//   casio,
//   randstad,
//   startPeople,
//   start,
// ];
// const LogoMarquee = () => {
//   return (
//     <div className="py-8 bg-yellow-100 mb-4 ">
//       <Marquee gradient={false} speed={150}>
//   {logos.map((logo, idx) => (
//     <div key={idx} className="mx-8 flex items-center justify-center">
//       <img src={logo} alt={`Client ${idx + 1}`} className="h-12 w-auto" />
//     </div>
//   ))}
// </Marquee>
//     </div>
//   );
// };

// export default LogoMarquee;


import React from "react";
import Marquee from "react-fast-marquee";

import amazon from "../../../assets/brands/amazon.png";
import amazonVector from "../../../assets/brands/amazon_vector.png";
import moonstar from "../../../assets/brands/moonstar.png";
import casio from "../../../assets/brands/casio.png";
import randstad from "../../../assets/brands/randstad.png";
import startPeople from "../../../assets/brands/start-people 1.png";
import start from "../../../assets/brands/start.png";

const logos = [
  amazon,
  amazonVector,
  moonstar,
  casio,
  randstad,
  startPeople,
  start,
];

// Custom CSS for colorful animation
const colorfulStyle = {
  filter: "hue-rotate(0deg) saturate(2)",
  transition: "filter 0.5s",
  animation: "colorfulMove 2s linear infinite",
};

const LogoMarquee = () => {
  return (

    
    <div className="py-8 mb-4 bg-gradient-to-b from-[#5524B7] to-[#380B60]  rounded-2xl">

    <div className="text-center text-2xl font-semibold text-white mb-8">
        We've helped thousands of sales teams.
      </div>
        
      <style>
        {`
          @keyframes colorfulMove {
            0% { filter: hue-rotate(0deg) saturate(2); }
            100% { filter: hue-rotate(360deg) saturate(2); }
          }
        `}
      </style>
      <Marquee gradient={false} speed={150} >
        {logos.map((logo, idx) => (
          <div key={idx} className="mx-20 flex items-center justify-center">
            <img
              src={logo}
              alt={`Client ${idx + 1}`}
              style={{ height: 22, ...colorfulStyle }}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default LogoMarquee;