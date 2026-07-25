# Features

**Last updated:** 2026-07-24

## Storefront Home

- **Purpose:** Presents the Oishi Merch brand, featured drops, categories, products, reviews, and shopping entry points.
- **Status:** Complete as static/client-side UI.
- **Dependencies:** `SiteHeader`, `SiteFooter`, local arrays inside `app/page.js`, lucide-react icons.
- **Entry points:** `/`
- **Routes involved:** `/`
- **Components involved:** `HeroLoop`, `ProductCarousel`, `SiteHeader`, `SiteFooter`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Use the canonical product data source, replace hardcoded hero/category/product content with managed content, and connect CTAs to real collection/category destinations.

## Product Catalog

- **Purpose:** Lets users browse all products and filter by category.
- **Status:** Complete as local-data UI.
- **Dependencies:** `lib/products.js`
- **Entry points:** Header `Shop` link and product links.
- **Routes involved:** `/products`, `/products/[slug]`
- **Components involved:** `ProductCard`, `SiteHeader`, `SiteFooter`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Add real slugs, inventory data, images, server-side product loading, and add-to-cart persistence.

## Categories

- **Purpose:** Shows product categories and category-specific product grids.
- **Status:** Complete as local-data UI.
- **Dependencies:** `lib/products.js`
- **Entry points:** Header `Categories` link.
- **Routes involved:** `/categories`, `/categories/[slug]`
- **Components involved:** `PageShell`, `ProductCard`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Add category metadata, images, SEO metadata, and not-found handling for unknown categories.

## Collections

- **Purpose:** Provides collection landing pages and collection detail grids.
- **Status:** Complete as static/local-data UI.
- **Dependencies:** Static collection data in `app/collections/page.js`, local products in `lib/products.js`.
- **Entry points:** Header `Collections` link.
- **Routes involved:** `/collections`, `/collections/[slug]`
- **Components involved:** `PageShell`, `ProductCard`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Model collections as real data and map products to collections.

## Search And Filtering

- **Purpose:** Lets users search products by name and filter by category, price, and sort order.
- **Status:** Complete as client-side local search.
- **Dependencies:** `useSearchParams`, `useState`, `lib/products.js`
- **Entry points:** Header search redirects to `/search?q=...`; direct URL params are read on `/search`.
- **Routes involved:** `/search`
- **Components involved:** `ProductCard`, `SiteHeader`, `SiteFooter`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Add server-backed search, URL synchronization for interactive filters, pagination, and richer product fields.

## Wishlist

- **Purpose:** Displays saved product-style items.
- **Status:** Static local-data UI.
- **Dependencies:** `lib/products.js`
- **Entry points:** Header wishlist link.
- **Routes involved:** `/wishlist`
- **Components involved:** `PageShell`, `ProductCard`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Persist wishlist per user and connect product detail wishlist actions.

## Cart

- **Purpose:** Displays cart items, quantity controls, removal, subtotal, shipping, and total calculations.
- **Status:** Client-side prototype.
- **Dependencies:** `useState`, `lib/products.js`
- **Entry points:** Header cart link.
- **Routes involved:** `/cart`
- **Components involved:** `SiteHeader`, `SiteFooter`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Connect add-to-cart buttons, persist cart state, share cart count with header, and route checkout from the primary action.

## Checkout

- **Purpose:** Shows contact, shipping, payment, and order-summary form UI.
- **Status:** UI-only; submit prevents default and does not create orders or payments.
- **Dependencies:** `PageShell`, shadcn-style `Input` and `Button`
- **Entry points:** `/checkout`
- **Routes involved:** `/checkout`
- **Components involved:** `PageShell`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Add validation, payment provider integration, order creation, and server-side security controls.

## Orders

- **Purpose:** Shows order history and order detail screens.
- **Status:** Static/local-data UI.
- **Dependencies:** Local hardcoded order arrays and `lib/products.js`
- **Entry points:** `/orders`, account order links.
- **Routes involved:** `/orders`, `/orders/[id]`, `/account/orders`
- **Components involved:** `PageShell`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Persist orders, authorize access, and fetch order line items by order ID.

## Account

- **Purpose:** Provides customer account screens for overview, profile, addresses, security, orders, and notifications.
- **Status:** Static/client-side UI.
- **Dependencies:** `app/account/layout.js`, `NavLink`, local state for notifications.
- **Entry points:** Header account link and account subnavigation.
- **Routes involved:** `/account`, `/account/profile`, `/account/addresses`, `/account/security`, `/account/orders`, `/account/notifications`
- **Components involved:** `SiteHeader`, `SiteFooter`, `NavLink`
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Add authentication, user persistence, form submission, and protected routes.

## Authentication UI

- **Purpose:** Provides login, signup, password reset, verification, and success screens.
- **Status:** UI-only; handlers are TODO/no-op.
- **Dependencies:** `AuthCard`, `PasswordInput`, `SocialAuthButtons`, `VerificationWrapper`, `OtpInput`
- **Entry points:** `/auth/login`, `/auth/signup`, `/auth/reset-password`, `/auth/verify`, `/auth/success`
- **Routes involved:** Auth routes listed above.
- **Components involved:** Auth shared components.
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Choose and implement auth provider, session storage, validation, email/OTP delivery, OAuth callbacks, and route protection.

## Admin

- **Purpose:** Presents admin dashboard and management screens for products, orders, customers, inventory, analytics, and settings.
- **Status:** Static UI prototype.
- **Dependencies:** `app/admin/layout.js`, `NavLink`, local hardcoded arrays, `lib/products.js`
- **Entry points:** `/admin`
- **Routes involved:** `/admin`, `/admin/products`, `/admin/products/new`, `/admin/products/[id]`, `/admin/orders`, `/admin/customers`, `/admin/inventory`, `/admin/analytics`, `/admin/settings`
- **Components involved:** Admin layout/sidebar, shadcn-style form controls.
- **API usage:** None.
- **Database usage:** None.
- **Known future improvements:** Add admin authentication/authorization, persistence, CRUD APIs, validation, and real analytics.

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
