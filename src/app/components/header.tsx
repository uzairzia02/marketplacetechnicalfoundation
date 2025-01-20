"use client";
import React, { useState } from "react";
import { FaHeadphones } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./cart";

const links = [
  { name: "Home", href: "/" },
  { name: "Laptop Accessories", href: "/Laptop Accessories" },
  { name: "Mobile Accessories", href: "/Mobile Accessories" },
 
];

export const revalidate = 5; // Revalidate every 5 seconds


export default function Header () {
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
    <>
      <div className="w-full h-16 px-4 md:px-8 lg:px-16 flex items-center justify-between fixed top-0 left-0 z-50 bg-white shadow-lg">
        {/* Left Section */}
          <Link href={"/"}  >
        <div className="flex gap-2 md:gap-5 items-center">
          <FaHeadphones className="w-8 h-8 md:w-10 md:h-10" />
          <p className="text-base md:text-xl font-semibold italic">
            Accessories Hub
          </p>
        </div>
          </Link>

          

        {/* Middle Section - Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-3 md:gap-5 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-40`}
        >
          {links.map((link, idx) => (
            <div key={idx}>
              {pathName === link.href ? (
                <Link
                  className="text-base md:text-lg font-semibold text-blue-600"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-base md:text-lg font-semibold text-gray-600 transition duration-300 hover:text-blue-600"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
           <Link href="/login" className="text-base md:text-lg font-semibold text-gray-600 transition duration-300 hover:text-blue-600">
            Login
          </Link>
                    
        </div>
       

        {/* Right Section - Icons */}
        <div className="flex gap-3 md:gap-5 items-center">
          <button
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={toggleMenu}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <GrCart
            className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-blue-600 cursor-pointer"
            onClick={toggleCart}
          />
          <FiSearch className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
        </div>
      </div>
     

      {/* Cart */}
      {cartVisible && <Cart />}
    </>
  );
}






