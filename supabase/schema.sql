-- Drop existing tables if needed (be careful in production)
-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.wishlist_items CASCADE;
DROP TABLE IF EXISTS public.cart_items CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.inventory CASCADE;
DROP TABLE IF EXISTS public.settings CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  compare_price DECIMAL(10,2) CHECK (compare_price >= 0),
  cost_price DECIMAL(10,2) CHECK (cost_price >= 0),
  sku TEXT UNIQUE,
  barcode TEXT,
  images TEXT[] DEFAULT '{}',
  category_id UUID REFERENCES public.categories(id),
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  low_stock_threshold INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  weight DECIMAL(10,2),
  dimensions JSONB,
  attributes JSONB DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory table
CREATE TABLE public.inventory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  reserved_quantity INTEGER DEFAULT 0,
  low_stock_alert INTEGER DEFAULT 5,
  last_restocked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id)
);

-- Orders table
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT DEFAULT 'cod',
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  notes TEXT,
  tracking_number TEXT,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  product_snapshot JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  images TEXT[] DEFAULT '{}',
  is_verified_purchase BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist table
CREATE TABLE public.wishlist_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Cart items table (persistent cart)
CREATE TABLE public.cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Settings table (for site configuration)
CREATE TABLE public.settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: users can read all, update own; admins can update all
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Categories: readable by all, manageable by admins
CREATE POLICY "Categories are viewable by everyone" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Products: readable by all (active only for non-admins), manageable by admins
CREATE POLICY "Active products are viewable by everyone" ON public.products
  FOR SELECT USING (
    is_active = true OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Inventory: readable by admins only
CREATE POLICY "Admins can manage inventory" ON public.inventory
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Orders: users can read own orders, admins can read all
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders" ON public.orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Order items: users can read own order items, admins can read all
CREATE POLICY "Users can view own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for own orders" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all order items" ON public.order_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Reviews: everyone can read approved reviews, users can manage own
CREATE POLICY "Approved reviews are viewable by everyone" ON public.reviews
  FOR SELECT USING (
    is_approved = true OR auth.uid() = user_id
  );

CREATE POLICY "Users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reviews" ON public.reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Wishlist: users can manage own wishlist
CREATE POLICY "Users can manage own wishlist" ON public.wishlist_items
  FOR ALL USING (auth.uid() = user_id);

-- Cart: users can manage own cart
CREATE POLICY "Users can manage own cart" ON public.cart_items
  FOR ALL USING (auth.uid() = user_id);

-- Settings: readable by all, manageable by admins
CREATE POLICY "Settings are viewable by everyone" ON public.settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage settings" ON public.settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Functions and Triggers

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON public.cart_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT AS $$
DECLARE
  order_num TEXT;
BEGIN
  order_num := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0');
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES
  ('site_name', '"Dropship Store"'),
  ('site_description', '"Your premier dropshipping destination"'),
  ('currency', '"USD"'),
  ('currency_symbol', '"$"'),
  ('free_shipping_threshold', '100'),
  ('tax_rate', '0.1'),
  ('contact_email', '"contact@dropshipstore.com"'),
  ('contact_phone', '"+1-800-DROPSHIP"'),
  ('address', '"123 Commerce St, Business City, BC 12345"'),
  ('social_facebook', '""'),
  ('social_instagram', '""'),
  ('social_twitter', '""'),
  ('hero_banner', '{"title": "Discover Amazing Products", "subtitle": "Shop the latest trends with unbeatable prices", "image": "/hero-banner.jpg", "cta_text": "Shop Now", "cta_link": "/products"}');

-- Insert sample categories
INSERT INTO public.categories (name, slug, description, image_url, is_active, sort_order) VALUES
  ('Electronics', 'electronics', 'Latest electronic devices and gadgets', 'https://images.unsplash.com/photo-1498049794561-7780e7231661', true, 1),
  ('Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1483985988355-763728e1935b', true, 2),
  ('Home & Living', 'home-living', 'Everything for your home', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a', true, 3),
  ('Beauty', 'beauty', 'Cosmetics and beauty products', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc1', true, 4),
  ('Sports', 'sports', 'Sports and fitness equipment', 'https://images.unsplash.com/photo-1461896836934-ffe607ba821f', true, 5);

-- Insert sample products
INSERT INTO public.products (name, slug, description, short_description, price, compare_price, images, category_id, stock_quantity, is_active, is_featured, is_trending, rating, review_count, sales_count) VALUES
  (
    'Wireless Bluetooth Headphones',
    'wireless-bluetooth-headphones',
    'Premium wireless headphones with noise cancellation, 30-hour battery life, and premium comfort for extended use.',
    'Premium wireless headphones with noise cancellation',
    79.99,
    129.99,
    ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
    (SELECT id FROM public.categories WHERE slug = 'electronics'),
    50,
    true,
    true,
    true,
    4.5,
    128,
    450
  ),
  (
    'Smart Fitness Watch',
    'smart-fitness-watch',
    'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and 7-day battery life.',
    'Advanced smartwatch with fitness tracking',
    199.99,
    249.99,
    ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30'],
    (SELECT id FROM public.categories WHERE slug = 'electronics'),
    30,
    true,
    true,
    true,
    4.8,
    256,
    380
  ),
  (
    'Organic Face Serum',
    'organic-face-serum',
    'Rejuvenate your skin with our organic face serum, enriched with vitamins and natural extracts.',
    'Organic face serum for glowing skin',
    34.99,
    49.99,
    ARRAY['https://images.unsplash.com/photo-1629198688000-71f23e745c0e'],
    (SELECT id FROM public.categories WHERE slug = 'beauty'),
    100,
    true,
    true,
    false,
    4.6,
    89,
    220
  ),
  (
    'Yoga Mat Premium',
    'yoga-mat-premium',
    'High-density yoga mat with non-slip surface, perfect for all types of yoga and fitness routines.',
    'Non-slip premium yoga mat',
    49.99,
    69.99,
    ARRAY['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'],
    (SELECT id FROM public.categories WHERE slug = 'sports'),
    75,
    true,
    false,
    true,
    4.7,
    145,
    310
  ),
  (
    'Modern Table Lamp',
    'modern-table-lamp',
    'Elegant modern table lamp with adjustable brightness, perfect for study or workspace.',
    'Elegant modern table lamp',
    59.99,
    89.99,
    ARRAY['https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe'],
    (SELECT id FROM public.categories WHERE slug = 'home-living'),
    40,
    true,
    false,
    false,
    4.4,
    67,
    180
  ),
  (
    'Designer Backpack',
    'designer-backpack',
    'Stylish and functional backpack with laptop compartment, perfect for work or travel.',
    'Stylish backpack with laptop compartment',
    89.99,
    129.99,
    ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62'],
    (SELECT id FROM public.categories WHERE slug = 'fashion'),
    60,
    true,
    true,
    false,
    4.5,
    198,
    290
  );

-- Insert inventory records
INSERT INTO public.inventory (product_id, quantity, low_stock_alert)
SELECT id, stock_quantity, 5 FROM public.products;

-- Create indexes for performance
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_active ON public.products(is_active);
CREATE INDEX idx_products_featured ON public.products(is_featured);
CREATE INDEX idx_products_trending ON public.products(is_trending);
CREATE INDEX idx_products_price ON public.products(price);
CREATE INDEX idx_products_rating ON public.products(rating);
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_reviews_product ON public.reviews(product_id);
CREATE INDEX idx_reviews_user ON public.reviews(user_id);
CREATE INDEX idx_wishlist_user ON public.wishlist_items(user_id);
CREATE INDEX idx_cart_user ON public.cart_items(user_id);

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
