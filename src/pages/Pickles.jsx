import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import pickelBanner from '../../public/pickle banner.webp';
import Card from "../components/user/card/Card.jsx";

const Pickles = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="w-full h-60 sm:h-72 md:h-96 relative">
        <img
          src={pickelBanner}
          alt="Pickle Banner"
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Optional Text/Overlay Here */}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 my-6 px-4">
        {['all', 'veg', 'non-veg'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? category === 'non-veg'
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Card Section */}
      <div className="mt-6 px-4 md:px-8">
        <Card selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Pickles;
