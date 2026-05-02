"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const subtotal = state.total;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow py-6 max-w-[1500px] mx-auto w-full px-4">
          <div className="bg-white p-8 border border-gray-200 rounded-sm text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3M8 21h8m-4-4v4" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your SmartCart Cart is empty</h2>
            <p className="text-gray-600 mb-4">Check your Saved for Later items below</p>
            <a
              href="/products"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-2 rounded-sm text-sm transition-colors inline-block"
            >
              Continue Shopping
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow py-6 max-w-[1500px] mx-auto w-full px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="bg-white p-4 sm:p-6 border border-gray-200 rounded-sm">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Shopping Cart</h1>
              <a href="/products" className="text-sm text-cyan-700 hover:text-orange-600 hover:underline">
                {itemCount} items
              </a>

              <div className="border-b border-gray-200 my-4" />

              {state.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 py-4 border-b border-gray-200 last:border-b-0">
                  {/* Image */}
                  <a href={`/products/${item.id}`} className="flex-shrink-0 w-32 sm:w-44">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 sm:h-44 object-contain bg-gray-50"
                    />
                  </a>

                  {/* Details */}
                  <div className="flex-grow">
                    <a
                      href={`/products/${item.id}`}
                      className="text-base font-medium text-gray-900 hover:text-orange-600 hover:underline line-clamp-2"
                    >
                      {item.name}
                    </a>
                    <div className="text-xs text-green-700 mt-1">In Stock</div>
                    {item.supplier && (
                      <div className="text-xs text-gray-500 mt-1">
                        Ships from: <span className="text-gray-700">{item.supplier}</span>
                      </div>
                    )}

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-3">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 px-2 py-1 text-sm"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Qty: {i + 1}
                          </option>
                        ))}
                      </select>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-cyan-700 hover:text-orange-600 hover:underline"
                      >
                        Delete
                      </button>
                      <span className="text-gray-300">|</span>
                      <button className="text-sm text-cyan-700 hover:text-orange-600 hover:underline">
                        Save for later
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex-shrink-0 text-right sm:text-left">
                    <div className="text-lg font-bold">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-right mt-4">
                <span className="text-lg">
                  Subtotal ({itemCount} items):{" "}
                  <span className="font-bold text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-4 border border-gray-200 rounded-sm sticky top-20">
              <div className="text-sm mb-3">
                Subtotal ({itemCount} items):{" "}
                <br />
                <span className="font-bold text-lg">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <label className="flex items-center gap-2 text-sm mb-3 cursor-pointer">
                <input type="checkbox" className="accent-orange-400" />
                <span>This order contains a gift</span>
              </label>
              <a
                href="/checkout"
                className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-sm text-center text-sm transition-colors"
              >
                Proceed to Buy
              </a>
              <div className="mt-3 text-xs text-gray-500 space-y-1">
                <p>Tax: ₹{tax.toLocaleString("en-IN")}</p>
                <p className="font-bold text-base text-gray-900">
                  Grand Total: ₹{total.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
