import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import CategoryCards from "./components/CategoryCards";
import DealsStrip from "./components/DealsStrip";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow">
        <HeroBanner />
        <CategoryCards />
        <div className="mt-6">
          <DealsStrip />
        </div>
        <FeaturedProducts />

        {/* Sign-in Banner */}
        <div className="mx-4 sm:mx-6 md:mx-8 mb-6">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 sm:p-8 rounded-sm text-center">
            <p className="text-sm sm:text-base mb-3">
              See personalised recommendations
            </p>
            <a
              href="/login"
              className="bg-orange-400 hover:bg-orange-500 text-gray-900 font-semibold px-8 py-2 rounded-sm text-sm transition-colors inline-block"
            >
              Sign in
            </a>
            <p className="text-xs text-gray-400 mt-2">
              New customer? <a href="/login" className="text-cyan-400 hover:underline">Start here</a>
            </p>
          </div>
        </div>

        {/* More category rows */}
        <div className="bg-white mx-4 sm:mx-6 md:mx-8 mb-6 border border-gray-200 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Top picks in Electronics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { title: "Smart Speakers", img: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&q=80" },
              { title: "Headphones", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
              { title: "Watches", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80" },
              { title: "Laptops", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80" },
              { title: "Cameras", img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80" },
              { title: "Tablets", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80" },
            ].map((item, i) => (
              <a key={i} href="/products" className="group cursor-pointer">
                <div className="aspect-square overflow-hidden bg-gray-50 mb-2 rounded-sm">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Recently Viewed / Inspiration */}
        <div className="bg-white mx-4 sm:mx-6 md:mx-8 mb-6 border border-gray-200 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Inspiration for your home
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: "Kitchen & Dining", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", tag: "Up to 60% off" },
              { title: "Furniture", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", tag: "Starting ₹2,999" },
              { title: "Bathroom Essentials", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80", tag: "Min 30% off" },
              { title: "Bedding & Linens", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80", tag: "From ₹499" },
            ].map((item, i) => (
              <a key={i} href="/products" className="group cursor-pointer border border-gray-200 rounded-sm overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 bg-white/90 text-gray-900 text-xs font-medium px-2 py-1 rounded-sm">
                    {item.tag}
                  </span>
                </div>
                <p className="p-3 text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
