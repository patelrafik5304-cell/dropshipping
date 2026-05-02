'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase'
import type { Product, Order, Profile } from '@/types/supabase'

export default function AdminDashboard() {
  const [user, setUser] = useState<Profile | null>(null)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      router.push('/')
      return
    }

    setUser(profile)
    fetchStats()
  }

  const fetchStats = async () => {
    const [products, orders, customers, revenue] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('orders').select('id', { count: 'exact' }),
      supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'customer'),
      supabase.from('orders').select('total_amount').eq('payment_status', 'paid')
    ])

    const totalRevenue = revenue.data?.reduce((sum, order) => sum + order.total_amount, 0) || 0

    setStats({
      totalProducts: products.count || 0,
      totalOrders: orders.count || 0,
      totalCustomers: customers.count || 0,
      totalRevenue
    })
    setLoading(false)
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProducts}</p>
            <Link href="/admin/products" className="text-sm text-indigo-600 hover:text-indigo-500 mt-2 inline-block">
              Manage Products →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
            <Link href="/admin/orders" className="text-sm text-indigo-600 hover:text-indigo-500 mt-2 inline-block">
              View Orders →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Customers</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCustomers}</p>
            <Link href="/admin/customers" className="text-sm text-indigo-600 hover:text-indigo-500 mt-2 inline-block">
              View Customers →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/products" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Product Management</h3>
            <p className="text-gray-600">Add, edit, and manage your product catalog</p>
          </Link>

          <Link href="/admin/orders" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Order Management</h3>
            <p className="text-gray-600">View and update order statuses</p>
          </Link>

          <Link href="/admin/inventory" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Inventory Management</h3>
            <p className="text-gray-600">Track stock levels and manage inventory</p>
          </Link>

          <Link href="/admin/categories" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <p className="text-gray-600">Manage product categories</p>
          </Link>

          <Link href="/admin/reviews" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Reviews</h3>
            <p className="text-gray-600">Approve and manage customer reviews</p>
          </Link>

          <Link href="/admin/settings" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p className="text-gray-600">Configure store settings</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
