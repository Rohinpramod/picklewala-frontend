import React, { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { CiSearch } from 'react-icons/ci';
import logo from '/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import LoginPage from '../../pages/shared/Login';
import SignUpPage from '../../pages/shared/Signup';
import { axiosInstance } from '../../config/axiosInstance';

const navigation = [
  { name: 'About Us', href: '/about', current: false },
  { name: 'Pickles', href: '/pickles', key: 'restaurants' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItem, setFilteredItem] = useState([]);
  const navigate = useNavigate();

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredItem([]);
      return;
    }

    try {
      const response = await axiosInstance.get('/menu-items/get-all-menu');
      const data = response.data;

      const filtered = data.filter((menu) =>
        menu.name.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredItem(filtered);
    } catch (err) {
      setFilteredItem([]);
      console.error('Search error:', err);
    }
  };

  const handleMenuClick = (id) => {
    setSearchQuery('');
    setFilteredItem([]);
    navigate(`item-Details/${id}`);
  };

  return (
    <>
      <Disclosure as="nav" className="bg">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Mobile Menu */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>

            {/* Logo */}
            <div className="flex gap-1 items-center">
              <Link to="/">
                <img alt="Your Company" src={logo} className="h-12 w-auto" />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  className="search p-2 w-full rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Search for Restaurant, item or more"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <CiSearch className="absolute top-2.5 right-4 text-2xl text-black" />
                {searchQuery && (
                  <div className="absolute bg-white w-full mt-2 p-4 rounded-md shadow-lg z-50">
                    <h2 className="font-bold text-lg mb-2">Search Results:</h2>
                    <div className="flex flex-wrap gap-2">
                      {filteredItem.length > 0 ? (
                        filteredItem.map((item) => (
                          <div
                            key={item._id}
                            className="cursor-pointer hover:underline"
                            onClick={() => handleMenuClick(item._id)}
                          >
                            <p className="text-blue-500">{item.name}</p>
                          </div>
                        ))
                      ) : (
                        <p>No results found.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation & Buttons */}
            <div className="hidden sm:flex items-center space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-yellow-200 transition ease-in-out delay-1'
                      : 'hover:-translate-y-1 hover:scale-110 duration-300',
                    'rounded-md px-3 py-2 text-sm font-medium text-red-700'
                  )}
                >
                  {item.name}
                </a>
              ))}
              <button className="btn bg-red-700 text-yellow-400" onClick={openLogin}>
                Login
              </button>
              <button className="btn bg-red-700 text-yellow-400" onClick={openSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Disclosure>

      {/* Modals */}
      <LoginPage isOpen={isLoginOpen} onClose={closeLogin} onOpenSignUp={openSignUp} />
      <SignUpPage isOpen={isSignUpOpen} onClose={closeSignUp} />
    </>
  );
}
