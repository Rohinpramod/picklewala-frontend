import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


const ItemDetails = () => {
    
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

    const fetchItems = async()=>{
        try{
            setLoading(true);
            const response = await axiosInstance.get(`/menu-items/menu-item/${id}`);
            setItem(response?.data)
            setLoading(false);
        }catch(error){
            console.log(error);
        }
    };
    console.log(setItem,'====setItem')
    useEffect(()=>{
        fetchItems();
    },[id]);
    if(loading){
        return <div className="text-center text-gray-500 mt-10">Loading...</div>
    }
    const handleAddToCart = async (item) =>{
        try{
            const response = await axiosInstance.post('/cart/add-to-cart',{
                itemId: item._id,
                quantity:1,
            });
         toast.success('Added to Cart')
        }catch(error){
            toast.error('Error adding to cart:',error.messaage);
        }
      };
     


  return (
    <div className=" m-5 p-6 mt-10 ">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={item.image}
          alt={item.name}
          className="w-full md:w-1/2 h-full object-cover  "
        />
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <div>
          <h2 className="text-lg font-semibold">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700">
            {item.ingredients?.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </div>
          <div className="text-xl font-semibold text-red-800">₹{item.price}.00</div>
          <div className="text-sm text-gray-500">
            {item.isAvailable ? 'In Stock' : 'Out of Stock'} • {item.quantity} available
          </div>
          <div className="text-yellow-500 font-medium">⭐ {item.rating} / 5</div>
          <div className="text-sm text-gray-600">
            Category: <span className="font-medium text-gray-800">{item.category}</span>
          </div>
          <button
                onClick={()=> handleAddToCart(item)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-lg transition-colors duration-200">
                  Add to Cart
                </button>
        </div>
      </div>

      <div className="mt-5">
      <p className="text-gray-700">{item.description}</p>

        <div>
          <h2 className="text-lg font-semibold">Customer Reviews</h2>
          <ul className="space-y-2 text-gray-700">
            {item.customerReviews?.length ? (
              item.customerReviews.map((review, idx) => (
                <li key={idx} className="p-3 border rounded-lg">
                  "{review}"
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default ItemDetails;
