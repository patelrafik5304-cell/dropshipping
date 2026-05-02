'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase'
import { useEffect } from 'react'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  useEffect(() => {
    if (user) {
      fetchCartCount()
    }
  }, [user])

  const fetchCartCount = async () => {
    const { data } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('user_id', user?.id || '')
    setCartCount(data?.reduce((acc, item) => acc + item.quantity, 0) || 0)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600">Dropship</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/products" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Categories
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative text-gray-700 hover:text-indigo-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
                Login
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-indigo-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/products" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              Products
            </Link>
            <Link href="/categories" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              Categories
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
