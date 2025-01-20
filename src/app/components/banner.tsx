"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import ChargerImage from "../../../public/bannerImages/charger.jpg";
import EarpodsImage from "../../../public/bannerImages/earpods.webp";
import HeadphoneImage from "../../../public/bannerImages/headphones.jpg";
import PowerbankImage from "../../../public/bannerImages/powerbank.webp";

export default function Banner() {
  const [currentImage, setCurrentImage] = useState(0);

  const Images = [
    { src: ChargerImage, alt: "Charger" },
    { src: EarpodsImage, alt: "Earpods" },
    { src: HeadphoneImage, alt: "Head phones" },
    { src: PowerbankImage, alt: "Power Bank" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((previousImage) => (previousImage + 1) % Images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [Images.length]);

  return (
    <>
      {/* Outer Container */}
      <div className="w-full overflow-hidden relative">
        {/* Sliding Images Container */}
        <div
          className="flex transition-transform ease-in-out duration-1000"
          style={{
            transform: `translateX(-${currentImage * 100}%)`,
          }}
        >
          {Images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
            >
              <Image
                className="w-full h-full object-contain"
                src={image.src}
                alt={image.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
