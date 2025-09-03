import React from 'react';
import { Link } from 'react-router';
const Forbidden = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] ">
      <div className=" w-full mx-auto text-center p-8 rounded-sm bg-white shadow bg-gradient-to-b from-[#5524B7] to-[#380B60]">
        <div className="mb-6 flex justify-center">
          <svg 
            width="160" 
            height="160" 
            viewBox="0 0 160 160" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="80" cy="80" r="70" fill="#FEF2F2" />
            <path 
              d="M80 30C52.386 30 30 52.386 30 80C30 107.614 52.386 130 80 130C107.614 130 130 107.614 130 80C130 52.386 107.614 30 80 30ZM80 120C57.909 120 40 102.091 40 80C40 57.909 57.909 40 80 40C102.091 40 120 57.909 120 80C120 102.091 102.091 120 80 120Z" 
              fill="#DC2626" 
            />
            <path 
              d="M100 60L60 100M100 100L60 60" 
              stroke="#DC2626" 
              strokeWidth="6" 
              strokeLinecap="round" 
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-white">
          Access Forbidden
        </h1>
        <p className="text-gray-400 mb-6">
          You don't have permission to access this resource.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
         <Link to="/">


            <button 
                        className="font-bold px-4 py-2 rounded  bg-blue-600 text-white hover:bg-blue-700 hidden md:inline-block lg:inline-block"
                        aria-label="Go to home page"
                    >
                        Go Home
                    </button>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;