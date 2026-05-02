'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase'
import type { WishlistItem, Product } from '@/types/supabase'
import type { User } from '@supabase/supabase-js'

interface WishlistItemWithProduct extends WishlistItem {
  products: Product | null
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItemWithProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth/login')
      return
    }
    setUser(user)
    fetchWishlist(user.id)
  }

  const fetchWishlist = async (userId: string) => {
    const { data } = await supabase
      .from('wishlist_items')
      .select('*, products(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (data) setWishlistItems(data as WishlistItemWithProduct[])
    setLoading(false)
  }

  const removeFromWishlist = async (itemId: string) => {
    await supabase.from('wishlist_items').delete().eq('id', itemId)
    setWishlistItems(items => items.filter(item => item.id !== itemId))
  }

  const addToCart = async (productId: string) => {
    if (!user) return

    await supabase
      .from('cart_items')
      .upsert({
        user_id: user.id,
        product_id: productId,
        quantity: 1
      }, { onConflict: 'user_id, product_id' })

    alert('Added to cart!')
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link href="/products" className="text-indigo-600 hover:text-indigo-500">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                <Link href={`/products/${item.products?.slug}`}>
                  <div className="aspect-square bg-gray-200 relative">
                    {item.products?.images?.[0] && (
                      <img
                        src={item.products.images[0]}
                        alt={item.products.name || ''}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        removeFromWishlist(item.id)
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50"
                    >
                      <span className="text-red-500 text-xl">♥</span>
                    </button>
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/products/${item.products?.slug}`}>
                    <h3 className="font-medium text-gray-900 hover:text-indigo-600">
                      {item.products?.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-bold text-gray-900 mt-2">
                    ${item.products?.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(item.product_id)}
                    className="w-full mt-3 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
