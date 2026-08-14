# Features

**Last updated:** 2026-08-14

## Storefront Home

- **Purpose:** Presents the Oishi Merch brand, featured drops, categories, products, reviews, and shopping entry points.
- **Status:** Complete as static/client-side UI (transitioning to backend).
- **Dependencies:** `SiteHeader`, `SiteFooter`, local arrays, lucide-react icons.
- **Entry points:** `/`
- **Routes involved:** `/`
- **Components involved:** `HeroLoop`, `ProductCarousel`, `StudioVideo`, `SiteHeader`, `SiteFooter`
- **API usage:** None.
- **Database usage:** None currently (planned to use Mongoose).
- **Known future improvements:** Use the canonical product data source from MongoDB, replace hardcoded hero/category/product content with managed content.

## Product Catalog

- **Purpose:** Lets users browse all products and filter by category.
- **Status:** Complete as local-data UI (transitioning to backend).
- **Dependencies:** `lib/products.js` (legacy)
- **Entry points:** Header `Shop` link and product links.
- **Routes involved:** `/products`, `/products/[slug]`
- **Components involved:** `ProductCard`, `SiteHeader`, `SiteFooter`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Connect directly to MongoDB `Product` model for inventory, images, and server-side product loading.

## Categories

- **Purpose:** Shows product categories and category-specific product grids.
- **Status:** Complete as local-data UI.
- **Dependencies:** `lib/products.js`
- **Entry points:** Header `Categories` link.
- **Routes involved:** `/categories`, `/categories/[slug]`
- **Components involved:** `PageShell`, `ProductCard`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Fetch categories dynamically from MongoDB products.

## Collections

- **Purpose:** Provides collection landing pages and collection detail grids.
- **Status:** Complete as static/local-data UI.
- **Dependencies:** Static collection data in `app/collections/page.js`, local products in `lib/products.js`.
- **Entry points:** Header `Collections` link.
- **Routes involved:** `/collections`, `/collections/[slug]`
- **Components involved:** `PageShell`, `ProductCard`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Model collections as real data in MongoDB and map products to collections.

## Search And Filtering

- **Purpose:** Lets users search products by keyword and semantic relevance, and filter by category, price, and sort order. The header search input provides typeahead suggestions.
- **Status:** Complete as backend-backed hybrid search (keyword + semantic via NVIDIA embeddings).
- **Dependencies:** `useSearchParams`, `useState`, `useEffect`, `/api/search`, `/api/search/autocomplete`, MongoDB `Product` model.
- **Entry points:** Header search redirects to `/search?q=...`; typeahead suggestions navigate directly to product pages; direct URL params are read on `/search`.
- **Routes involved:** `/search`
- **Components involved:** `ProductCard`, `SiteHeader`, `SiteFooter`
- **API usage:** `GET /api/search/autocomplete?q=...` for the header typeahead; `GET /api/search?q=&category=&maxPrice=&sort=` for the results page.
- **Database usage:** Queries the Mongoose `Product` model; ranking uses the stored `embedding` arrays at request time.
- **Known future improvements:** MongoDB-native vector search once vector-index support in the deployment is verified; incremental re-embedding when admin product CRUD becomes the canonical catalog workflow.

## Wishlist

- **Purpose:** Displays the logged-in user's saved products, persisted per user in MongoDB.
- **Status:** Backend-backed; persisted per user via the `User.wishlist` slug array.
- **Dependencies:** `PageShell`, `ProductCard`, `/api/wishlist`, MongoDB `User` model, NextAuth session.
- **Entry points:** Header wishlist link.
- **Routes involved:** `/wishlist`
- **Components involved:** `PageShell`, `ProductCard`
- **API usage:** `GET /api/wishlist` on mount (401 redirects to `/auth/login`); `POST /api/wishlist/toggle` from the `ProductCard` heart button. `ProductCard` also fetches `GET /api/wishlist` on mount to initialize the heart's filled/outline state.
- **Database usage:** Reads the `wishlist` slug array from the authenticated user's MongoDB document.
- **Known future improvements:** Wishlist count badge in header; sync the static heart button on `/products/[slug]` with the toggle API.

## Cart

- **Purpose:** Displays cart items, quantity controls, removal, subtotal, shipping, and total calculations.
- **Status:** Client-side prototype.
- **Dependencies:** `useState`, `lib/products.js`
- **Entry points:** Header cart link.
- **Routes involved:** `/cart`
- **Components involved:** `SiteHeader`, `SiteFooter`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Connect add-to-cart buttons, persist cart state to DB or session, and route checkout from the primary action.

