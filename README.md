# Oishi Merch

**My very first full-stack web application** — a complete anime merchandise storefront with a fully integrated payment, authentication, and ordering system.

Built with the Next.js App Router, Oishi Merch lets users browse a catalog of anime merchandise, search and filter products, maintain a wishlist and cart, sign up and sign in securely, place orders, and pay online — with full account, order, and admin management on the backend.

## Features

- **Storefront:** Product catalog, categories, collections, search, and filtering.
- **Auth:** Full signup, login, email verification, password reset, and session handling.
- **Commerce:** Cart, wishlist, checkout, and online payment processing.
- **Ordering:** Order creation, tracking, and management.
- **Account:** Profile, addresses, orders, notifications, and security settings.
- **Admin:** Product, inventory, customer, order, analytics, and settings management.
- **Backend:** REST API routes, a database layer, and server-side logic.

## Getting Started

Install dependencies, then run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The app requires environment variables for its database, authentication secret, and payment provider. See your deployment configuration for the required values.

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

## Deployment

Designed to deploy to Vercel, with environment-variable-driven configuration for authentication, database, and payment services.
