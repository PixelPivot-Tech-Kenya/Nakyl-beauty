# Nakyl — Luxury Beauty E-Commerce

A full-stack luxury beauty e-commerce storefront built with Next.js 16, Supabase, Zustand, and Stripe. This document covers everything from project setup to deployment, written for beginners.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Design System](#4-design-system)
5. [Phase 1 — Project Setup](#5-phase-1--project-setup)
6. [Phase 2 — Database Schema](#6-phase-2--database-schema)
7. [Phase 3 — Cart State with Zustand](#7-phase-3--cart-state-with-zustand)
8. [Phase 4 — Shop Page](#8-phase-4--shop-page)
9. [Phase 5 — Cart Page](#9-phase-5--cart-page)
10. [Phase 6 — Authentication](#10-phase-6--authentication)
11. [Phase 7 — Checkout & Payments](#11-phase-7--checkout--payments)
12. [Phase 8 — Post-Payment](#12-phase-8--post-payment)
13. [Phase 9 — Order History (Pending)](#13-phase-9--order-history-pending)
14. [Phase 10 — Seed Products to Supabase (Pending)](#14-phase-10--seed-products-to-supabase-pending)
15. [Phase 11 — Stripe Webhook (Pending)](#15-phase-11--stripe-webhook-pending)
16. [Phase 12 — Deployment (Pending)](#16-phase-12--deployment-pending)
17. [Environment Variables Reference](#17-environment-variables-reference)
18. [Common Errors & Fixes](#18-common-errors--fixes)

---

## 1. Project Overview

**Nakyl** is a luxury beauty brand selling skincare, haircare, fragrances, and makeup. The website is a full e-commerce experience where a customer can:

- Browse products by category
- Add products to a persistent cart
- Sign up / log in
- Fill in a shipping address at checkout
- Pay securely via Stripe
- Receive an order confirmation

The brand targets African women with premium, science-backed formulations. The visual identity uses a **burgundy and gold** color palette with serif typography (Cormorant Garamond) for elegance.

---

## 2. Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server and client rendering in one project |
| Language | TypeScript | Catches errors before they happen |
| Styling | Tailwind CSS v4 + CSS variables | Fast, theme-aware styling |
| Database & Auth | Supabase | Postgres database + authentication in one |
| Cart State | Zustand | Simple global state without boilerplate |
| Payments | Stripe | Industry-standard payment processing |
| Icons | Lucide React | Clean, consistent icon set |
| Fonts | Google Fonts (Jost + Cormorant Garamond) | Luxury editorial feel |

---

## 3. Project Structure

```
nakyl-client/
├── app/
│   ├── api/
│   │   ├── checkout/route.ts         # Creates Stripe session + Supabase order
│   │   └── webhooks/stripe/route.ts  # Marks orders as paid after payment
│   ├── auth/
│   │   ├── login/page.tsx            # Sign in page
│   │   └── signup/page.tsx           # Create account page
│   ├── cart/
│   │   └── page.tsx                  # Full cart review page
│   ├── checkout/
│   │   ├── page.tsx                  # Shipping form + order summary
│   │   ├── success/page.tsx          # Shown after successful payment
│   │   └── cancel/page.tsx           # Shown if user cancels on Stripe
│   ├── components/
│   │   ├── product/
│   │   │   └── ProductCard.tsx       # Individual product card
│   │   └── ui/
│   │       ├── CartDrawer.tsx        # Slide-in cart drawer
│   │       ├── Navbar.tsx            # Sticky navigation
│   │       ├── NavLogos.tsx          # Cart icon with badge + account icon
│   │       ├── NewsletterBanner.tsx  # Email signup section
│   │       ├── ProductCategoryCard.tsx # Category image card
│   │       ├── ShopFilters.tsx       # Filter sidebar on shop page
│   │       ├── Testimonials.tsx      # Customer reviews section
│   │       ├── TopBar.tsx            # Announcement bar
│   │       └── Logo.tsx              # Brand logo
│   ├── data/
│   │   └── products.ts               # Static product data (until Supabase is seeded)
│   ├── lib/
│   │   ├── client.ts                 # Supabase browser client
│   │   └── server.ts                 # Supabase server client
│   ├── shop/
│   │   └── page.tsx                  # Shop page with filters and product grid
│   ├── store/
│   │   └── cartStore.ts              # Zustand cart store
│   ├── globals.css                   # Design tokens + global styles
│   ├── layout.tsx                    # Root layout with CartDrawer
│   └── page.tsx                      # Homepage
├── middleware.ts                      # Protects /checkout from unauthenticated users
├── .env.local                         # Secret keys (never commit this file)
└── package.json
```

---

## 4. Design System

All colors are defined as CSS variables in `globals.css` and automatically switch between light and dark mode.

### Colors

| Variable | Light Mode | Dark Mode | Used For |
|---|---|---|---|
| `--burgundy` | `#6B1232` | `#8F1840` | Buttons, headings, accents |
| `--gold` | `#D4AF6A` | `#D4AF6A` | Decorative lines, stars |
| `--background` | `#F5EDDA` cream | `#2A1F0A` dark brown | Page background |
| `--surface` | `#FDFAF8` warm white | `#332608` | Cards, navbar |
| `--surface-muted` | `#FDF0F4` blush | `#3D2E0E` | Subtle sections |
| `--foreground` | `#1A0A0F` near black | `#F5EDDA` cream | Main text |
| `--text-muted` | `#4A3540` | `#C4A870` | Secondary text |
| `--border` | `#E8D5DC` | `#5C4A1E` | All borders |

### Typography

- **Display / Headings** — Cormorant Garamond (serif, weight 300) — elegant and editorial
- **Body / UI** — Jost (sans-serif, weight 200–500) — clean and modern

### Reusable CSS Classes

| Class | Description |
|---|---|
| `.btn-primary` | Solid burgundy button |
| `.btn-outline` | Transparent with burgundy border |
| `.btn-ghost` | Minimal button, fills on hover |
| `.badge-best` | Gold "Bestseller" badge |
| `.badge-new` | Blush "New" badge |
| `.badge-sale` | Burgundy "Sale" badge |
| `.card` | White surface card with border |
| `.eyebrow` | Small uppercase label text |
| `.heading-display` | Cormorant Garamond serif heading |

---

## 5. Phase 1 — Project Setup

### Step 1 — Install dependencies

```bash
npm install zustand @supabase/supabase-js @supabase/ssr stripe react-hot-toast
```

### Step 2 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** and give it a name
3. Wait for the project to be ready (about 2 minutes)
4. Go to **Project Settings → API** and copy:
   - **Project URL**
   - **anon / public key**

### Step 3 — Create environment variables

Create a file called `.env.local` in the root of the project:

```
NEXT_PUBLIC_SUPABASE_URL="your-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> **Important:** Never commit `.env.local` to Git. It contains secret keys.

### Step 4 — Set up Supabase clients

Create two files so both server and client components can talk to Supabase.

**`app/lib/client.ts`** — used in browser components (forms, buttons):
```typescript
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**`app/lib/server.ts`** — used in server components and API routes:
```typescript
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

> **Why two clients?** Next.js runs some code on the server and some in the browser. The server client reads session cookies so authenticated requests work correctly. The browser client handles client-side auth actions like login and signup.

---

## 6. Phase 2 — Database Schema

Run each SQL block in your Supabase **SQL Editor** (left sidebar — the `</>` icon → New query → paste → Run).

### Table 1 — Products

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  subcategory text,
  description text,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  image_url text,
  image_bg text,
  badge text check (badge in ('BESTSELLER', 'NEW', 'SALE', 'NATURAL')),
  slug text unique not null,
  stock_quantity int not null default 0,
  rating numeric(2,1) default 0,
  review_count int default 0,
  created_at timestamptz default now()
);

alter table products enable row level security;

create policy "Products are publicly readable"
on products for select to anon, authenticated
using (true);
```

### Table 2 — Profiles

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  address text,
  city text,
  country text default 'Kenya',
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view their own profile"
on profiles for select to authenticated
using (auth.uid() = id);

create policy "Users can update their own profile"
on profiles for update to authenticated
using (auth.uid() = id);

create policy "Allow trigger to insert profiles"
on profiles for insert
with check (true);
```

### Table 3 — Orders

```sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total_amount numeric(10,2) not null,
  shipping_address jsonb,
  stripe_session_id text,
  created_at timestamptz default now()
);

alter table orders enable row level security;

create policy "Users can view their own orders"
on orders for select to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own orders"
on orders for insert to authenticated
with check (auth.uid() = user_id);
```

### Table 4 — Order Items

```sql
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  quantity int not null,
  unit_price numeric(10,2) not null
);

alter table order_items enable row level security;

create policy "Users can view their own order items"
on order_items for select to authenticated
using (
  exists (
    select 1 from orders
    where orders.id = order_items.order_id
    and orders.user_id = auth.uid()
  )
);

create policy "Users can insert their own order items"
on order_items for insert to authenticated
with check (
  exists (
    select 1 from orders
    where orders.id = order_items.order_id
    and orders.user_id = auth.uid()
  )
);
```

### Step 5 — Auto-create profile on signup

```sql
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
```

> **What this does:** Every time a new user signs up, Postgres automatically creates a matching row in the `profiles` table. This runs on the database level so it never fails silently.

---

## 7. Phase 3 — Cart State with Zustand

### What is Zustand?

Zustand is a global state manager. Think of it as a shared box that every component in your app can read from and write to — without passing data through props from parent to child.

### The Cart Store (`app/store/cartStore.ts`)

The store holds:
- `items` — array of `{ product, quantity }` pairs
- `isOpen` — whether the cart drawer is visible

Actions available to any component:

| Action | What it does |
|---|---|
| `addItem(product)` | Adds product or bumps quantity if already in cart |
| `removeItem(id)` | Removes a product completely |
| `updateQuantity(id, qty)` | Changes quantity, removes item if it drops to 0 |
| `clearCart()` | Empties the cart — called after successful checkout |
| `toggleCart()` | Opens or closes the drawer |
| `getTotalItems()` | Returns total count shown on the cart icon badge |
| `getTotalPrice()` | Returns running total in KES |

The `persist` middleware saves `items` to `localStorage` so the cart survives page refreshes and browser restarts.

### How to use the store in any component

```typescript
const { addItem, items, getTotalPrice } = useCartStore()
```

---

## 8. Phase 4 — Shop Page

**Route:** `/shop`

**Files:**
- `app/shop/page.tsx` — main shop page
- `app/components/ui/ShopFilters.tsx` — left sidebar with category, price, and badge filters
- `app/components/product/ProductCard.tsx` — individual product card with Add to Bag button
- `app/data/products.ts` — static product data (temporary until Supabase is seeded)

**Flow:**
1. Page loads and renders all products from `STATIC_PRODUCTS`
2. Each `ProductCard` has an **Add to Bag** button
3. Clicking Add to Bag calls `addItem()` from the Zustand store and opens the cart drawer
4. The Navbar cart icon shows a live count badge from `getTotalItems()`

> **Future update:** When products are seeded into Supabase, replace `STATIC_PRODUCTS` in `shop/page.tsx` with:
> ```typescript
> const supabase = await createClient()
> const { data: products } = await supabase.from("products").select("*")
> ```

---

## 9. Phase 5 — Cart Page

**Route:** `/cart`

**File:** `app/cart/page.tsx`

Shows a full-page table of cart items with:
- Product image, name, and category
- Unit price per item
- Quantity controls (+ and −)
- Line total per item
- Remove button
- Order summary panel with subtotal, shipping cost, and grand total
- Free shipping on orders over KES 3,000
- **Proceed to Checkout** button

The `CartDrawer` (`app/components/ui/CartDrawer.tsx`) is a slide-in version of the same cart available on every page — it lives in `layout.tsx` so it renders globally.

---

## 10. Phase 6 — Authentication

**Routes:** `/auth/login`, `/auth/signup`

**Files:**
- `app/auth/login/page.tsx`
- `app/auth/signup/page.tsx`
- `middleware.ts`

### How it works

1. User clicks **Proceed to Checkout** from the cart
2. `middleware.ts` intercepts the request to `/checkout`
3. If no active session is found, user is redirected to `/auth/login`
4. After signing in, user is returned to `/checkout`

### Middleware

```typescript
export const config = {
  matcher: ["/checkout/:path*"],
}
```

The middleware uses the Supabase server client to read the session from cookies. If no session exists, it redirects to login. This happens on the server — users cannot bypass it from the browser.

### Sign Up

When a user signs up, Supabase Auth creates the user record, then the database trigger `handle_new_user()` automatically creates a matching row in the `profiles` table with their name and email.

---

## 11. Phase 7 — Checkout & Payments

**Route:** `/checkout`

**Files:**
- `app/checkout/page.tsx` — shipping form + order summary side panel
- `app/api/checkout/route.ts` — server API that creates the Stripe session

### Flow

1. User fills in the shipping form (name, email, phone, address, city, country)
2. On submit, a `POST` request is sent to `/api/checkout`
3. The API route:
   - Reads the authenticated user from the server session (never trusts the client)
   - Creates an `order` record in Supabase with status `pending`
   - Creates `order_items` records for each cart item
   - Creates a Stripe Checkout Session with all the items
   - Returns the Stripe redirect URL
4. The browser redirects the user to Stripe's hosted payment page
5. User enters card details on Stripe's secure page and pays

### Stripe Setup

1. Create a [Stripe account](https://stripe.com)
2. Go to **Developers → API Keys**
3. Make sure you are in **Test mode**
4. Copy the **Secret key** (starts with `sk_test_...`)
5. Paste it into `.env.local` as `STRIPE_SECRET_KEY`
6. Restart the dev server after any change to `.env.local`

---

## 12. Phase 8 — Post-Payment

### Success Page (`/checkout/success`)

- Stripe redirects here after a successful payment
- Automatically calls `clearCart()` to empty the Zustand store
- Shows a confirmation message with links to continue shopping or go home

### Cancel Page (`/checkout/cancel`)

- Shown if the user closes or goes back on the Stripe payment page
- The cart is NOT cleared — items remain so the user can try again

### Stripe Webhook (`/api/webhooks/stripe`)

Listens for Stripe events and updates the order in Supabase:

| Stripe Event | Action taken |
|---|---|
| `checkout.session.completed` | Updates order status from `pending` to `paid` |

---

## 13. Phase 9 — Order History (Pending)

**Status: Not yet built**

**Route:** `/account/orders`

This page will let logged-in users view all their past orders.

### What to build

1. Create `app/account/orders/page.tsx` as a server component
2. Fetch orders from Supabase:

```typescript
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()

const { data: orders } = await supabase
  .from("orders")
  .select("*, order_items(*)")
  .eq("user_id", user.id)
  .order("created_at", { ascending: false })
```

3. Display each order with: order ID, date, status badge, item count, and total amount
4. Add a detail view to show individual items per order
5. Link to this page from the Navbar account icon

---

## 14. Phase 10 — Seed Products to Supabase (Pending)

**Status: Not yet built**

Currently all products come from `app/data/products.ts` — a static TypeScript array. To make the shop fully dynamic and manageable:

### Steps

1. Go to Supabase → **Storage** → create a bucket called `product-images` (set to **public**)
2. Upload all product images and copy their public URLs
3. Insert products into the `products` table via the SQL Editor:

```sql
insert into products
  (name, category, subcategory, price, original_price, image_url, image_bg, badge, slug, stock_quantity, rating, review_count)
values
  ('Velvet Glow Serum', 'SKINCARE', 'SERUM', 2800, 3600, 'YOUR_IMAGE_URL', '#F7D6E0', 'BESTSELLER', 'velvet-glow-serum', 50, 5.0, 248),
  ('Radiance Eye Cream', 'SKINCARE', 'EYE CARE', 3200, null, 'YOUR_IMAGE_URL', '#EEE8F7', 'NEW', 'radiance-eye-cream', 30, 4.0, 87);
  -- repeat for all products
```

4. Update `app/shop/page.tsx` to fetch from Supabase:

```typescript
const supabase = await createClient()
const { data: products } = await supabase.from("products").select("*")
```

5. Do the same in `app/page.tsx` for the Best Selling Rituals section on the homepage

---

## 15. Phase 11 — Stripe Webhook (Pending)

**Status: File exists but not connected**

The webhook file is at `app/api/webhooks/stripe/route.ts` but needs to be wired to Stripe to receive real events.

### Local testing with Stripe CLI

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Log in:
```bash
stripe login
```
3. Forward events to your local server:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
4. Copy the printed webhook secret into `.env.local`:
```
STRIPE_WEBHOOK_SECRET="whsec_..."
```
5. Restart the dev server

### Production webhook setup

1. Go to Stripe Dashboard → **Developers → Webhooks**
2. Click **Add endpoint**
3. Set the URL to `https://your-domain.com/api/webhooks/stripe`
4. Select the event `checkout.session.completed`
5. Copy the signing secret into your production environment variables

---

## 16. Phase 12 — Deployment (Pending)

**Status: Not yet done**

The recommended platform is **Vercel** — it was built for Next.js and deploys with zero configuration.

### Steps

1. Push your code to a GitHub repository
   - Make sure `.env.local` is listed in `.gitignore` so secrets are never committed
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. Under **Environment Variables**, add all five keys:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_SITE_URL` — set this to your actual Vercel domain e.g. `https://nakyl.vercel.app`
5. Click **Deploy**
6. After deploying, update the Stripe webhook endpoint URL in the Stripe Dashboard to point to your live domain
7. Update `NEXT_PUBLIC_SITE_URL` in Vercel settings to match your live domain

---

## 17. Environment Variables Reference

| Variable | Where to get it | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API | Yes |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe CLI (local) or Stripe Dashboard (production) | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your local or production URL | Yes |

> After changing any value in `.env.local`, always restart the dev server. The server caches environment variables on startup.

---

## 18. Common Errors & Fixes

### `unexpected_failure` on signup (500 error)
The database trigger failed when trying to create the user profile. Run this in the SQL Editor:
```sql
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;
```

### 403 on order creation
The user ID was not being read from the server session. Never trust the client to send the user ID — always use `user.id` from `supabase.auth.getUser()` on the server side.

### 404 on order_items insert
The `order_items` table did not exist. Run the Table 4 SQL from Phase 2 in the SQL Editor.

### `22P02` invalid UUID on order_items insert
Static product IDs (`"1"`, `"2"`) are not valid UUIDs. The API route validates the ID format before inserting and sets `product_id` to null for static products. This resolves automatically once real products are seeded in Supabase with proper UUID primary keys.

### 500 after filling checkout form
The `STRIPE_SECRET_KEY` in `.env.local` is still a placeholder. Replace it with your real `sk_test_...` key from the Stripe dashboard, then restart the dev server.

### `STATIC_PRODUCTS.map is not a function`
Product data was exported from a `"use client"` file and imported into a server component. Fixed by moving data to `app/data/products.ts` — a plain TypeScript file with no client or server directive — so both sides can import from it safely.

### Environment variable changes not taking effect
Always restart the dev server after editing `.env.local`. Variables are cached at startup and won't update in a running server.

---

## Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (requires Node.js >= 20)
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use 24 && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

| Page | URL |
|---|---|
| Homepage | `http://localhost:3000` |
| Shop | `http://localhost:3000/shop` |
| Cart | `http://localhost:3000/cart` |
| Login | `http://localhost:3000/auth/login` |
| Sign Up | `http://localhost:3000/auth/signup` |
| Checkout | `http://localhost:3000/checkout` |
| Order Success | `http://localhost:3000/checkout/success` |
