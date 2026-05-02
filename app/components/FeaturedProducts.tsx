"use client";

import { products } from "../data/products";
import Link from "next/link";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  return (
    <div className="bg-white mx-4 sm:mx-6 md:mx-8 mb-6 border border-gray-200">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Featured deals for you
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/products"
            className="text-sm text-cyan-700 hover:text-orange-600 hover:underline"
          >
            See all deals
          </Link>
        </div>
      </div>
    </div>
  );
}
