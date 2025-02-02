"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const firstName = searchParams.get('firstName');
  const orderId = searchParams.get('orderId');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Thank You, {firstName || 'Customer'}!
        </h1>
        <p className="text-gray-600 mb-4">Your order has been successfully placed.</p>
        <div className="bg-gray-100 rounded-xl p-4 mb-4">
          <p className="text-gray-500 text-sm">Order ID: {orderId || 'N/A'}</p>
          <p className="text-lg font-semibold text-gray-800">Track your order</p>
        </div>
        <Link href={'/'}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;