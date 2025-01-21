import React, { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client"; // Ensure this points to your configured Sanity client
import { Product } from "../../../interface";
import Image from "next/image";


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from Sanity
    client
      .fetch(
        `*[_type == "cartItem"]{
          _id,
          name,
          price,
          size,
          quantity,
          "imageUrl": image.asset->url
        }`
      )
      .then((data) => setCartItems(data))
      .catch((err) => console.error("Failed to fetch cart items:", err));
  }, []);

  const handleRemove = (id: string) => {
    // Logic to remove item from the cart (e.g., updating Sanity dataset)
    console.log(`Remove item with ID: ${id}`);
  };

  return (
    <div className="mt-16 fixed inset-0 w-full h-full before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-sans">
      <div className="w-full max-w-lg bg-white shadow-lg relative ml-auto h-screen">
        <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
          <div className="flex items-center gap-4 text-gray-800">
            <h3 className="text-2xl font-bold flex-1">Shopping Cart</h3>
          </div>

          <div className="space-y-4 mt-12">
            {cartItems.map((item: Product) => (
              <div key={item._id} className="grid grid-cols-3 items-start gap-4">
                <div className="col-span-2 flex items-start gap-4">
                  <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                    <Image
                      src={item.imageURL}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-base max-sm:text-sm font-bold text-gray-800">{item.name}</h3>

                    <button
                      type="button"
                      onClick={() => handleRemove(item._id)}
                      className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                      </svg>
                      REMOVE
                    </button>
                  </div>
                </div>

                <div className="ml-auto">
                  <h4 className="text-base max-sm:text-sm font-bold text-gray-800">${item.price.toFixed(2)}</h4>
                  <button
                    type="button"
                    className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
                      <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" />
                    </svg>
                    <span className="mx-3 font-bold">{item.quantity}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 42 42">
                      <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
