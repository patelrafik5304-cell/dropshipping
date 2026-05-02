"use client";

import { useCart } from "../context/CartContext";

export default function Header() {
  const { state } = useCart();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">SmartHome Store</h1>
        </div>
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Home</a>
          <a href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Products</a>
          <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">About</a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Contact</a>
          <a href="/admin" className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">Admin</a>
          <a href="/cart" className="relative text-gray-700 hover:text-blue-600 font-medium transition duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
            </svg>
            {state.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {state.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </a>
        </nav>
        <div className="md:hidden flex items-center space-x-4">
          <a href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">Admin</a>
          <a href="/cart" className="relative text-gray-700 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
            </svg>
            {state.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {state.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </a>
          <button className="text-gray-700 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}