"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm py-3"
      >
        Back to top
      </button>

      {/* Main Footer Links */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8 py-10">
          <div>
            <h3 className="font-bold text-sm mb-3">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:underline text-xs">About SmartCart</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Press Releases</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">SmartCart Cares</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3">Connect with Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Facebook</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Twitter</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Instagram</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3">Make Money with Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Sell on SmartCart</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Become an Affiliate</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Advertise Products</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Self-Publish</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Your Account</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Returns Centre</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Recalls & Safety</a></li>
              <li><a href="#" className="text-gray-300 hover:underline text-xs">Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logo & Copyright */}
      <div className="bg-gray-900 text-white text-center py-8 border-t border-gray-700">
        <Link href="/" className="inline-block mb-3">
          <span className="text-2xl font-bold">
            <span className="text-orange-400">Smart</span>Cart
          </span>
        </Link>
        <div className="text-xs text-gray-400 space-x-4">
          <a href="#" className="hover:underline">Conditions of Use</a>
          <a href="#" className="hover:underline">Privacy Notice</a>
          <a href="#" className="hover:underline">Interest-Based Ads</a>
        </div>
        <p className="text-xs text-gray-400 mt-2">© 1996-2026, SmartCart.in, Inc. or its affiliates</p>
      </div>
    </footer>
  );
}
