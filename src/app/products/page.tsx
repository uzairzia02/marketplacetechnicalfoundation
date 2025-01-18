"use client";
import React, { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";

const sanity = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  imageURL: string;
  categoryName: string;
  stock: number;
  _id: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

export const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `
          *[_type == 'product'] {
            _id,
            name,
            description,
            price,
            "imageURL": image.asset->url,
            "categoryName": category->category
          }
        `;
      try {
        const data = await sanity.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <h2 className="text-6xl font-extrabold text-center my-10 " > AccessoriesHub Data fetched from Sanity </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-lg ">
            <Image
              src={product.imageURL}
              alt={product.name}
              width={200}
              height={200}
            />

            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-800">{product.categoryName}</p>
            <div className="flex gap-5 items-center ">
              <p className="text-gray-800 font-bold text-2xl">
                ${product.price}
              </p>
              <p className="text-gray-400 font-bold text-lg line-through text-center ">
                $ {(product.price + 50).toFixed(2)}{" "}
              </p>
            </div>
          </div>
          


        ))}
      </div>
     
    </div>
  );
};
