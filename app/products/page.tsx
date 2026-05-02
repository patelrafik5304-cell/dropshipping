"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useProducts } from "../context/CartContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const { state: productsState } = useProducts();
  const { dispatch } = useCart();
  const [sortBy, setSortBy] = useState("featured");
  const [filterCategory, setFilterCategory] = useState("all");

  const addToCart = (product: any) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const categories = ["all", "thermostats", "cameras", "lighting"];

  const filtered =
    filterCategory === "all"
      ? productsState.products
      : productsState.products.filter((p) => p.category === filterCategory);

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow max-w-[1500px] mx-auto w-full px-4 py-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:text-orange-600 hover:underline">Home</a>
          <span className="mx-1">›</span>
          <span className="text-gray-700">Products</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white p-4 border border-gray-200 rounded-sm sticky top-20">
              <h3 className="text-base font-bold text-gray-900 mb-3">Department</h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setFilterCategory(cat)}
                      className={`text-sm hover:text-orange-600 hover:underline ${
                        filterCategory === cat
                          ? "text-orange-600 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {cat === "all" ? "All Products" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 my-4" />

              <h3 className="text-base font-bold text-gray-900 mb-3">Customer Reviews</h3>
              <div className="space-y-1">
                {[4, 3, 2, 1].map((stars) => (
                  <a key={stars} href="#" className="flex items-center gap-1 text-sm text-gray-600 hover:text-orange-600">
                    {Array(stars).fill(0).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-cyan-700">& up</span>
                  </a>
                ))}
              </div>

              <div className="border-t border-gray-200 my-4" />

              <h3 className="text-base font-bold text-gray-900 mb-3">Price</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li><a href="#" className="hover:text-orange-600 hover:underline">Under ₹2,000</a></li>
                <li><a href="#" className="hover:text-orange-600 hover:underline">₹2,000 - ₹5,000</a></li>
                <li><a href="#" className="hover:text-orange-600 hover:underline">₹5,000 - ₹10,000</a></li>
                <li><a href="#" className="hover:text-orange-600 hover:underline">Over ₹10,000</a></li>
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {/* Results header */}
            <div className="bg-white border border-gray-200 p-3 mb-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-orange-600">{sorted.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-sm px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Avg. Customer Review</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Back to top */}
            <div className="mt-8 text-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-6 py-2 rounded-sm border border-gray-300"
              >
                Back to top
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
