'use client'

export const dynamic = 'force-dynamic'

import Layout from '@/components/layout/Layout'

export default function ShippingPolicyPage() {
  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping Policy</h1>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Shipping Destinations</h2>
              <p className="text-gray-600 mb-6">
                We currently ship to the United States, Canada, and the United Kingdom. 
                We're working on expanding our shipping destinations.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Shipping Methods</h2>
              <p className="text-gray-600 mb-4">We use reliable shipping carriers to ensure your orders reach you safely:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Standard Shipping: 5-10 business days</li>
                <li>Express Shipping: 2-5 business days (where available)</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Shipping Costs</h2>
              <p className="text-gray-600 mb-4">
                Free shipping on all orders over $100. For orders under $100, a flat shipping 
                rate of $9.99 applies.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Order Processing</h2>
              <p className="text-gray-600 mb-6">
                Orders are typically processed within 1-2 business days. You will receive a 
                confirmation email with tracking information once your order ships.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Delivery Issues</h2>
              <p className="text-gray-600 mb-6">
                If your order hasn't arrived within the estimated timeframe, please check the 
                tracking information. If there are issues, contact our customer service team 
                for assistance.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                For shipping-related questions, contact us at contact@dropshipstore.com 
                or call +1-800-DROPSHIP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
