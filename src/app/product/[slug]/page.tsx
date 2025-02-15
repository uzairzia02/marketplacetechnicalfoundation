"use client";

import Navbar from "../../components/header";
import { FullProduct } from "../../../../interface";
import { client } from "@/sanity/lib/client";
import { FaStar, FaExchangeAlt, FaHandshake, FaTruck } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart as addToCartRedux } from "../../redux/cartslice";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<FullProduct | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        *[_type == "product" && slug.current == "${params.slug}"][0]{
          _id,
          price,
          name,
          description,
          "slug": slug.current,
          "imageURL": image.asset->url,
          "categoryName": category->name
        }
      `;

      try {
        const data = await client.fetch(query);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [params.slug]);

  const addToCart = () => {
    if (!product) return;

    dispatch(
      addToCartRedux({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.imageURL,
      })
    );
    alert(`${product.name} added to cart`);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <p className="text-3xl md:text-4xl text-center italic font-extrabold text-gray-600 mt-10 md:mt-20">
        {product.name} details
      </p>
      <div className="mt-6 md:mt-10 flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-10">
        <div className="w-full md:w-1/2 overflow-hidden rounded-md bg-gray-200 hover:opacity-80 transition-opacity duration-300">
          <Image
            src={product.imageURL}
            alt="product Image"
            className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] w-full object-cover"
            width={300}
            height={300}
          />
        </div>
        <div className="py-6 md:py-10 w-full md:w-1/2">
          <div className="mb-2 space-y-6 md:space-y-10">
            <span className="text-lg md:text-xl text-gray-500">{product.categoryName}</span>
            <h2 className="text-2xl md:text-4xl font-bold">{product.name}</h2>
            <div className="flex items-center gap-x-3 md:gap-x-5">
              <button className="rounded-xl bg-blue-600 flex gap-x-2 px-4 md:px-5 items-center py-1">
                <span className="text-white text-base md:text-lg">4.5</span>
                <FaStar />
              </button>
              <p className="text-sm md:text-lg">101 Ratings</p>
            </div>
            <div className="space-y-6 md:space-y-10">
              <div className="flex items-center gap-x-3 md:gap-x-5">
                <p className="text-xl md:text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
                <p className="line-through text-gray-400">${(product.price + 50).toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-600 text-justify tracking-wide max-w-[90%] sm:max-w-[600px]">
                {product.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:w-[600px]">
                <div className="flex flex-col items-center text-center">
                  <FaExchangeAlt className="w-10 h-10 md:w-[70px] md:h-[70px]" />
                  <p>7 Days <span>Exchange</span></p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <FaHandshake className="w-10 h-10 md:w-[70px] md:h-[70px]" />
                  <p>1 Year <span>Warranty</span></p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <FaTruck className="w-10 h-10 md:w-[70px] md:h-[70px]" />
                  <p>Free <span>Shipping</span></p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RiSecurePaymentFill className="w-10 h-10 md:w-[70px] md:h-[70px]" />
                  <p>Secure <span>Payment</span></p>
                </div>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
