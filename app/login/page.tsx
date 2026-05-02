"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (email && password) {
      localStorage.setItem("customerLoggedIn", "true");
      localStorage.setItem("customerEmail", email);
      router.push("/");
    } else {
      setError("Please enter your email and password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="bg-white border border-gray-300 rounded-sm p-6">
            <h1 className="text-2xl font-normal text-gray-900 mb-4">Sign in</h1>

            {error && (
              <div className="bg-red-50 border border-red-300 rounded-sm p-3 mb-4">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="text-sm font-bold text-gray-700 block mb-1">
                Email or mobile phone number
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="password" className="text-sm font-bold text-gray-700 block mb-1 mt-3">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-sm text-sm mt-4 transition-colors"
              >
                Continue
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4">
              By continuing, you agree to SmartCart&apos;s{" "}
              <a href="#" className="text-cyan-700 hover:text-orange-600 hover:underline">Conditions of Use</a>{" "}
              and{" "}
              <a href="#" className="text-cyan-700 hover:text-orange-600 hover:underline">Privacy Notice</a>.
            </p>

            <a href="#" className="text-sm text-cyan-700 hover:text-orange-600 hover:underline block mt-4">
              Forgot your password?
            </a>
          </div>

          {/* New to SmartCart */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mt-4">
            <h2 className="text-sm text-gray-700 font-medium">New to SmartCart?</h2>
            <a
              href="#"
              className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-sm text-sm text-center mt-3 transition-colors"
            >
              Create your SmartCart account
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
