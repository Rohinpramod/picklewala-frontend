import React, { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '/logo.png';
import { Link } from 'react-router-dom';
import LoginPage from '../../pages/shared/Login';
import SignUpPage from '../../pages/shared/Signup';

const navigation = [
  // { name: 'Dashboard', href: '#', current: true },
  // { name: 'Home', href: '#', current: false },
  { name: 'About Us', href: '/about', current: false },
  { name: 'Pickles', href: '/pickles', key: 'restaurants' },

];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  return (
    <>
      <Disclosure as="nav" className="bg">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Mobile Menu Button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>

            {/* Logo */}
            <div className="flex gap-1 items-center">
              <Link to="">
                <img alt="Your Company" src={logo} className="h-12 w-auto" />
              </Link>
              
            </div>

            {/* Navigation */}
            <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-2">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current
                          ? "bg-yellow-200 transition ease-in-out delay-1"
                        : "hover:-translate-y-1  hover:scale-110  duration-300",
                      "rounded-md px-3 py-2 text-sm font-medium  text-red-700   ",
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
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

      {/* Login and Sign-Up Pages */}
      <LoginPage isOpen={isLoginOpen} onClose={closeLogin} onOpenSignUp={openSignUp} />
      <SignUpPage isOpen={isSignUpOpen} onClose={closeSignUp} />
    </>
  );
}
