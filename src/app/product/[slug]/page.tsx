import Navbar from "../../components/header";
import { FullProduct } from "../../../../interface";
import { client } from "@/sanity/lib/client";
import { FaStar } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import React from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

async function getData(slug: string) {
  const query = `
    *[_type == "product" && slug.current == "${slug}"][0]{
  _id,
    price,
    name,
    description,
    "slug": slug.current,
    "imageURL": image.asset._ref,
    "categoryName": category->name
}`;

  const data = await client.fetch(query);
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: FullProduct = await getData(params.slug);

  return (
    <div>
  <Navbar />
  <p className="text-3xl md:text-4xl text-center italic font-extrabold text-gray-600 mt-10 md:mt-20">
    {data.name} details
  </p>
  <div className="mt-6 md:mt-10 flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-10">
    <div className="w-full md:w-1/2 overflow-hidden rounded-md bg-gray-200 hover:opacity-80 transition-opacity duration-300">
      <Image
        src={urlFor(data.imageURL).url()}
        alt="product Image"
        className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] w-full object-cover"
        width={300}
        height={300}
      />
    </div>
    <div className="py-6 md:py-10 w-full md:w-1/2">
      <div className="mb-2 space-y-6 md:space-y-10">
        <span className="text-lg md:text-xl text-gray-500">{data.categoryName}</span>
        <h2 className="text-2xl md:text-4xl font-bold">{data.name}</h2>
        <div className="flex items-center gap-x-3 md:gap-x-5">
          <button className="rounded-xl bg-blue-600 flex gap-x-2 px-4 md:px-5 items-center py-1">
            <span className="text-white text-base md:text-lg">4.5</span>
            <FaStar />
          </button>
          <p className="text-sm md:text-lg">101 Ratings</p>
        </div>
        <div className="space-y-6 md:space-y-10">
          <div className="flex items-center gap-x-3 md:gap-x-5">
            <p className="text-xl md:text-2xl font-bold text-gray-900">${data.price.toFixed(2)}</p>
            <p className="line-through text-gray-400">${(data.price + 50).toFixed(2)}</p>
          </div>
          <p className="text-sm text-gray-600 text-justify tracking-wide max-w-[90%] sm:max-w-[600px]">
            {data.description}
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
        </div>
      </div>
    </div>
  </div>
</div>
  );
}