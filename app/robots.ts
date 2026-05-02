import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/auth', '/cart', '/checkout', '/profile', '/orders']
    },
    sitemap: 'https://dropship-store.vercel.app/sitemap.xml'
  }
}
