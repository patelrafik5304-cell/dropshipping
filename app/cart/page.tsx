'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase'
import type { CartItem, Product } from '@/types/supabase'
import type { User } from '@supabase/supabase-js'

interface CartItemWithProduct extends CartItem {
  products: Product | null
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([])
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
    fetchCartItems(user.id)
  }

  const fetchCartItems = async (userId: string) => {
    const { data } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (data) setCartItems(data as CartItemWithProduct[])
    setLoading(false)
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    await supabase
      .from('cart_items')
      .update({ quantity: newQuantity })
      .eq('id', itemId)

    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = async (itemId: string) => {
    await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)

    setCartItems(items => items.filter(item => item.id !== itemId))
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.products?.price || 0
    return sum + (price * item.quantity)
  }, 0)

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href="/products" className="text-indigo-600 hover:text-indigo-500">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center p-6 border-b last:border-b-0">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                      {item.products?.images?.[0] && (
                        <img
                          src={item.products.images[0]}
                          alt={item.products?.name || ''}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="ml-4 flex-1">
                      <Link href={`/products/${item.products?.slug}`}>
                        <h3 className="text-sm font-medium text-gray-900 hover:text-indigo-600">
                          {item.products?.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">
                        ${item.products?.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border border-gray-300 rounded"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border border-gray-300 rounded"
                      >
                        +
                      </button>
                    </div>

                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        ${((item.products?.price || 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/products"
                  className="block text-center mt-4 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
