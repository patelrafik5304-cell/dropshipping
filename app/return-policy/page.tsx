'use client'

export const dynamic = 'force-dynamic'

import Layout from '@/components/layout/Layout'

export default function ReturnPolicyPage() {
  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Return Policy</h1>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">30-Day Return Window</h2>
              <p className="text-gray-600 mb-6">
                We offer a 30-day return policy. If you are not satisfied with your purchase, 
                you can return it within 30 days of delivery for a full refund.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Return Conditions</h2>
              <p className="text-gray-600 mb-4">To be eligible for a return, your item must:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Be in the original packaging</li>
                <li>Be unused and in the same condition you received it</li>
                <li>Include all accessories and documentation</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Initiate a Return</h2>
              <p className="text-gray-600 mb-4">
                Contact our customer service team at contact@dropshipstore.com with your order 
                number and reason for return. We will provide you with a return authorization 
                and instructions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Refunds</h2>
              <p className="text-gray-600 mb-6">
                Once we receive and inspect your return, we will process your refund within 
                7-10 business days. Refunds will be issued to the original payment method 
                (Cash on Delivery orders will receive store credit or bank transfer).
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Non-Returnable Items</h2>
              <p className="text-gray-600 mb-4">The following items cannot be returned:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>Personalized or custom items</li>
                <li>Perishable goods</li>
                <li>Intimate or sanitary goods</li>
                <li>Digital downloads</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                For questions about returns, contact us at contact@dropshipstore.com 
                or call +1-800-DROPSHIP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
