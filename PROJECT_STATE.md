# Project State

**Last updated:** 2026-07-24

## Current Phase

Oishi Merch is a static, frontend-only e-commerce prototype built with Next.js App Router. The repository currently implements storefront, account, auth, order, checkout, and admin UI screens using local hardcoded data and client-side state.

## Completed Features

- Public storefront home page at `/` with a rotating hero, category cards, product carousel, review band, occasion links, and newsletter-style content.
- Product catalog at `/products` with client-side category filtering.
- Product detail pages at `/products/[slug]` backed by local product data.
- Category listing and category detail pages at `/categories` and `/categories/[slug]`.
- Collection listing and collection detail pages at `/collections` and `/collections/[slug]`.
- Search page at `/search` with local query, category, price, and sort filtering.
- Wishlist page at `/wishlist` with a static subset of local products.
- Cart page at `/cart` with local quantity adjustment, removal, subtotal, shipping, and total calculations.
- Checkout page at `/checkout` with static contact, shipping, payment, and order summary UI.
- Static order list and detail pages at `/orders` and `/orders/[id]`.
- Account area with layout navigation and pages for overview, profile, addresses, security, orders, and notifications.
- Auth UI pages for login, signup, reset password, verification, and success flows.
- Admin UI area with dashboard, products, product create/edit forms, orders, customers, inventory, analytics, and settings pages.
- Static informational pages for about, contact, FAQ, privacy, and terms.
- Shared shell, header, footer, product card, auth, password, OTP, nav-link, and shadcn-style UI primitives.

## In-Progress Work

- Authentication pages exist as forms, but submit handlers and social auth handlers are TODO/no-op.
- Checkout and admin forms render and prevent default submission, but do not persist or submit data.
- Cart and notification settings use in-memory React state only.

## Blocked Work

- Real authentication is blocked because no auth provider, session strategy, middleware, protected route checks, or backend auth endpoints are implemented.
- Real checkout is blocked because no payment provider, order API, persistence layer, or server-side validation is implemented.
- Real admin management is blocked because there are no API endpoints, database models, or authorization checks.

## Missing Systems

- No `app/api/**/route.*` files are present.
- No database schema, migrations, models, repositories, or persistence layer are present.
- No middleware file is present.
- No environment example file is present.
- No automated tests are present.
- No real image asset pipeline is used for products; catalog cards use gradients from product color values, while the home page uses remote Unsplash image URLs.

## Backend Status

No backend is currently implemented. The application has no route handlers, server actions, services, repositories, or database integration.

## Frontend Status

The frontend is implemented with Next.js 16 App Router, React 19, JavaScript files, Tailwind CSS v4, lucide-react icons, and shadcn-style UI components. Most pages are static or client-side interactive prototypes.

## Authentication Status

Authentication is UI-only. Login, signup, reset-password, verification, and success pages exist, but there is no real login, signup, password reset, OTP verification, session storage, route protection, or role handling.

## Deployment Status

No deployment configuration is implemented beyond default Next.js configuration files. The README still references the default Next.js/Vercel deployment workflow.

## Testing Status

No test framework, test files, or test script are currently present. The available quality script is `npm run lint`.

## Known Issues

- Header cart badge is hardcoded to `2` and is not connected to cart state.
- Home page product/category data duplicates and differs from `lib/products.js`.
- Cart, checkout, account, auth, and admin state is not persisted.
- Admin and account routes are not protected.
- Product detail route uses product IDs as slugs.
- Several forms prevent default submission without saving or sending data.
- `KNOWN_DECISION.md` existed with the wrong singular filename; `KNOWN_DECISIONS.md` has been added as the canonical decision file.

## Current Technical Debt

- Replace hardcoded local data with a documented data source when backend requirements are known.
- Add API, database, auth, and validation layers before treating the app as production e-commerce.
- Add tests for shared components and client-side behavior.
- Consolidate product data sources so the home page and catalog use one verified source.
