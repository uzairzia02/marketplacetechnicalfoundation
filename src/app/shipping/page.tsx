"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Header from "../components/header";
import Image from "next/image";
import { removeFromCart, updateCartItemQuantity, clearCart } from "../redux/cartslice";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { useRouter } from "next/navigation";

const ShippingDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'contactNumber',
      'address',
      'city',
      'province',
      'postalCode',
    ];

    for (const field of requiredFields) {
      if (!shippingInfo[field as keyof typeof shippingInfo]) {
        alert(`Please fill in the ${field} field.`);
        return false;
      }
    }

    if (!cartItems.length) {
      alert('Your cart is empty.');
      return false;
    }

    return true;
  };

  const handleConfirmPayment = async () => {
    if (!validateForm()) return;

    try {
      const shippingDocument = {
        _type: 'shipping',
        ...shippingInfo,
        paymentMethod: 'COD',
        grandTotal: grandTotal,
        orderDate: new Date().toISOString(), // Added orderDate field
        cartItems: cartItems.map((item) => ({
          _type: 'cartItem', 
          _key: Math.random().toString(36).substring(2, 15), // Unique key
          product: {
            _type: 'reference',
            _ref: item._id,
          },
          quantity: item.quantity,
          price: item.price,
        })),
      };

      // Get the created document response from Sanity
    const result = await client.create(shippingDocument);
    
    // Generate order ID (using Sanity document ID)
    const orderId = result._id;

    // Redirect with query parameters
    router.push(
      `/orderconfirmation?firstName=${encodeURIComponent(shippingInfo.firstName)}&orderId=${orderId}`
    );
    
      dispatch(clearCart());
      alert('Shipping information and payment details have been saved!');
    } catch (error) {
      console.error('Error saving shipping info:', error);
      alert('There was an error saving your shipping info. Please try again.');
    }
  };

  return (
    <div className="bg-white">
      <div className="mt-16">
        <Header />
      </div>
      <div className="max-lg:max-w-xl mx-auto w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Shipping Form Section */}
          <div className="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
            <div className="text-center max-lg:hidden">
              <h2 className="text-3xl font-bold text-gray-800 inline-block border-b-2 border-gray-800 pb-1">
                Checkout
              </h2>
            </div>

            {/* Use onSubmit to handle form submission */}
            <form
              className="lg:mt-16"
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmPayment();
              }}
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Shipping info
                </h2>
                <div className="grid sm:grid-cols-2 gap-8 mt-8">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={shippingInfo.firstName}
                      onChange={handleInputChange}
                      className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={shippingInfo.lastName}
                      onChange={handleInputChange}
                      className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="contactNumber"
                      placeholder="Contact Number"
                      value={shippingInfo.contactNumber}
                      onChange={handleInputChange}
                      className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="province"
                      placeholder="Province"
                      value={shippingInfo.province}
                      onChange={handleInputChange}
                      className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="postalCode"
                      placeholder="Postal code"
                      value={shippingInfo.postalCode}
                      onChange={handleInputChange}
                      className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-xl font-bold text-gray-800">
                  Payment method
                </h2>
                <div className="grid gap-4 sm:grid-cols-3 mt-4">
                  {/* COD Payment Method */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      className="w-5 h-5 cursor-pointer"
                      id="cod"
                      name="paymentMethod"
                      defaultChecked
                      readOnly
                    />
                    <label
                      htmlFor="cod"
                      className="ml-4 flex gap-2 cursor-pointer"
                    >
                      <img
                        src="https://png.pngtree.com/png-clipart/20210530/original/pngtree-cod-cash-on-delivery-fast-png-image_6367095.jpg"
                        className="w-20"
                        alt="cash on delivery"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center mt-8">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    I accept the{" "}
                    <a
                      href="#"
                      className="text-blue-600 font-semibold hover:underline ml-1"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              {/* Cart and Payment Button Section */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/">
                  <button
                    type="button"
                    className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Back
                  </button>
                </Link>
                <button
                  type="submit"
                  className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Confirm payment ${grandTotal.toFixed(2)}
                </button>
              </div>
            </form>
          </div>

          {/* Cart Items Section */}
          <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
            <div className="overflow-auto p-6 h-[calc(100vh-124px)]">
              <h3 className="text-2xl font-bold text-gray-800">
                Shopping Cart
              </h3>
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
                            onClick={() => dispatch(removeFromCart(item._id))}
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
                            onClick={() =>
                              dispatch(
                                updateCartItemQuantity({
                                  id: item._id,
                                  quantityChange: -1,
                                })
                              )
                            }
                            className="px-2 text-gray-800"
                          >
                            -
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                updateCartItemQuantity({
                                  id: item._id,
                                  quantityChange: 1,
                                })
                              )
                            }
                            className="px-2 text-gray-800"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    Your cart is empty.
                  </p>
                )}
              </div>
              <div className="mb-6"></div>
              <div className="p-6 border-t border-gray-300">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-bold text-gray-800">
                    Grand Total:
                  </h4>
                  <span className="text-lg font-bold text-gray-800">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* End of Cart Items Section */}
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
