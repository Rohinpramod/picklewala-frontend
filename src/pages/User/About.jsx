import React from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.png";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white py-16 text-center rounded-lg shadow-lg mb-12">
        <h1 className="text-4xl font-extrabold tracking-wide">About Us</h1>
        <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Welcome to Pickle Walah, where we combine the best of tradition and innovation, delivering pickles that tell a story.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="bg-white rounded-xl shadow-xl p-8 sm:p-10 mx-auto max-w-4xl mb-12 hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
          At <span className="font-semibold text-yellow-400">Pickle Walah</span>, what began as a passion project, inspired by grandma's old recipes, has grown into a vibrant pickle-making journey. From classic dill pickles to adventurous flavors like spicy garlic and sweet cinnamon cucumber, each jar is crafted to bring joy.
        </p>
        <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
          We use only real ingredients, small-batch techniques, and a whole lot of love. Whether you're a pickle connoisseur or trying pickles for the first time, we have something special just for you.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white rounded-xl shadow-xl p-8 sm:p-10 hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
            To bring people together through the joy of handcrafted pickles. We combine time-honored techniques with fresh ingredients to craft pickles that are not just tasty, but full of character.
          </p>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Our mission is to change the way people think about pickles—creating flavors that are bold, exciting, and absolutely irresistible.
          </p>
        </div>
        <img
          src={Logo}
          alt="Pickle Walah Logo"
          className="rounded-xl shadow-xl w-full max-w-md mx-auto object-cover"
        />
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white rounded-xl shadow-xl p-8 sm:p-10 mx-auto max-w-4xl mb-12 hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Why Choose Us?</h2>
        <ul className="list-disc list-inside space-y-4 text-lg sm:text-xl text-gray-700">
          <li>
            <span className="font-semibold text-yellow-400">Unique Flavors:</span> From the classics to bold and unexpected varieties, our pickles are a flavor journey.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Fresh & Fast:</span> Delivered quickly and always fresh, straight to your door.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Affordable:</span> We offer premium pickles at prices that won't break your budget.
          </li>
          <li>
            <span className="font-semibold text-yellow-400">Exceptional Service:</span> Our customer service team is here to help, ensuring you have the best experience.
          </li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white py-12 text-center rounded-xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold max-w-2xl mx-auto mb-6">
          Ready to experience the ultimate pickle? Order now and taste the difference!
        </h2>
        <Link to="/pickles">
          <button className="mt-6 px-8 py-4 bg-red-700 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            Browse the Taste
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
