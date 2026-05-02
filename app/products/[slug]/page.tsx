'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabase'
import type { Product, Category, Review } from '@/types/supabase'
import type { User } from '@supabase/supabase-js'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    if (slug) {
      fetchProduct()
      fetchReviews()
      checkWishlist()
      getUser()
    }
  }, [slug])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchProduct = async () => {
    const { data } = await supabase
      .from('products')
      .select('*, categories(*)')
      .eq('slug', slug as string)
      .single()

    if (data) {
      setProduct(data)
      fetchRelatedProducts(data.category_id)
    }
    setLoading(false)
  }

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', product?.id || '')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })

    if (data) setReviews(data)
  }

  const fetchRelatedProducts = async (categoryId: string) => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .neq('id', product?.id || '')
      .limit(4)

    if (data) setRelatedProducts(data)
  }

  const checkWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', product?.id || '')
      .single()

    setIsWishlisted(!!data)
  }

  const addToCart = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('Please login to add items to cart')
      return
    }

    const { error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        product_id: product!.id,
        quantity: quantity
      }, {
        onConflict: 'user_id, product_id'
      })

    if (!error) {
      alert('Added to cart!')
    }
  }

  const toggleWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('Please login to add items to wishlist')
      return
    }

    if (isWishlisted) {
      await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', product!.id)
      setIsWishlisted(false)
    } else {
      await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: product!.id
        })
      setIsWishlisted(true)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-indigo-600">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/products" className="hover:text-indigo-600">Products</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-200 mb-4">
              {product.images?.[selectedImage] && (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-md bg-gray-200 ${
                      selectedImage === index ? 'ring-2 ring-indigo-600' : ''
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.review_count} reviews)</span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.compare_price && product.compare_price > product.price && (
                <>
                  <span className="ml-2 text-xl text-gray-500 line-through">
                    ${product.compare_price.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                    {Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {product.short_description && (
              <p className="text-gray-600 mb-6">{product.short_description}</p>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-md"
                >
                  -
                </button>
                <span className="px-4 py-1 border border-gray-300 rounded-md">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-md"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={addToCart}
                disabled={product.stock_quantity === 0}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
              >
                {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={toggleWishlist}
                className={`px-6 py-3 rounded-lg border-2 font-semibold transition-colors ${
                  isWishlisted
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:border-indigo-600 hover:text-indigo-600'
                }`}
              >
                {isWishlisted ? '♥' : '♡'}
              </button>
            </div>

            {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
              <p className="text-orange-600 mb-4">
                Only {product.stock_quantity} left in stock!
              </p>
            )}

            {product.description && (
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                    {review.is_verified_purchase && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  {review.title && (
                    <h4 className="font-semibold mb-1">{review.title}</h4>
                  )}
                  {review.comment && (
                    <p className="text-gray-600">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link key={related.id} href={`/products/${related.slug}`}>
                  <div className="cursor-pointer">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-200 mb-4">
                      {related.images?.[0] && (
                        <img
                          src={related.images[0]}
                          alt={related.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900">{related.name}</h3>
                    <p className="text-lg font-bold text-gray-900">${related.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
