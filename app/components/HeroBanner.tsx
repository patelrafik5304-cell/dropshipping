"use client";

import { useState, useEffect } from "react";

const banners = [
  {
    title: "Great Freedom Festival",
    subtitle: "Up to 80% off | Top brands",
    bg: "linear-gradient(to right, #232f3e 0%, #37475a 50%, #232f3e 100%)",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1500&q=80",
    cta: "Shop now",
    link: "/products",
  },
  {
    title: "New arrivals in Electronics",
    subtitle: "Latest gadgets & accessories",
    bg: "linear-gradient(to right, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1500&q=80",
    cta: "See all deals",
    link: "/products",
  },
  {
    title: "Home & Kitchen Deals",
    subtitle: "Starting ₹199 | Free delivery",
    bg: "linear-gradient(to right, #2d1b69 0%, #11998e 100%)",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1500&q=80",
    cta: "Shop now",
    link: "/products",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
        style={{ background: banners[current].bg }}
      >
        <img
          src={banners[current].image}
          alt={banners[current].title}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg">
            {banners[current].title}
          </h2>
          <p className="text-gray-200 text-sm sm:text-xl md:text-2xl mb-4 sm:mb-6">
            {banners[current].subtitle}
          </p>
          <a
            href={banners[current].link}
            className="bg-orange-400 hover:bg-orange-500 text-gray-900 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-sm text-sm sm:text-lg transition-colors"
          >
            {banners[current].cta}
          </a>
        </div>

        {/* Arrows */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 p-2 sm:p-3 rounded-sm text-gray-800"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 p-2 sm:p-3 rounded-sm text-gray-800"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              i === current ? "bg-orange-400" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 to-transparent z-10" />
    </div>
  );
}
