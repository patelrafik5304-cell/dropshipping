import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow max-w-[1000px] mx-auto w-full px-4 py-6">
        <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">About SmartCart</h1>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              Welcome to SmartCart.in, your one-stop destination for smart home devices and electronics at the best prices in India. We bring you a curated selection of quality products from trusted suppliers across the globe.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Why Shop With Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">Best Prices</h3>
                <p className="text-sm">We negotiate directly with suppliers to bring you the lowest prices guaranteed.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">Fast Delivery</h3>
                <p className="text-sm">Free delivery on most orders. Get your items delivered right to your doorstep.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">Easy Returns</h3>
                <p className="text-sm">Not satisfied? Return within 30 days for a full refund, no questions asked.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">24/7 Support</h3>
                <p className="text-sm">Our customer service team is always ready to help with any queries.</p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Our Story</h2>
            <p className="mb-4">
              Founded in 2026, SmartCart started with a simple idea: make smart home technology accessible to everyone in India. Today, we serve thousands of customers across the country, offering everything from smart thermostats and security cameras to LED lighting and more.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Contact Us</h2>
            <p className="mb-4">
              Have questions or feedback? Reach out to us at <a href="mailto:support@smartcart.in" className="text-cyan-700 hover:underline">support@smartcart.in</a> or call us at <span className="font-bold">1800-XXX-XXXX</span> (toll-free).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
