# Vector Search Feature Details

**Created:** 2026-08-14
**Purpose:** Planning reference for adding a new vector search feature to Oishi Merch. This file records the current verified codebase details needed before implementation.

## Verified Tech Stack

- **Frontend framework:** Next.js App Router with React.
- **Frontend language:** JavaScript. The project uses `.js` and `.jsx` files, not TypeScript.
- **Backend framework/language:** Next.js Route Handlers under `app/api/**/route.js`, running in JavaScript.
- **Database:** MongoDB via Mongoose.
- **Authentication:** NextAuth/Auth.js using i am using /auth.js file for both manual email+password login and also google Oauth, no custom jwt sessions 
- **Styling/UI:** Tailwind CSS v4, Radix UI/shadcn-style components, lucide-react icons.
- **Package manager:** npm, with `package-lock.json` present.

## Current Relevant Folder/File Structure

```text
.
├── app/
│   ├── api/
│   │   ├── account/
│   │   ├── auth/
│   │   ├── cart/
│   │   └── payment/
│   ├── search/page.js
│   ├── products/page.js
│   ├── products/[slug]/page.js
│   ├── categories/
│   ├── collections/
│   ├── admin/
│   ├── account/
│   ├── layout.js
│   ├── providers.js
│   └── globals.css
├── components/
│   ├── SiteHeader.jsx
│   ├── ProductCard.jsx
│   ├── PageShell.jsx
│   └── ui/
├── data/
│   ├── product.js
│   ├── orders.js
│   └── reviews.js
├── hooks/
│   └── use-mobile.js
├── lib/
│   ├── db/connect.js
│   ├── seed/product.js
│   ├── jwt/
│   ├── mailer.js
│   ├── addresses.js
│   └── utils.js
├── models/
│   ├── product.js
│   ├── users.js
│   └── orders.js
├── scripts/
│   └── seed.js
├── auth.js
├── proxy.js
├── package.json
├── eslint.config.mjs
├── next.config.mjs
├── jsconfig.json
└── components.json
```

## State Management

- The search page at `app/search/page.js` is a client component and uses local React `useState` for:
  - `query`
  - selected categories
  - max price
  - sort order
- URL query params are read with `useSearchParams`.
- `SiteHeader.jsx` keeps its own local `useState` for header search input and redirects to `/search?q=<query>` on Enter.
- `app/providers.js` wraps the app with `SessionProvider` and a currently empty `CartContext.Provider value={{}}`.
- No global state library such as Redux, Zustand, or Jotai is installed or used.

## Authentication And Authorization

- Auth is configured in `auth.js` using NextAuth/Auth.js.
- Providers:
  - Google OAuth.
  - Credentials login with email/password and bcrypt password comparison.
- Session strategy is JWT.
- JWT/session callbacks attach `id`, `role`, `provider`, and `emailVerified` to the user session.
- MongoDB user records are stored through `models/users.js`.
- `proxy.js` redirects unauthenticated users to `/auth/login` for:
  - `/account/:path*`
  - `/checkout/:path*`
  - `/admin/:path*`
  - `/order/:path*`
  - `/wishlist/:path*`
  - `/cart/:path*`
- `app/admin/layout.js` additionally calls `auth()` and returns `notFound()` unless `session.user.role === "admin"`.
- Current storefront search at `/search` is public and does not scope results per user.

## Existing Search Implementation

- Current search lives in `app/search/page.js`.
- It imports `PRODUCTS` and `CATEGORIES` from `@/data/product`.
- It runs entirely in the browser.
- Matching is currently exact substring matching on product name only:

```js
p.name.toLowerCase().includes(query.toLowerCase())
```

- It also filters by selected category and max price.
- Sorting supports:
  - `popular` (current data order; no explicit score sort)
  - `price-asc`
  - `price-desc`
- There is no verified SQL `LIKE`, Elasticsearch, Algolia, MongoDB text search, or vector search endpoint currently implemented.
- `FEATURES.md` already lists vector search as a future improvement for Search And Filtering.

## Product Data And Embedding-Relevant Fields

Two product sources currently exist:

- `data/product.js`: active local product array used by storefront/search/admin pages.
- `models/product.js`: Mongoose Product schema intended for MongoDB-backed products.

The current local catalog has:

- **Product count:** 40
- **Category count:** 8
- **Categories:** T-Shirts, Hoodies, Accessories, Posters, Stickers, Figures, Drinkware, Stationery
- **Collections:** 4

Product fields in both the local data and Mongoose schema include:

- `name`
- `slug`
- `description`
- `price`
- `category`
- `keywords`
- `embedding`
- `images`
- `stock`
- `rating`
- `reviewCount`

The Mongoose Product schema defines:

```js
keywords: {
  type: [String],
  default: [],
},

embedding: {
  type: [Number],
  default: [],
},
```

Important current-state detail:

- `keywords` and `embedding` are already modeled, but local product records currently have empty arrays for both.
- `data/reviews.js` exists, but current search does not use review text.
- Product images are referenced as static paths, but there is no verified image embedding pipeline.

## Vector-Search-Specific Answers

