import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, updateCartItemQuantity } from "../redux/cartslice";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Add this import


export default function Cart() {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize router


  // Fetch cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (_id: string) => {
    dispatch(removeFromCart(_id));
  };

  const updateQuantity = (id: string, increment: boolean) => {
    dispatch(
      updateCartItemQuantity({
        id,
        quantityChange: increment ? 1 : -1,
      })
    );
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-16 fixed inset-0 z-50 ">
      <div className="w-full max-w-lg bg-white shadow-lg relative ml-auto h-screen">
        <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
          <h3 className="text-2xl font-bold text-gray-800">Shopping Cart</h3>
          <div className="space-y-4 mt-12">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-3 items-start gap-4"
                >
                  <div className="col-span-2 flex items-start gap-4">
                    <div className="w-28 h-28 bg-gray-100 p-2 rounded-md">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleRemove(item._id)}
                        className="mt-4 font-semibold text-red-500 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="ml-auto text-center">
                    <h4 className="text-base font-bold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h4>
                    <div className="mt-4 flex items-center border border-gray-300 rounded-md">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, false)}
                        className="px-2 text-gray-800"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, true)}
                        className="px-2 text-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>

          <div className="mb-6"></div>
          {/* Grand Total Section */}
          <div className="p-6 border-t border-gray-300">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold text-gray-800">Grand Total:</h4>
              <span className="text-lg font-bold text-gray-800">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
            <button 
      className={`mt-6 px-12 py-3 items-center text-xl flex m-auto bg-blue-700 rounded-lg text-white hover:bg-blue-900 hover:font-bold duration-200 ${
        cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={() => {
        if (cartItems.length > 0) {
          router.push('/shipping');
        }
      }}
      disabled={cartItems.length === 0}
    >
      Check Out
    </button>
          </div>
        </div>
      </div>
    </div>
  );
}
