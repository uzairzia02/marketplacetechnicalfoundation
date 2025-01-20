"use client";
import React, { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";
import Link from "next/link";

const sanity = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

interface Product {
  slug: string;
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
            "categoryName": category->category,
            "slug": slug.current

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
      <h2 className="text-6xl font-extrabold text-center my-10 " > All Products </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-lg ">
<Link href={`/product/${product.slug}`} className="hover:underline duration-300 ">

            <Image
              src={product.imageURL}
              alt={product.name}
              width={200}
              height={200}
            />

            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600 line-clamp-2 ">{product.description}</p>
            <p className="text-gray-800">{product.categoryName}</p>
            <div className="flex gap-5 items-center ">
              <p className="text-gray-800 font-bold text-2xl">
                ${product.price}
              </p>
              <p className="text-gray-400 font-bold text-lg line-through text-center ">
                $ {(product.price + 50).toFixed(2)}{" "}
              </p>
            </div>
            </Link>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addToCart(product)}
        >Add to Cart
        </button>
          </div>

        ))}

        {/* add to cart functionality */}
        
      </div>
      
{/* cart summary */}
        <div className=" p-4 rounded-lg shadow-lg mt-10 " >
            <h2 className="text-3xl font-bold text-center my-10 " >Cart Summary</h2>
           {cart.length > 0 ? (
            <ul className=" space-y-4 " >
                { cart.map((item, index) => (
                    <li key={index} className=" w-[40%] border-black border-2 flex justify-between items-center bg-white shadow-sm p-4 rounded-md">
                        <div>
                            <p className="text-lg font-semibold text-black " > {item.name} </p>
                            <p className=" text-lg font-semibold text-black  " > ${item.price} </p>
                            <p> Quantity: {cart.filter((i) => i._id === item._id).length} </p>
                        </div>
                        <Image src={item.imageURL} alt={item.name} width={50} height={50} className="rounded-md" >

                        </Image>
                      
                    </li>
                ) ) }
                

            </ul>
           ) : (
            <p className="text-center text-gray-600" > Your cart is empty. </p>
           ) }

        </div>







     
    </div>
  );
};

