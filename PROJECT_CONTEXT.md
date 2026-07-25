# Project Context

**Last updated:** 2026-07-24

## Project Name

Oishi Merch

## Purpose

Oishi Merch is a modern anime merchandise storefront prototype. The implemented app focuses on product discovery, storefront presentation, cart and checkout UI, account pages, auth screens, and admin management screens.

## Current Reality

The current repository is frontend-only. It has no implemented backend, API endpoints, database, authentication, payment integration, or persistence layer. Data is local to JavaScript files and React component state.

## Verified Tech Stack

- Next.js 16.2.11 with App Router.
- React 19.2.4 and React DOM 19.2.4.
- JavaScript source files (`.js` and `.jsx`).
- Tailwind CSS v4.
- shadcn-style UI primitives in `components/ui`.
- lucide-react icons.
- Sonner toaster mounted in the root layout.
- Bricolage Grotesque and Inter via `next/font/google`.

## Product Data

`lib/products.js` defines:

- 12 products.
- 5 categories: `shirt`, `pant`, `hoodie`, `shoes`, `trouser`.
- 3 sample orders.

## Important Boundaries

- Do not describe MongoDB, Mongoose, Better Auth, TanStack Query, API routes, services, repositories, or middleware as implemented unless those files are added.
- Do not treat auth/account/admin routes as protected. They are currently public UI routes.
- Do not treat checkout or admin forms as functional beyond rendering and preventing default submission.

## Useful Commands

- `npm run dev` starts the Next.js development server.
- `npm run build` builds the app.
- `npm run start` starts the production server after a build.
- `npm run lint` runs ESLint.
