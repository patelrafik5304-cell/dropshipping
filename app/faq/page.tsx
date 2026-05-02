'use client'

import Layout from '@/components/layout/Layout'
import { useState } from 'react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is dropshipping?",
      answer: "Dropshipping is a retail fulfillment method where we don't keep the products we sell in stock. Instead, when you purchase a product, it is shipped directly from our supplier to you."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location and the product. Typically, orders are delivered within 5-10 business days. You'll receive a tracking number once your order ships."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy. If you're not satisfied with your purchase, you can return it within 30 days for a full refund. Please see our Return Policy page for more details."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive an email with a tracking number. You can use this number to track your package on our website or the carrier's website."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship to the United States, Canada, and the United Kingdom. We're working on expanding our shipping destinations soon."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We currently accept Cash on Delivery (COD) for all orders. We're working on integrating online payment gateways for future convenience."
    },
    {
      question: "How do I cancel or modify my order?",
      answer: "You can cancel or modify your order within 2 hours of placing it by contacting our customer service team. After this period, the order may have already been processed for shipping."
    },
    {
      question: "Are the product images accurate?",
      answer: "We strive to display our products as accurately as possible. However, due to differences in monitors and lighting, the actual product may vary slightly from the images shown."
    }
  ]

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h1>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <span className="text-indigo-600">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
