# Roadmap

**Last updated:** 2026-07-24

This file lists future work only. Implemented static UI screens are documented in `FEATURES.md`.

## High Priority

- Decide and implement the backend architecture for products, categories, collections, carts, orders, users, and admin workflows.
- Choose and implement authentication, session handling, protected account routes, and admin authorization.
- Add a persistence layer and document the database schema in `DATABASE.md`.
- Add API route handlers or server actions for auth, catalog, cart, checkout, orders, account, and admin workflows.
- Replace UI-only form handlers with validated submit flows.
- Connect cart actions across product cards, product detail, header count, cart, and checkout.

## Medium Priority

- Consolidate duplicated merchandising/product data between `app/page.js` and `lib/products.js`.
- Add product images, real slugs, category metadata, collection-to-product mapping, and inventory fields.
- Add automated tests for shared components, search/filtering, cart calculations, and route behavior.
- Add not-found handling for unknown category, collection, order, and admin product IDs where missing.
- Add final legal/support copy for privacy, terms, FAQ, and contact pages.

## Lower Priority

- Add SEO metadata per product, category, collection, and informational page.
- Add sitemap and robots configuration when deployment targets are known.
- Add analytics only after privacy requirements are clarified.
- Replace remote `img` usage with the chosen image strategy.
