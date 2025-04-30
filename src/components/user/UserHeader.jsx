import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "/logo.png";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const navigation = [
  { name: "About Us", href: "/about", key: "about" },
  { name: "Pickles", href: "pickles", key: "pickles" }
 
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
  }, [location]);

  const userLogout = async () => {
    try {
      await axiosInstance({ method: "PUT", url: "user/logout" });
      localStorage.clear();
      toast.success("Logout successfully");
      navigate("/");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-start pt-3 sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          {/* Logo and Navigation */}
          <div className="flex gap-1 items-center">
            <Link to="/">
              <img alt="Logo" src={logo} className="h-16 w-auto" />
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? " text-red-700 transition ease-in-out duration-300"
                        : "text-gray-900 hover:text-red-700 hover:scale-110 transition-all duration-300",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={location.pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Notification Bell, Cart Icon, Profile Dropdown */}
          <div className="flex items-center ml-auto space-x-4">
            <button
              type="button"
              className="relative rounded-full bg- ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 p-1"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6 text-red-700" />
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <FaCartShopping className="w-6 h-6 text-red-700 transition ease-in-out delay-15 hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-xs font-semibold rounded-full px-1.5 py-0.5 shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="relative flex transition ease-in-out delay-150 rounded-lg hover:-translate-y-1 hover:scale-110 duration-300">
                  <span className="sr-only">Open user menu</span>
                  <FaUserCircle className="h-6 w-6 text-red-700" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 bg-white transition focus:outline-none"
              >
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-yellow-400"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/order"
                    className="block px-4 py-2 text-sm hover:bg-yellow-400"
                  >
                    Your Orders
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={userLogout}
                    className="block px-4 py-2 w-full text-sm text-start hover:bg-yellow-400"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.key}
              as="a"
              href={item.href}
              className={classNames(
                location.pathname === item.href
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
              aria-current={location.pathname === item.href ? "page" : undefined}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default UserHeader;
