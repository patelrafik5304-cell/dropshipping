import { MetadataRoute } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dropship-store.vercel.app'

  // Static pages
  const staticPages = [
    '',
    '/products',
    '/about',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/terms',
    '/shipping-policy',
    '/return-policy'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8
  }))

  // Dynamic product pages
  const supabase = createServerSupabaseClient()
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_active', true)

  const productPages = products?.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  })) || []

  return [...staticPages, ...productPages]
}
