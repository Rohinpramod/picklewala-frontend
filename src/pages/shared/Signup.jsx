import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast'

const SignUpPage = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone:'',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (!showOtpField) {
      if (formData.email && formData.phone && formData.name && formData.password) {
        try {
          setLoading(true); // Disable the button right when OTP is being sent.
          const response = await axiosInstance.post('/user/signup', {
            email: formData.email,
            phone: formData.phone,
            name: formData.name,
            password: formData.password,
            role: formData.role,
          });
  
          if (response.status === 200) {
            toast.success(`OTP sent to ${formData.email}`);
            setShowOtpField(true);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
          setLoading(false); // Re-enable the button once the OTP process is complete.
        }
        return;
      } else {
        toast.error('Please fill all fields before requesting OTP.');
      }
    } else {
      // Continue to submit if OTP field is shown
      setMessage('');
      setLoading(true);
  
      try {
        const response = await axiosInstance.post('/user/signup', formData);
        if (response.data.success) {
          toast.success('Signup successful!');
          setFormData({ name: '', email: '', password: '', phone: '', otp: '' }); // Reset form
        } else {
          alert(response.data.message || 'Signup failed. Please try again.');
        }
      } catch (error) {
        if (error.response?.data?.message === 'user already exist') {
          toast.error('User already exists. Please login instead.');
        } else {
          toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
        onClose();
        window.location.reload();
      }
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Sign Up</h2>
        <button
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
      <div className="p-4">
        {message && (
          <div
            className={`p-2 mb-4 text-sm text-center rounded-md ${
              message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleButtonClick}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="string"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
              placeholder="Enter your Mobile Number"
              required
            />
          </div>

          {showOtpField && (
            <div>
              <label className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-600"
                placeholder="Enter the OTP"
                required
              />
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-orange-600 text-white font-medium rounded-md ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500'
            }`}
            
          >
            {loading ? 'Please wait...' : showOtpField ? 'Sign Up' : 'send OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;