### What Are We Embedding?

Verified current model support exists for product-level text embeddings through `Product.embedding`.

Recommended initial embedding payload based on current fields:

- `name`
- `description`
- `category`
- `keywords` once populated

Not currently verified or implemented:

- Image embeddings.
- Review embeddings.
- User-personalized embeddings.
- Collection-level embeddings.

### Vector DB Choice

No separate vector database is currently installed or configured.

Current database is MongoDB. Since `models/product.js` already has an `embedding: [Number]` field, the least disruptive starting point is to evaluate MongoDB vector search if the deployed MongoDB environment supports vector indexes. Otherwise, the vector DB choice is still open.

No verified pgvector, Pinecone, Weaviate, Qdrant, Chroma, Elasticsearch, Algolia, or Meilisearch dependency exists in `package.json`.

### Embedding Model/Provider

No embedding provider is currently implemented.

No OpenAI, Cohere, Hugging Face, or local embedding package/API client is installed in `package.json`.

This is an open decision before implementation. Adding any provider will require:

- A package/API integration decision.
- Environment variables for provider credentials if using a hosted model.
- Documentation updates for the new env vars.

### Where Search Should Surface

Verified current search entry points:

- Header search input in `components/SiteHeader.jsx`, redirecting to `/search?q=...`.
- Search page at `app/search/page.js`.

Most natural implementation target:

- Upgrade `/search` to call a server-backed semantic search API while preserving existing filters and sort UI where practical.

Additional possible surface:

- Product detail pages could later add "similar products" using stored embeddings, but this is not currently implemented.

### Data Volume And Catalog Change Frequency

Verified current local data volume:

- 40 products in `data/product.js`.

Catalog change frequency is not documented in the repository.

Current implications:

- Full re-embedding on seed/import is feasible at the current scale.
- Incremental re-indexing should be designed later if admin product CRUD becomes the canonical catalog workflow.

### Existing Search To Sit Alongside Or Replace

Current search is client-side name substring search.

A vector search feature can either:

- Replace the current result calculation in `app/search/page.js` with API-backed semantic results.
- Sit alongside it as a hybrid search approach that combines semantic score with existing filters.

Given the current UI already supports filters and sort controls, a hybrid approach is likely the safest product behavior, but this is not yet an implemented decision.

## Existing Conventions To Follow

- Use App Router route handlers in `app/api/**/route.js` for backend endpoints.
- Use Mongoose models from `models/` for MongoDB documents.
- Use `connectDB` from `lib/db/connect.js` before database access.
- Use `@/*` path aliases from `jsconfig.json`.
- Keep React components in JavaScript/JSX, matching existing `.js` and `.jsx` usage.
- Use Tailwind utility classes through `className`.
- Use shadcn/Radix-style primitives from `components/ui` where applicable.
- Use lucide-react icons when icons are needed.
- Use `cn` from `lib/utils.js` for conditional class merging.
- Follow existing ESLint setup from `eslint.config.mjs`, based on `eslint-config-next/core-web-vitals` with project-specific rule overrides.
- Do not introduce a new major dependency or external service without an explicit decision.

## Files/Modules To Avoid Touching Without Explicit Need

No user-specific off-limits files were found in repository documentation.

Based on repo governance and current architecture, avoid changing these unless directly required for vector search:

- `AGENTS.md`: governance file; amendments require explicit maintainer agreement.
- Historical entries in `CHANGELOG.md` and `KNOWN_DECISIONS.md`: append only.
- Auth strategy files such as `auth.js`, `proxy.js`, and auth API routes unless vector search becomes user-scoped or admin-only.
- Payment routes under `app/api/payment/`.
- Account/order routes unrelated to search.
- Existing product/cart/admin behavior unless the vector search implementation explicitly requires integration.

## Open Decisions Before Implementation

- Which embedding provider/model should be used.
- Whether MongoDB vector search is available in the target MongoDB deployment or whether a separate vector DB should be introduced.
- Whether semantic search should replace current search or be hybrid with exact matching and filters.
- Whether embeddings should be generated only for products or also for images/reviews/collections.
- Whether embedding generation happens during seed/import, during admin product save, by a script, or by a background job.
- How to handle products with empty embeddings during migration.
- Whether admin product CRUD should become the canonical trigger for re-indexing once those screens are connected to APIs.
I will be using NVIDIA's embedding model with NVIDIA as a provider, and no, I will not be using any separate MongoDB collections whatsoever. I will be embedding the embeddings indirectly in the models collection or products collection in MongoDB. Each product is being seeded in the MongoDB with an array named `embeddings`, so I will be feeding the array there using NVIDIA's embedding model.

Keyword search should not completely replace it. I want it in such a way that when the user starts typing, there should be a dropdown which uses keyword search or name search. When the user finally clicks ENTER there, the user will be transported or redirected to a new page, which is the search results. There, the user will find the keyword search plus the semantic search, and mixed data are then sent back to the product as a result.

The embedding should be generated only for the products, as there are no images, reviews, or collections right now. Just for products, the embedding generation should happen during the seeding process. 