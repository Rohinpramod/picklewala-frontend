import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import pickelBanner from '../../public/pickle banner.webp'
import Card from "../components/user/card/Card.jsx";

const Pickles = () => {

  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="w-full h-72 relative">
        <img
          src={pickelBanner}
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 my-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-5 py-2 rounded-full text-sm font-medium ${
            selectedCategory === "all"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory('veg')}
          className={`px-5 py-2 rounded-full text-sm font-medium ${
            selectedCategory === "veg"
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Veg
        </button>
        <button
          onClick={() => setSelectedCategory('non-veg')}
          className={`px-5 py-2 rounded-full text-sm font-medium ${
            selectedCategory === "non-veg"
              ? "bg-red-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Non-Veg
        </button>
      </div>

      <div className="mt-8">
          <Card selectedCategory={selectedCategory} />
        </div>    
      
    </div>
  );
};

export default Pickles;
