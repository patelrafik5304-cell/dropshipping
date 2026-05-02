'use client'

import Layout from '@/components/layout/Layout'

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              About Us
            </h1>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                Welcome to Dropship, your premier destination for quality products at unbeatable prices. 
                We are dedicated to providing an exceptional shopping experience with a curated selection 
                of products from around the world.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                To make quality products accessible to everyone through innovative dropshipping solutions, 
                connecting customers with the best products while ensuring fast, reliable delivery and 
                outstanding customer service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                  <p className="text-gray-600">Carefully curated products that meet our high standards</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                  <p className="text-gray-600">Quick and reliable shipping to your doorstep</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Dedicated customer support whenever you need it</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Values</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Customer satisfaction is our top priority</li>
                <li>Integrity and transparency in all our dealings</li>
                <li>Continuous improvement of our products and services</li>
                <li>Sustainable and ethical business practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
