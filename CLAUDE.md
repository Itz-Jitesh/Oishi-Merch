@AGENTS.md
<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# CLAUDE.md

This file mirrors the verified repository context for agents that read `CLAUDE.md`.

## Project Overview

- **Project name:** Oishi Merch
- **Current purpose:** Frontend-only anime merchandise storefront prototype.
- **Current scope:** Storefront, catalog, search, categories, collections, wishlist, cart, checkout UI, order UI, account UI, authentication UI, and admin UI.
- **Current limitation:** No backend, API endpoints, database, implemented authentication, payment processing, route protection, or persistence layer exists.

## Verified Tech Stack

- **Framework:** Next.js 16.2.11 with App Router.
- **Language:** JavaScript (`.js`, `.jsx`).
- **Runtime:** Node.js through Next.js scripts.
- **Package manager:** npm, based on `package-lock.json` and `package.json` scripts.
- **Styling:** Tailwind CSS v4.
- **Component primitives:** shadcn-style components in `components/ui`.
- **Icons:** lucide-react.
- **Fonts:** Bricolage Grotesque and Inter via `next/font/google`.

## Implemented Architecture

- `app/` contains App Router layouts and pages.
- `components/` contains shared app components.
- `components/ui/` contains reusable UI primitives.
- `lib/products.js` contains local products, categories, and sample orders.
- `lib/utils.js` contains `cn`.
- `hooks/use-mobile.js` contains the mobile breakpoint hook.
- No `app/api` route handlers are implemented.
- No `services`, `repositories`, `schemas`, `types`, `server`, `middleware`, or database model directories are implemented.

## Implemented Routes

- `/`
- `/about`
- `/account`
- `/account/addresses`
- `/account/notifications`
- `/account/orders`
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

## Current Data Model

The only shared product/order source is `lib/products.js`:

- `PRODUCTS`: 12 hardcoded product records with `id`, `name`, `price`, `category`, and `color`.
- `CATEGORIES`: `shirt`, `pant`, `hoodie`, `shoes`, `trouser`.
- `ORDERS`: 3 hardcoded sample orders.

Additional static arrays exist inline in some pages for homepage merchandising, admin views, customers, public order lists, analytics bars, FAQ items, addresses, and notification settings.

## Auth And Security Reality

Authentication is not implemented. Auth pages are UI only, and several handlers contain TODO comments. Account and admin pages are public routes in the current codebase.

## Backend And API Reality

There is no backend layer. Do not document APIs, services, repositories, route handlers, database schemas, auth callbacks, payment webhooks, or server actions as implemented until those files exist.

## Commands

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Documentation Rule

Use these canonical context files for current project state:

- `PROJECT_STATE.md`
- `CURRENT_ARCHITECTURE.md`
- `FEATURES.md`
- `DATABASE.md`
- `API.md`
- `ROADMAP.md`
- `KNOWN_DECISIONS.md`
