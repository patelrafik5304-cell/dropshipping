"use client";

import { useRef } from "react";
import Link from "next/link";
import { products } from "../data/products";

const deals = [
  {
    title: "Deal of the Day",
    discount: "Up to 70% off",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    link: "/products",
  },
  {
    title: "Lightning Deal",
    discount: "From ₹99",
    image: "https://images.unsplash.com/photo-1546868871-9e7a34b0f87e?w=300&q=80",
    link: "/products",
  },
  {
    title: "Best Seller",
    discount: "Min 40% off",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&q=80",
    link: "/products",
  },
  {
    title: "Limited Time Deal",
    discount: "₹199 onwards",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80",
    link: "/products",
  },
  {
    title: "Hot Deals",
    discount: "Extra 10% off",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&q=80",
    link: "/products",
  },
  ...products.slice(0, 3).map((p) => ({
    title: p.name,
    discount: `₹${p.price}`,
    image: p.image,
    link: `/products/${p.id}`,
  })),
];

export default function DealsStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white mx-4 sm:mx-6 md:mx-8 mb-6 border border-gray-200">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Today&apos;s Deals
          </h2>
          <Link href="/products" className="text-sm text-cyan-700 hover:text-orange-600 hover:underline">
             See all deals
           </Link>
        </div>
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow p-1 rounded-sm text-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {deals.map((deal, i) => (
              <Link
                 key={i}
                 href={deal.link}
                 className="flex-shrink-0 w-44 group cursor-pointer"
               >
                <div className="relative aspect-square overflow-hidden bg-gray-100 mb-2">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                    {deal.discount}
                  </span>
                </div>
                <p className="text-xs text-red-600 font-medium">{deal.discount}</p>
                <p className="text-sm text-gray-900 truncate">{deal.title}</p>
              </Link>
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow p-1 rounded-sm text-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
