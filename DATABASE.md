# Database

**Last updated:** 2026-07-24

No database is currently implemented.

## Current Persistence

- Product, category, and sample order data is stored in JavaScript arrays in `lib/products.js`.
- Some pages define additional local arrays inline, such as home page merchandising data, admin orders, customers, analytics bars, and public order lists.
- Cart state and notification preference state are stored only in component memory with React `useState`.
- Form inputs are not persisted.

## Schemas

No tables, collections, schemas, migrations, indexes, constraints, models, or validation schemas are implemented.

## Relationships

No database relationships are implemented.

## Data Access Pattern

No repository or data-access abstraction exists. Pages import local arrays directly.

## Required Future Decisions

Before adding persistence, decide and document:

- Database technology.
- Product, category, collection, customer, cart, order, inventory, and admin user schemas.
- Validation strategy.
- Migration or schema-management strategy.
- Server-side access pattern and ownership boundaries.
