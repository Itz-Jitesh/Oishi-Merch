# API

**Last updated:** 2026-07-24

No application API endpoints are currently implemented.

## Verified Route Handlers

There are no `app/**/route.*` files in the repository. No REST, RPC, server action, webhook, auth callback, payment, product, cart, order, user, or admin endpoints exist today.

## Current Data Access

Pages import local JavaScript arrays directly from `lib/products.js` or define hardcoded data inline. Forms either prevent default submission or contain TODO handlers.

## Authentication Requirements

No API authentication requirements are defined because there are no APIs and no authentication mechanism is implemented.

## Future API Documentation Requirements

When endpoints are added, document each one with:

- HTTP method and path.
- Authentication and authorization requirements.
- Request shape.
- Response shape.
- Error responses.
- Status codes.
- Dependencies such as services, repositories, and database entities.