## Checkout

- **Purpose:** Shows contact, shipping, payment, and order-summary form UI. Authenticated users can pick a saved address or enter one manually and optionally save it to their account.
- **Status:** UI with manual address entry; authenticated users get a saved-address selector and save-to-account convenience (payment still flows through Razorpay as before).
- **Dependencies:** `PageShell`, shadcn-style `Input` and `Button`, `/api/account/addresses/fetch`, `/api/account/addresses/save`, `/api/payment/*`.
- **Entry points:** `/checkout`, `/checkout/success`
- **Routes involved:** `/checkout`, `/checkout/success`
- **Components involved:** `PageShell`
- **API usage:** `GET /api/account/addresses/fetch` on mount to detect auth and load saved addresses; `POST /api/account/addresses/save` (best-effort) when "Save this address to my account" is checked; existing `/api/payment/create-order`, `/api/payment/verify`, `/api/payment/success` flow. A selected saved address is mapped into the same `{ fullName, phone, street, city, postalCode }` shippingAddress shape the manual form sends.
- **Database usage:** Reads/writes the authenticated user's `addresses` subdocuments; orders are created by `/api/payment/success`.
- **Known future improvements:** Add validation, payment provider integration, order creation, and server-side security controls.

## Orders

- **Purpose:** Shows order history and order detail screens.
- **Status:** Dynamic orders list under Account section; detail screens transitioning to backend.
- **Dependencies:** `app/account/orders/page.js`, `app/api/account/orders/route.js`, MongoDB `Order` model, NextAuth session.
- **Entry points:** `/orders`, account order links.
- **Routes involved:** `/orders`, `/orders/[id]`, `/account/orders`
- **Components involved:** `PageShell`, order card layouts.
- **API usage:** Fetch user order history via `/api/account/orders`.
- **Database usage:** Queries Mongoose `Order` model.
- **Known future improvements:** Fetch individual order details on `/orders/[id]` from backend/database.

## Account

- **Purpose:** Provides customer account screens for overview, profile, addresses, security, orders, and notifications.
- **Status:** Initial integration.
- **Dependencies:** `app/account/layout.js`, `NavLink`.
- **Entry points:** Header account link and account subnavigation.
- **Routes involved:** `/account`, `/account/addresses`, `/account/security`, `/account/orders`, `/account/notifications`
- **Components involved:** `SiteHeader`, `SiteFooter`, `NavLink`
- **API usage:** NextAuth session usage.
- **Database usage:** Fetch user information via NextAuth session.
- **Known future improvements:** Full dynamic data fetching for user profile, address management.

## Authentication UI

- **Purpose:** Provides login, signup, password reset, verification, and success screens.
- **Status:** Integrated with backend.
- **Dependencies:** `AuthCard`, `PasswordInput`, `SocialAuthButtons`, `VerificationWrapper`, `OtpInput`, NextAuth
- **Entry points:** `/auth/login`, `/auth/signup`, `/auth/reset-password`, `/auth/verify`, `/auth/success`
- **Routes involved:** Auth routes listed above.
- **Components involved:** Auth shared components.
- **API usage:** Custom auth handlers (`/api/auth/login`, `/api/auth/signup`) and NextAuth.
- **Database usage:** Mongoose `User` model handles checking/creating users.
- **Known future improvements:** Finalize email/OTP delivery via `lib/mailer.js`.

## Admin

- **Purpose:** Presents admin dashboard and management screens for products, orders, customers, inventory, analytics, and settings.
- **Status:** Static UI prototype.
- **Dependencies:** `app/admin/layout.js`, `NavLink`, local hardcoded arrays, `lib/products.js`
- **Entry points:** `/admin`
- **Routes involved:** `/admin`, `/admin/products`, `/admin/products/new`, `/admin/products/[id]`, `/admin/orders`, `/admin/customers`, `/admin/inventory`, `/admin/analytics`, `/admin/settings`
- **Components involved:** Admin layout/sidebar, shadcn-style form controls.
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Protect admin routes via NextAuth roles, CRUD APIs for products and orders directly via Mongoose.

## Informational Pages

- **Purpose:** Provides static content for brand, support, and legal pages.
- **Status:** Complete as static UI.
- **Dependencies:** `PageShell`
- **Entry points:** Footer and direct routes.
- **Routes involved:** `/about`, `/contact`, `/faq`, `/privacy`, `/terms`
- **Components involved:** `PageShell`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Replace placeholder/legal copy with reviewed final content and connect contact form submission.
