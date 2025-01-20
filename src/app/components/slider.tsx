'use client'
import { useState, useEffect } from "react";

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = [
    "Delivery free all over Karachi",
    "Exchange and refund can be done",
    "Discounts available on shopping 5+ Products"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((lastIndex) => (lastIndex + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full h-[40px] bg-black flex items-center justify-center mt-16 ">
      <p className="italic text-white font-bold tracking-wider text-[14px] sm:text-[18px] md:text-[20px] lg:text-[25px]">
        {messages[currentIndex]}
      </p>
    </div>
  );
}
