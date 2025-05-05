import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Card = ({ selectedCategory }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("/menu-items/get-all-menu");
        setItems(response.data);
      } catch (error) {
        console.log({ message: error.message });
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const response = await axiosInstance.post('/cart/add-to-cart', {
        itemId: item._id,
        quantity: 1,
      });
      toast.success('Added to Cart');
    } catch (error) {
      toast.error('Error adding to cart');
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => String(item.category || '').toLowerCase() === selectedCategory);

  return (
    <div className="w-full px-auto py-auto">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <figure className="w-full h-auto overflow-hidden">
              <Link to={`item-Details/${item._id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </Link>
            </figure>
            <div className="p-3 flex flex-col justify-between h-60">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                  {item.description}
                </p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-700 mb-1">
                  ₹ {item.price}
                </p>
                <p className="text-yellow-500 text-sm mb-3">
                  ⭐ {item.rating}
                </p>
                {item.quantity === 0 ? (
                  <button
                    disabled
                    className="w-full bg-red-700 text-white font-medium py-2 rounded-lg cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-lg transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
