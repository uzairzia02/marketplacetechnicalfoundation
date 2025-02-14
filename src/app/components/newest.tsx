import { client } from "@/sanity/lib/client";
import React from "react";
import { Product } from "../../../interface";
import Image from "next/image";
import Link from "next/link";


export const revalidate = 10;

async function getData() {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc){
      _id,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      "imageURL": image.asset->url
    }`;

  const data = await client.fetch(query);
  return data;
}



export default async function Newest() {
  const data: Product[] = await getData();

  return (
    <div className="bg-white w-full h-auto py-8">
      <h2 className="text-4xl font-bold text-center tracking-wider mb-8">
        New Arrivals
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 sm:px-10">
        {data.map((product) => (
          <div
            key={product._id}
            className="bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="w-full overflow-hidden rounded-t-md bg-gray-200 hover:opacity-80">
              <Image
                src={product.imageURL}
                alt="product Image"
                className="object-cover object-center h-[200px] w-full"
                width={300}
                height={300}
              />
            </div>
            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">
                <Link
                  href={`/product/${product.slug}`}
                  className="hover:underline"
                >
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {product.categoryName}
              </p>
              <p className="mt-2 text-lg font-bold text-gray-800">
                $ {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
