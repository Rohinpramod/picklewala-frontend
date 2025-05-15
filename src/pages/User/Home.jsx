import React, { useState } from 'react';
import hero from '../../../public/hero.jpg';
import Card from '../../components/user/card/Card.jsx';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh]">
        <img
          src={hero}
          alt="Hero Banner"
          className="w-full h-full object-cover brightness-75"
        />
       
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-4">
          <h2 className="text-3xl font-semibold tracking-widest text-gray-800 uppercase mb-2">
            Best Sellers
          </h2>

          {/* Category Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setSelectedCategory('veg')}
              className={`px-6 py-2 rounded-full text-white font-medium transition-all duration-200 ${
                selectedCategory === 'veg'
                  ? 'bg-green-700 shadow-md'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              Veg
            </button>
            <button
              onClick={() => setSelectedCategory('non-veg')}
              className={`px-6 py-2 rounded-full text-white font-medium transition-all duration-200 ${
                selectedCategory === 'non-veg'
                  ? 'bg-red-700 shadow-md'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              Non-Veg
            </button>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full text-white font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-gray-700 shadow-md'
                  : 'bg-gray-500 hover:bg-gray-600'
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="mt-8">
          <Card selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
};

export default Home;
