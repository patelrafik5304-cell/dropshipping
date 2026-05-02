'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabase'
import type { Product, Category } from '@/types/supabase'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(*)')
      .eq('is_featured', true)
      .eq('is_active', true)
      .limit(8)

    if (!error && data) {
      setProducts(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600">Handpicked products just for you</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square">
                  {product.images?.[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {product.compare_price && product.compare_price > product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      SALE
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.compare_price && product.compare_price > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.compare_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
