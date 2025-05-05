import React, { useEffect, useState } from 'react';
import Footer from '../components/user/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/user/Header';
import UserHeader from '../components/user/UserHeader';
import { axiosInstance } from '../config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, saveUserData } from '../redux/features/authSlice';

const UserLayout = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const checkUser = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/user/check-user',
      });
      dispatch(saveUserData(response.data)); 
      setShowLoginPopup(false); 
    } catch (error) {
      dispatch(clearUserData());
      setTimeout(() => {
        setShowLoginPopup(true);
      }, 60000);
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return (
    <div>
      {isUserAuth ? <UserHeader /> : <Header />}
      <div className="min-h-96 relative">
        <Outlet />
        {showLoginPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md text-center max-w-sm">
              <p className="text-lg font-semibold">Please login to continue</p>
              <button
                onClick={() => setShowLoginPopup(false)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
