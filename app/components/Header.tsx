"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  return (
    <header>
      {/* Top Nav */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-[1500px] mx-auto flex items-center gap-2 px-4 py-2">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center p-2 border border-transparent hover:border-white rounded-sm">
            <span className="text-xl font-bold text-white">
              <span className="text-orange-400">Smart</span>
              <span className="text-white">Cart</span>
            </span>
            <span className="text-xs text-gray-300 ml-1">.in</span>
          </Link>

          {/* Deliver To */}
          <div className="hidden lg:flex flex-shrink-0 items-center p-2 border border-transparent hover:border-white rounded-sm cursor-pointer">
            <div className="flex flex-col text-xs">
              <span className="text-gray-300 ml-4">Deliver to</span>
              <span className="text-white font-bold flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                India
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-grow flex h-10 rounded-sm overflow-hidden">
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="bg-gray-100 text-gray-700 text-xs px-2 border-r border-gray-300 w-16 md:w-auto cursor-pointer hover:bg-gray-200"
            >
              <option>All</option>
              <option>Electronics</option>
              <option>Home & Kitchen</option>
              <option>Fashion</option>
              <option>Beauty</option>
              <option>Books</option>
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SmartCart.in"
              className="flex-grow px-3 text-black focus:outline-none"
            />
            <button className="bg-orange-400 hover:bg-orange-500 px-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Language */}
          <div className="hidden md:flex items-center p-2 border border-transparent hover:border-white rounded-sm cursor-pointer">
            <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 h-3 mr-1" />
            <span className="text-sm font-bold">EN</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Account */}
          <Link href="/login" className="flex-shrink-0 p-2 border border-transparent hover:border-white rounded-sm">
            <div className="flex flex-col text-xs">
              <span className="text-gray-300">Hello, sign in</span>
              <span className="text-white font-bold">Account & Lists</span>
            </div>
          </Link>

          {/* Returns & Orders */}
          <Link href="/checkout" className="hidden md:block flex-shrink-0 p-2 border border-transparent hover:border-white rounded-sm">
            <div className="flex flex-col text-xs">
              <span className="text-gray-300">Returns</span>
              <span className="text-white font-bold">& Orders</span>
            </div>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="flex-shrink-0 flex items-end p-2 border border-transparent hover:border-white rounded-sm relative">
            <div className="relative">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3M8 21h8m-4-4v4" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-orange-400 text-gray-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">0</span>
            </div>
            <span className="text-white font-bold text-sm mb-1 ml-1">Cart</span>
          </Link>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-gray-800 text-white text-sm">
        <div className="max-w-[1500px] mx-auto flex items-center px-4 py-1 gap-1 overflow-x-auto">
          {/* Menu Button */}
          <div className="flex items-center p-2 border border-transparent hover:border-white rounded-sm cursor-pointer flex-shrink-0 font-bold">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            All
          </div>

          <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm flex-shrink-0">Today&apos;s Deals</Link>
          <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm flex-shrink-0 hidden sm:block">Customer Service</Link>
          <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm flex-shrink-0">Registry</Link>
          <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm flex-shrink-0 hidden sm:block">Gift Cards</Link>
          <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm flex-shrink-0">Sell</Link>
          <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm flex-shrink-0 hidden md:block">Buy Again</Link>
          <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm flex-shrink-0">SmartCart Business</Link>
          <Link href="/products" className="p-2 border border-transparent hover:border-white rounded-sm flex-shrink-0 hidden md:block">Prime</Link>
        </div>
      </div>
    </header>
  );
}
