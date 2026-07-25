# Current Architecture

**Last updated:** 2026-07-24

## Overview

Oishi Merch is implemented as a Next.js 16 App Router frontend application. It uses JavaScript React components, Tailwind CSS v4, local arrays for product/order data, and shadcn-style UI primitives.

There is no implemented backend, database, authentication system, or API layer.

## Folder Structure

- `app/` contains Next.js App Router layouts, pages, error, and not-found UI.
- `app/auth/` contains UI-only authentication pages and auth layout.
- `app/account/` contains the account layout and account subpages.
- `app/admin/` contains the admin layout and admin subpages.
- `components/` contains shared application components.
- `components/ui/` contains reusable shadcn-style UI primitives.
- `hooks/` contains custom React hooks.
- `lib/` contains general utilities and local product/order data.
- `public/` contains default static SVG assets from the Next.js scaffold.

## Routing Structure

Implemented pages:

- `/`
- `/about`
- `/account`
- `/account/addresses`
- `/account/notifications`
- `/account/orders`
- `/account/profile`
- `/account/security`
- `/admin`
- `/admin/analytics`
- `/admin/customers`
- `/admin/inventory`
- `/admin/orders`
- `/admin/products`
- `/admin/products/[id]`
- `/admin/products/new`
- `/admin/settings`
- `/auth/login`
- `/auth/reset-password`
- `/auth/signup`
- `/auth/success`
- `/auth/verify`
- `/cart`
- `/categories`
- `/categories/[slug]`
- `/checkout`
- `/collections`
- `/collections/[slug]`
- `/contact`
- `/faq`
- `/orders`
- `/orders/[id]`
- `/privacy`
- `/products`
- `/products/[slug]`
- `/search`
- `/terms`
- `/wishlist`

Special App Router files:

- `app/layout.js` defines global metadata, font setup, body layout, global CSS, and the Sonner toaster.
- `app/error.js` defines a global error UI.
- `app/not-found.js` defines a global not-found UI.
- `app/account/layout.js` wraps account pages with store header/footer and account navigation.
- `app/admin/layout.js` wraps admin pages with a fixed admin sidebar.
- `app/auth/layout.js` wraps auth pages.

## Data Flow

- `lib/products.js` exports `PRODUCTS`, `CATEGORIES`, and `ORDERS`.
- Catalog, category, wishlist, cart, inventory, account orders, product detail, and some order pages consume local data directly.
- The home page defines separate local arrays for hero slides, categories, products, reviews, and occasions.
- Search reads URL query parameters with `useSearchParams`, then filters local products in client state.
- Product detail, category detail, collection detail, order detail, and admin product edit pages read dynamic path params with `useParams`.
- Cart quantities and notification toggles are held in component-local `useState`.

## Component Relationships

- `SiteHeader` and `SiteFooter` provide the public store frame.
- `PageShell` composes common public-page layout with header, footer, title, subtitle, and width controls.
- `ProductCard` renders local product records.
- `NavLink` wraps Next.js links and applies active styles via `usePathname`.
- `AuthCard`, `AuthIllustration`, `PasswordInput`, `OtpInput`, `SocialAuthButtons`, and `VerificationWrapper` support auth screens.
- `components/ui/*` provides reusable UI primitives used by pages and shared components.

## Authentication

No authentication mechanism is implemented. Auth pages are visual forms only. There is no session handling, cookie handling, middleware, protected route guard, backend validation, OAuth provider integration, or admin authorization.

## Backend

No backend structure is implemented. There are no API route handlers, services, repositories, server actions, models, or persistence modules.

## Services And Data Access

No service layer or repository/data-access layer is implemented. All current product and order data is imported from `lib/products.js` or declared inline in page files.

## State Management

State management is local React state only. The repository does not currently use a global state store or server-state library in the implemented code.

## Styling

Styling is handled with Tailwind CSS v4 utility classes and CSS variables in `app/globals.css`. The project uses Bricolage Grotesque for display text and Inter for body text via `next/font/google`.

## External Assets

The home page references remote Unsplash image URLs directly in `img` tags. Product catalog cards use CSS gradients based on each product's local `color` property.
