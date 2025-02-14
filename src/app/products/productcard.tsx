import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import { useDispatch } from "react-redux";
import { addToCart as addToCartRedux } from "../redux/cartslice";
import Image from "next/image";
import Link from "next/link";



const sanity = createClient({
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

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
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
    dispatch(
      addToCartRedux({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,     
        image: product.imageURL,
      })
    );
    alert(`${product.name} added to cart`)
  }

  return (
    <div>
      <h2 className="text-6xl font-extrabold text-center my-10 ">
        {" "}
        All Products{" "}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-lg flex flex-col ">
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline duration-300 "
            >
              <Image
                src={product.imageURL}
                alt={product.name}
                width={200}
                height={200}
              />

              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-600 line-clamp-2 ">
                {product.description}
              </p>
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-auto"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}

      </div>

      </div>
  );
};

export default ProductCards;
