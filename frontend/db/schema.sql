-- ==============================================================================
-- FOODRUSH — PRODUCTION POSTGRESQL DATABASE SCHEMA
-- ==============================================================================
-- This schema is designed to support all current frontend entities and relations.
-- Compatible with PostgreSQL 13+, Supabase, Neon, Prisma, Drizzle, or raw pg/node-postgres.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. USERS & AUTH
-- ==============================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(255) UNIQUE,
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 3. USER ADDRESSES (One User -> Many Addresses)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(64) NOT NULL DEFAULT 'Home', -- e.g. 'Home', 'Work', 'Gym'
    icon VARCHAR(16) DEFAULT '📍', -- emoji or icon identifier
    street VARCHAR(255) NOT NULL,
    city VARCHAR(120) NOT NULL DEFAULT 'New York, NY',
    details VARCHAR(255), -- apartment, suite, intercom code
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);

-- ==============================================================================
-- 4. CATEGORIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'pizza', 'burgers', 'sushi'
    name VARCHAR(120) NOT NULL,
    icon VARCHAR(64) NOT NULL, -- Lucide icon key, e.g. 'Flame', 'Utensils'
    count INT DEFAULT 0,
    sort_order INT DEFAULT 0
);

-- ==============================================================================
-- 5. RESTAURANTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS restaurants (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'res-1'
    name VARCHAR(160) NOT NULL,
    cuisine VARCHAR(255) NOT NULL,
    rating NUMERIC(3,2 ) DEFAULT 4.8, 
    reviews_count INT DEFAULT 120,
    delivery_time VARCHAR(32) DEFAULT '20-30 min',
    delivery_fee NUMERIC(6, 2) DEFAULT 0.00,
    min_order NUMERIC(6, 2) DEFAULT 10.00,
    tag VARCHAR(64), -- e.g. 'Top Rated', 'Michelin Guide'
    price_range VARCHAR(8) DEFAULT '$$',
    image VARCHAR(500) NOT NULL,
    featured_dish VARCHAR(160),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 6. DISHES / MENU ITEMS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS dishes (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'dish-1'
    restaurant_id VARCHAR(64) REFERENCES restaurants(id) ON DELETE CASCADE,
    category_id VARCHAR(64) REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(160) NOT NULL,
    description TEXT,
    price NUMERIC(8, 2) NOT NULL,
    old_price NUMERIC(8, 2),
    rating NUMERIC(3, 2) DEFAULT 4.9,
    reviews_count INT DEFAULT 150,
    prep_time VARCHAR(32) DEFAULT '15-20 min',
    calories VARCHAR(32),
    tag VARCHAR(64), -- e.g. 'Chef Choice', 'Bestseller'
    spicy BOOLEAN DEFAULT FALSE,
    vegetarian BOOLEAN DEFAULT FALSE,
    image VARCHAR(500) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_dishes_category ON dishes(category_id);
CREATE INDEX IF NOT EXISTS idx_dishes_restaurant ON dishes(restaurant_id);

-- ==============================================================================
-- 7. ORDERS
-- ==============================================================================
CREATE TYPE order_status AS ENUM (
    'placed',
    'preparing',
    'on_the_way',
    'delivered',
    'cancelled'
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'FR-88291'
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    customer_name VARCHAR(120) NOT NULL,
    customer_phone VARCHAR(32) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_mode VARCHAR(20) DEFAULT 'delivery', -- 'delivery' or 'pickup'
    status VARCHAR(32) DEFAULT 'placed', -- 'placed', 'preparing', 'on_the_way', 'delivered'
    payment_method VARCHAR(32) DEFAULT 'card', -- 'card', 'apple', 'cash'
    
    -- Financial breakdown
    subtotal NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
    delivery_fee NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    service_fee NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    discount_amount NUMERIC(6, 2) DEFAULT 0.00,
    promo_code VARCHAR(32),
    tip NUMERIC(6, 2) DEFAULT 0.00,
    total NUMERIC(8, 2) NOT NULL,
    
    -- Courier assignments
    driver_name VARCHAR(120) DEFAULT 'Marco Rossi',
    driver_phone VARCHAR(32) DEFAULT '+1 (555) 234-8910',
    driver_vehicle VARCHAR(120) DEFAULT 'Yamaha NMAX 155 (Black)',
    driver_rating NUMERIC(3, 2) DEFAULT 4.96,
    eta_minutes INT DEFAULT 25,
    
    special_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ==============================================================================
-- 8. ORDER ITEMS (Line items inside each order)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(64) REFERENCES orders(id) ON DELETE CASCADE,
    dish_id VARCHAR(64) REFERENCES dishes(id) ON DELETE SET NULL,
    dish_name VARCHAR(160) NOT NULL,
    price NUMERIC(8, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    selected_options JSONB DEFAULT '[]'::jsonb, -- e.g. ["Extra Truffle Aioli Glaze (+$1.50)"]
    image VARCHAR(500)
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

