"use client";
import React, { useState } from "react";
import { FaHeadphones } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./cart";
import { Provider } from "react-redux";
import store from "../redux/store";

export const revalidate = 5; // Revalidate every 5 seconds

export default function Header() {
  const [cartVisible, setCartVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Provider store={store}>
      <>
        <div className="w-full h-16 px-4 sm:px-6 md:px-8 lg:px-16 flex items-center justify-between fixed top-0 left-0 z-50 bg-white shadow-lg">
          {/* Left Section */}
          <Link href={"/"}>
            <div className="flex gap-2 sm:gap-3 md:gap-5 items-center">
              <FaHeadphones className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10" />
              <p className="text-sm sm:text-base md:text-xl font-semibold italic">
                Accessories Hub
              </p>
            </div>
          </Link>

          {/* Middle Section - Updated Links */}
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } sm:flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 items-center absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow-md sm:shadow-none p-4 sm:p-0 z-40`}
          >
            <Link
              href="/"
              className={`text-sm sm:text-base md:text-lg font-semibold ${
                pathName === "/" ? "text-blue-600" : "text-gray-600"
              } transition duration-300 hover:text-blue-600`}
            >
              Home
            </Link>

            <Link
              href="/categories"
              className={`text-sm sm:text-base md:text-lg font-semibold ${
                pathName === "/categories" ? "text-blue-600" : "text-gray-600"
              } transition duration-300 hover:text-blue-600`}
            >
              Categories
            </Link>

            

            <Link
              href="https://marketplaceadmin-self.vercel.app/"
              target="_blank"
              className={`text-sm sm:text-base md:text-lg font-semibold ${
                pathName === "/admin" ? "text-blue-600" : "text-gray-600"
              } transition duration-300 hover:text-blue-600`}
            >
              Admin Login
            </Link>
          </div>

          {/* Right Section - Icons */}
          <div className="flex gap-2 sm:gap-3 md:gap-5 items-center">
            <button
              className="sm:hidden text-gray-600 hover:text-blue-600"
              onClick={toggleMenu}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
            <GrCart
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={toggleCart}
            />
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md px-2 py-1 sm:px-3 sm:py-2 focus:outline-none focus:border-blue-500 w-20 sm:w-32 md:w-40"
              />
              <FiSearch className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Cart */}
        {cartVisible && <Cart />}
      </>
    </Provider>
  );
}
