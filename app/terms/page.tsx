'use client'

import Layout from '@/components/layout/Layout'

export default function TermsPage() {
  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-6">
                By accessing and using this website, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Products and Pricing</h2>
              <p className="text-gray-600 mb-4">
                All products are subject to availability. We reserve the right to discontinue any 
                product at any time. Prices are subject to change without notice.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Orders and Payment</h2>
              <p className="text-gray-600 mb-4">
                By placing an order, you agree to provide accurate and complete information. We accept 
                Cash on Delivery (COD) for all orders. Payment is due upon delivery of the product.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Shipping and Delivery</h2>
              <p className="text-gray-600 mb-4">
                Delivery times are estimates only. We are not responsible for delays beyond our control. 
                Risk of loss and title for products pass to you upon delivery.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Returns and Refunds</h2>
              <p className="text-gray-600 mb-4">
                We offer a 30-day return policy. Products must be returned in original condition. 
                Refunds will be processed within 7-10 business days of receiving the returned item.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-600 mb-6">
                In no event shall we be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of our website or products.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Contact Information</h2>
              <p className="text-gray-600">
                For questions about these Terms, please contact us at contact@dropshipstore.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
