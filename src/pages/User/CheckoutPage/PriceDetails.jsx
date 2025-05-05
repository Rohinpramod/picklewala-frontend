import React, { useState } from "react";
import { useRazorpay } from "react-razorpay";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

function PriceDetails({
  cart,
  discount,
  finalPrice,
  selectedCoupon,
  setSelectedCoupon,
  selectedAddressId,
  setSelectedAddressId,
  address,
}) {
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { Razorpay } = useRazorpay();

  if (!cart) {
    return (
      <div className="text-center text-gray-500">No cart data available</div>
    );
  }

  const handleCheckout = async () => {
    if (!cart || cart.length === 0) {
      return toast.error("Your cart is empty. Please add items to the cart.");
    }

    try {
      // Save address if not already selected
      let addressId = selectedAddressId;
      if (!addressId) {
        const response = await axiosInstance.post("/address/add", address);
        addressId = response.data.address._id;
        if (!addressId) {
          throw new Error("Failed to save the address.");
        }
        setSelectedAddressId(addressId);
      }

      // Proceed with checkout
      const checkoutData = {
        item: cart.itemId,
        cartId: cart._id,
        coupon: selectedCoupon,
        deliveryAddress: addressId,
      };

      const response = await axiosInstance.post("/order/create-order", checkoutData);
      const orderId = response?.data?.order?._id;
      setSelectedCoupon(null);

      // Create payment
      const payment = await axiosInstance.post(`/order/${orderId}/payment`);
      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_ID_KEY}`,
        amount: payment.data.razorpayOrder.amount,
        currency: "INR",
        name: "Pickle Walah",
        description: "",
        order_id: payment.data.razorpayOrder.id,
        handler: async (response) => {
          try {
            setIsPlacingOrder(true);
            await axiosInstance.post("/order/verify-payment", response);
            setSelectedCoupon(null);
            toast.success("Your order is placed successfully");
            navigate(`invoice/${orderId}`, { state: { discount } });
          } catch (error) {
            console.error("Verification failed:", error);
            toast.error("Payment verification failed.");
          } finally {
            setIsPlacingOrder(false);
          }
        },
        theme: {
          color: "#1E1E1E",
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Failed to place the order:", error.response?.data || error.message);
      toast.error("All fields required ");
    }
  };

  return (
    <>
      <div className="price-details bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Order Summary
        </h3>

        <div className="space-y-2 mb-4">
          {cart.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex-grow">
                <span>{item.itemId.name}</span>
                <span className="text-gray-500 ml-2">(x{item.quantity})</span>
              </div>
              <span>₹{item.totalItemPrice}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg">
            <span>Total Price:</span>
            <span>₹{cart.totalPrice}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>- ₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Final Price:</span>
            <span>₹{finalPrice}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={handleCheckout}
          disabled={isPlacingOrder}
          className={`btn bg-orange-600 text-white font-normal hover:bg-orange-700 flex items-center gap-2 ${
            isPlacingOrder ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isPlacingOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <svg
        className="animate-spin h-8 w-8 text-orange-600 mx-auto mb-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
      <p className="text-lg font-medium text-gray-700">Loading invoice... Please wait</p>
    </div>
  </div>
)}
          {isPlacingOrder ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </>
  );
}

export default PriceDetails;
