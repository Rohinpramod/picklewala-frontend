import React, { useState } from "react";
import { FaUser, FaListAlt, FaAddressCard } from "react-icons/fa";
import useFetch from "../../../hooks/UseFetch";
import SavedAddresses from "./SavedAdress";
import Orders from "./Orders";
import Account from "./Account";

const ProfilePage = () => {
  const [profile, isLoading, error,fetchData] = useFetch("/user/profile");
  const [orders, ordersLoading, ordersError] = useFetch("/order/get-user-order");
 console.log(orders,'====orders')
  const [activeSection, setActiveSection] = useState("profile"); // Default to Profile section

  if (isLoading || ordersLoading) {
    return (
      <div className="text-center mt-10 text-lg font-medium">Loading...</div>
    );
  }

  if (error || ordersError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading data: {error?.message || ordersError?.message}
      </div>
    );
  }

  const lastThreeOrders = orders?.data?.slice(0, 10);

  return (
  <div className="min-h-screen flex flex-col lg:flex-row bg-[#f9f9f9] font-sans">
    {/* Sidebar Navigation */}
    <div className="lg:sticky top-20 lg:h-auto w-full lg:w-64 bg-white shadow-lg rounded-xl mx-4 my-6 p-6 space-y-6">
      <h2 className="text-xl font-semibold text-red-800">My Account</h2>
      <nav className="space-y-3">
        <button
          className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
            activeSection === "profile"
              ? "bg-yellow-400 text-red-700 shadow"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveSection("profile")}
        >
          <FaUser className="mr-2" />
          Profile
        </button>

        <button
          className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
            activeSection === "orders"
              ? "bg-yellow-400 text-red-700  shadow"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveSection("orders")}
        >
          <FaListAlt className="mr-2" />
          Orders
        </button>

        <button
          className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
            activeSection === "addresses"
              ? "bg-yellow-400 text-red-700 shadow"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveSection("addresses")}
        >
          <FaAddressCard className="mr-2" />
          Addresses
        </button>
      </nav>
    </div>

    {/* Content Area */}
    <div className="flex-1 px-4 py-6 lg:px-10">
      {activeSection === "profile" && <Account profile={profile} />}

      {activeSection === "orders" && (
        <Orders lastThreeOrders={lastThreeOrders} />
      )}

      {activeSection === "addresses" && (
        <SavedAddresses addresses={profile.data.addresses} fetchData={fetchData} />
      )}
    </div>
  </div>
);

};

export default ProfilePage;
