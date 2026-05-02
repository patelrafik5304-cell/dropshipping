"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart, useOrders } from "../context/CartContext";

export default function Checkout() {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { dispatch: ordersDispatch } = useOrders();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cartState.total;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert("Please fill in all required fields");
      return;
    }

    const order = {
      customerInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      items: cartState.items,
      total: subtotal,
      tax,
      grandTotal,
      paymentMethod: formData.paymentMethod,
      status: "pending" as const,
    };

    ordersDispatch({ type: "ADD_ORDER", payload: order });
    cartDispatch({ type: "CLEAR_CART" });
    alert("Order placed successfully!");
    router.push("/");
  };

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow py-6 max-w-[1500px] mx-auto w-full px-4">
          <div className="bg-white p-8 border border-gray-200 rounded-sm text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <a href="/products" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-6 py-2 rounded-sm text-sm inline-block transition-colors">
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
      <main className="flex-grow max-w-[1000px] mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
          {/* Main Form */}
          <div>
            {/* Shipping Address */}
            <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping address</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Full name <span className="text-red-600">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Phone number <span className="text-red-600">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-gray-700 block mb-1">Flat, House no., Building <span className="text-red-600">*</span></label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} required
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">City <span className="text-red-600">*</span></label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} required
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Pincode <span className="text-red-600">*</span></label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </form>
            </div>

            {/* Payment */}
            <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Payment method</h2>
              <div className="space-y-3">
                {[
                  { value: "cod", label: "Cash on Delivery / Pay on Delivery" },
                  { value: "upi", label: "UPI (Google Pay, PhonePe, Paytm)" },
                  { value: "card", label: "Credit or debit card" },
                  { value: "netbanking", label: "Net Banking" },
                ].map((method) => (
                  <label key={method.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={handleInputChange}
                      className="accent-orange-400"
                    />
                    <span className="text-sm text-gray-700">{method.label}</span>
                  </label>
                ))}
              </div>

              {formData.paymentMethod === "upi" && (
                <div className="mt-4">
                  <label className="text-xs font-bold text-gray-700 block mb-1">UPI ID</label>
                  <input type="text" name="upiId" value={formData.upiId} onChange={handleInputChange} placeholder="yourname@upi"
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              )}

              {formData.paymentMethod === "card" && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-3">
                    <label className="text-xs font-bold text-gray-700 block mb-1">Card number</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Expiry</label>
                    <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} placeholder="MM/YY"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">CVV</label>
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="123"
                      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Items Review */}
            <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order items ({cartState.items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
              {cartState.items.map((item) => (
                <div key={item.id} className="flex gap-3 py-3 border-b border-gray-100 last:border-b-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-gray-50 flex-shrink-0" />
                  <div className="flex-grow">
                    <p className="text-sm text-gray-900 font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div>
            <div className="bg-white border border-gray-200 rounded-sm p-4 sticky top-20">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between"><span>Items:</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between"><span>Delivery:</span><span className="text-green-700 font-medium">FREE</span></div>
                <div className="flex justify-between"><span>GST (18%):</span><span>₹{tax.toLocaleString("en-IN")}</span></div>
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3">
                <div className="flex justify-between text-base font-bold text-red-700">
                  <span>Order Total:</span>
                  <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-sm text-sm mt-4 transition-colors"
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
