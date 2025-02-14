import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/header'

interface Category {
  _id: string;
  name: string;
  imageURL: string;
}

async function getCategories() {
  const query = `*[_type == "category"]{
    _id,
    name,
    "imageURL": image.asset->url
  }`;
  return await client.fetch(query);
}

export const revalidate = 10; // Revalidate every 10 seconds

export default async function Categories() {
  const categories: Category[] = await getCategories();

  return (

    <div className="container mx-auto p-8">   
    <Navbar />     
      <h2 className="text-4xl font-bold text-center my-10">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category._id} href={`/${encodeURIComponent(category.name)}`}>
            <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300 text-center">
              <Image
                src={category.imageURL}
                alt={category.name}
                width={200}
                height={200}
                className="w-full h-[150px] object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-2">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
