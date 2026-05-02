# Dropshipping Ecommerce Platform

A fully functional, production-ready dropshipping ecommerce platform built with Next.js, Supabase, and Tailwind CSS.

## Features

### Core Features
- **Modern Homepage** with hero banners, featured products, trending products, categories, testimonials, and newsletter signup
- **Complete Product Catalog** with search, filters (price, category, rating), and sorting options
- **Product Detail Pages** with image gallery, reviews, ratings, and related products
- **User Authentication** via Supabase (Signup, Login, Password Reset, Profile Management)
- **Shopping Cart** with add/remove products, quantity adjustment, and persistent cart
- **Wishlist** functionality for saving favorite products
- **Checkout System** with customer details, shipping address, order summary, and Cash on Delivery (COD) support

### Admin Dashboard
- **Product Management** (CRUD operations, featured products)
- **Order Management** (view orders, update status)
- **Inventory Management** 
- **Customer Management**
- **Analytics Dashboard** with sales tracking

### Additional Pages
- About Us
- Contact Us (with contact form)
- FAQ (accordion style)
- Privacy Policy
- Terms & Conditions
- Shipping Policy
- Return Policy

### Technical Features
- **SEO Optimized** with metadata, sitemap.xml, and robots.txt
- **Secure** with protected admin routes and authentication
- **Performance Optimized** with Next.js SSR, image optimization, and code splitting
- **Fully Responsive** design for desktop and mobile
- **TypeScript** for type safety
- **Tailwind CSS** for modern styling

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Deployment**: Vercel
- **Version Control**: Git/GitHub

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- Supabase account
- Vercel account (for deployment)

### 2. Clone the Repository
```bash
git clone https://github.com/patelrafik5304-cell/dropshipping.git
cd dropshipping
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Copy your project URL and anon key
3. Create `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the database schema:
   - Go to your Supabase project SQL Editor
   - Copy the contents of `supabase/schema.sql`
   - Run the SQL to create all tables, RLS policies, and sample data

5. Make the first user an admin:
```sql
UPDATE profiles SET role = 'admin' WHERE id = 'your_user_id';
```

### 5. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 6. Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in Vercel settings
4. Deploy!

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/            # Admin dashboard pages
│   ├── auth/             # Authentication pages
│   ├── products/         # Product catalog and detail pages
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout process
│   ├── orders/           # Order management
│   ├── profile/          # User profile
│   ├── wishlist/         # User wishlist
│   └── ...              # Other pages (about, contact, FAQ, policies)
├── components/            # Reusable components
│   ├── layout/          # Navbar, Footer, Layout
│   ├── home/            # Homepage sections
│   ├── products/        # Product-related components
│   ├── auth/            # Auth components
│   ├── cart/            # Cart components
│   └── checkout/       # Checkout components
├── lib/                 # Utility functions
│   ├── supabase.ts     # Browser Supabase client
│   └── supabase-server.ts # Server Supabase client
├── types/               # TypeScript types
│   └── supabase.ts     # Database types
└── supabase/            # Database schema
    └── schema.sql       # Complete database setup
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## Features to Add in Future

- [ ] Online payment gateways (Stripe, PayPal)
- [ ] Supplier API integrations
- [ ] Advanced analytics and reporting
- [ ] Email notifications
- [ ] Product reviews with image uploads
- [ ] Multi-language support
- [ ] Advanced inventory management
- [ ] Discount codes and promotions
- [ ] Related products algorithm
- [ ] Product recommendations

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub or contact us at contact@dropshipstore.com.
