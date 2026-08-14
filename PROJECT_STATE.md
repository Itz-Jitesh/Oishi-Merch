# Project State

**Last updated:** 2026-08-14

## Current Phase

The project is currently transitioning from a static/client-side UI prototype to a full-stack Next.js application backed by MongoDB. Authentication has been implemented using NextAuth.

## Completed Features

- Responsive shell layout (header, footer, navigation).
- UI component library integration (shadcn/ui via Radix).
- All primary consumer-facing and admin-facing pages built with mock data.
- **Authentication**: Backend setup with NextAuth, MongoDB integration, credential and Google OAuth strategies.
- **Database Connection**: MongoDB connection caching and models for User and Product established.
- **Security Page**: Conditional UI rendering for Google OAuth accounts (showing Google auth status card) vs email/password accounts (showing password change form), enforced at both client and API route levels.
- **Order History**: Dynamic client-side order history retrieval under `/account/orders` page using `useEffect` calling a separate `/api/account/orders` API.
- **Hybrid Search**: Server-backed hybrid product search (keyword + semantic) using NVIDIA embeddings. Embeddings are generated for products only, at seed time, and stored in the existing `Product.embedding` field. Public `/api/search` and `/api/search/autocomplete` endpoints, a header typeahead dropdown, and an API-backed `/search` results page.
- **Wishlist Persistence**: Per-user wishlist stored as a slug array on the MongoDB `User` document. `GET /api/wishlist` returns resolved catalog items, `POST /api/wishlist/toggle` adds/removes a slug (and keeps `wishlistCount` in sync), the `ProductCard` heart button toggles wishlist state, and `/wishlist` renders the user's saved items with an empty state.
- **Checkout Saved Addresses**: `/checkout` detects the logged-in user, lets them select a saved address (fetched from `/api/account/addresses/fetch`) or enter one manually, and offers a "Save this address to my account" checkbox that best-effort POSTs to `/api/account/addresses/save`. Selected saved addresses are mapped into the same `{ fullName, phone, street, city, postalCode }` shippingAddress shape the manual form sends.

## In Progress

- Connecting static/mocked pages (like product catalogs and carts) to the actual MongoDB data via Mongoose.
- Integrating authentication sessions into the UI, restricting admin routes and tying user accounts to orders.
- Moving from client-side state models for things like Cart to backend/database persistence.
- Populating the new NVIDIA embedding env vars (`.env` placeholders added) and re-seeding products so semantic search returns ranked results.

## Blocked Work

None known at this time.

## Missing Systems

- Payment gateway integration.
- Order processing system.
- Email delivery infrastructure (though structure exists in `lib/mailer.js`).
- Image upload and storage solution (currently referencing remote/local static URLs).

## Current Status by Domain

### Backend Status
The MongoDB connection is robust and schemas are defined for core entities (User, Product). The NextAuth backend has been configured to support Credentials (with bcrypt) and Google OAuth. Public search API routes exist under `app/api/search/` and serve hybrid keyword + semantic results using stored product embeddings. Some core API routes are scaffolded under `app/api/auth/`.

### Frontend Status
Frontend is primarily built and structured as Server Components by default where applicable, with client-side interactivity where needed. Many pages currently rely on mock data in `lib/products.js` or inline arrays. A mobile usability pass (2026-08-14) removed horizontal overflow on small screens, brought header/icon tap targets to 44px, added the typeahead dropdown to the mobile header search panel, made the search filters panel collapsible on mobile, and added a native mobile nav menu to the admin layout.

### Authentication Status
Configured securely via NextAuth utilizing JSON Web Tokens (JWT) for session strategy. Includes database persistence for users, supporting both email/password with verification OTPs and OAuth (Google).

### Deployment Status
Designed to be deployed on Vercel or any Node.js environment supporting Next.js. Currently running in a local development environment. Environment variables for MongoDB and NextAuth must be configured for deployment.

### Testing Status
No automated tests are currently implemented. 

### Current Known Issues
- **Production auth (Vercel): login never persists** — TWO root causes, both fixed. (1) Env: Vercel had `NEXTAUTH_URL=http://localhost:3000`, so post-login redirects went to localhost; removed from Vercel env + redeployed. (2) Code: `proxy.js` middleware called `getToken()` without `secureCookie`, so it looked for the unprefixed `authjs.session-token` while production writes `__Secure-authjs.session-token` (NextAuth v5 prefixes on HTTPS) and used the wrong JWT salt — authenticated users were bounced from protected routes. Fixed by passing `secureCookie: process.env.VERCEL === "1" || req.url.startsWith("https://")`. Requires a redeploy to take effect. Login now creates the session cookie on `oishi-merch.vercel.app` (confirmed in browser).
- UI still relies heavily on mock data, leading to a disconnect between the Database and the Frontend representation in some areas.
- `/search` and the header typeahead now read from the MongoDB `Product` collection, while most other storefront pages (product catalog, home, collections) still use local arrays from `data/product.js`; catalog edits require a re-seed to be reflected in search. The wishlist resolves product slugs against the same local `data/product.js` catalog for consistency with `/products/[slug]`.
- Semantic search requires `NVIDIA_API_KEY`, `NVIDIA_EMBEDDING_MODEL`, and `NVIDIA_EMBEDDING_URL` (currently empty placeholders) and a successful seed with embeddings.

### Technical Debt
- Discrepancy between implemented backend models (`models/product.js`) and frontend consumption (still using `lib/products.js` mocked data).
