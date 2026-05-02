import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Dropship - Your Premier Dropshipping Store',
    template: '%s | Dropship'
  },
  description: 'Discover amazing products at unbeatable prices. Your premier dropshipping destination for quality products.',
  keywords: ['dropshipping', 'online shopping', 'ecommerce', 'products', 'deals'],
  authors: [{ name: 'Dropship Store' }],
  creator: 'Dropship Store',
  metadataBase: new URL('https://dropship-store.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dropship-store.vercel.app',
    title: 'Dropship - Your Premier Dropshipping Store',
    description: 'Discover amazing products at unbeatable prices.',
    siteName: 'Dropship'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dropship - Your Premier Dropshipping Store',
    description: 'Discover amazing products at unbeatable prices.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
