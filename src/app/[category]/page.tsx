import { client } from '@/sanity/lib/client';
import React from 'react';
import { FullProduct } from '../../../interface';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/header';

async function getData(category: string) {
    const decodedCategory = decodeURIComponent(category); // Decode URL-encoded strings
    const query = `*[_type == "product" && category->name == $category]{
        "imageURL": image.asset->url,
        _id,
        price,
        description,
        name,
        "slug": slug.current
    }`;

    const data = await client.fetch(query, { category: decodedCategory });
    return data;
}

export const revalidate = 5; // Revalidate every 5 seconds

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const data: FullProduct[] = await getData(params.category);

    return (
        <div>
            <Navbar />
            <div className="w-full py-8 mt-16">
                <h2 className="text-4xl md:text-5xl my-10 font-bold text-center tracking-wider">
                {decodeURIComponent(params.category || 'Unknown Category')}
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-6 sm:px-10">
                    {data.map((product) => (
                        <div key={product._id} className="group relative border-2 border-black rounded-lg pb-5 px-5 ">
                            {/* Product Image */}
                            <Link href={`/product/${product.slug}`} className="hover:underline duration-300 ">
                            <div className="w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-80 transition-opacity duration-300">
                                <Image
                                    src={product.imageURL}
                                    alt="product Image"
                                    className="object-cover object-center h-[200px] w-full"
                                    width={300}
                                    height={300}
                                />
                            </div>

                            {/* Product Details */}
                            <div className="mt-4 flex justify-between items-start">
                                <div className='w-[75%] ' >
                                    <h3 className="text-lg font-semibold">               
                                            {product.name}                                      
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">{product.categoryName}</p>
                                </div>
                                <div className='w-[25%] ' >
                                    <p className="text-lg font-semibold text-gray-800">$ {product.price}</p>
                                </div>
                            </div>
                            <p className='text-sm text-gray-600 line-clamp-2 ' >{product.description} </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
