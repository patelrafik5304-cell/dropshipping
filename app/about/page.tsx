import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
          <p className="text-center mb-12 max-w-2xl mx-auto">
            We are a dropshipping store specializing in smart home devices. Our mission is to bring innovative technology to your home, making life more convenient and secure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-600">
                Founded in 2026, we started with a passion for smart technology. We source high-quality products from trusted suppliers to offer you the best in home automation.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="text-gray-600 list-disc list-inside">
                <li>Quality and reliability</li>
                <li>Customer satisfaction</li>
                <li>Innovation</li>
                <li>Sustainability</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}