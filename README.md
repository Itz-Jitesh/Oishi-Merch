# Oishi Merch

Oishi Merch is a frontend-only anime merchandise storefront prototype built with Next.js App Router.

The current app includes public storefront pages, product/category/collection browsing, local search and filtering, wishlist, cart, checkout UI, order pages, account pages, authentication UI, and an admin UI. It does not currently include a backend, database, API endpoints, implemented authentication, payment processing, or persistence.

## Getting Started

Install dependencies, then run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` builds the app.
- `npm run start` starts the production server after a build.
- `npm run lint` runs ESLint.

## Tech Stack

- Next.js 16.2.11
- React 19.2.4
- JavaScript
- Tailwind CSS v4
- shadcn-style UI primitives
- lucide-react icons

## Documentation

The repository context files document the verified current state:

- `PROJECT_STATE.md`
- `CURRENT_ARCHITECTURE.md`
- `FEATURES.md`
- `DATABASE.md`
- `API.md`
- `ROADMAP.md`
- `KNOWN_DECISIONS.md`

## Current Limitations

- Product and order data is hardcoded.
- Cart and notification state is in memory only.
- Auth forms and social auth buttons do not submit to a real auth system.
- Checkout and admin forms do not persist data.
- No API routes or database exist yet.
