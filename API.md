# API

**Last updated:** 2026-08-14

The application now includes authentication API endpoints using NextAuth and custom route handlers.

## Verified Route Handlers

The following authentication API endpoints exist under `app/api/auth/`:

### `[...nextauth]`
- **Method**: GET, POST
- **Path**: `/api/auth/[...nextauth]`
- **Description**: NextAuth catch-all route for handling Google OAuth and standard NextAuth callbacks.
- **Dependencies**: NextAuth, Google Provider, MongoDB (User model).

### `/login`
- **Method**: POST (implied)
- **Path**: `/api/auth/login`
- **Description**: Custom credential login handler.
- **Dependencies**: MongoDB (User model), bcrypt.

### `/logout`
- **Method**: POST / GET (implied)
- **Path**: `/api/auth/logout`
- **Description**: Handles user logout and session invalidation.

### `/signup`
- **Method**: POST (implied)
- **Path**: `/api/auth/signup`
- **Description**: Handles new user registration via credentials. Creates a User in MongoDB.
- **Dependencies**: MongoDB (User model), bcrypt.

### `/verify`
- **Method**: POST
- **Path**: `/api/auth/verify`
- **Description**: Endpoint for verifying OTP/email tokens.

### `/resend`
- **Method**: POST
- **Path**: `/api/auth/resend`
- **Description**: Resends verification OTP/email.

## Account API Endpoints

The following account API endpoints exist under `app/api/account/`:

### `/overview`
- **Method**: GET
- **Path**: `/api/account/overview`
- **Description**: Fetches user overview metrics (loyalty points, wishlist count, order count).
- **Dependencies**: MongoDB (User and Order models).

### `/security`
- **Method**: POST
- **Path**: `/api/account/security`
- **Description**: Changes the password for email/password credentials-based accounts.
- **Dependencies**: MongoDB (User model), bcrypt, NextAuth session.

### `/orders`
- **Method**: GET
- **Path**: `/api/account/orders`
- **Description**: Fetches the authenticated user's order history.
- **Dependencies**: MongoDB (Order model), NextAuth session.

### `/addresses/fetch`
- **Method**: GET
- **Path**: `/api/account/addresses/fetch`
- **Description**: Lists the authenticated user's saved shipping addresses. Also used by `/checkout` to populate the "Select a saved address" mode.
- **Response**: `{ "addresses": [{ "_id": string, "name": string, "phone": string, "addressLine1": string, "addressLine2": string, "city": string, "state": string, "postalCode": string, "country": string, "isDefault": boolean }] }`.
- **Authentication**: Required (401 otherwise).
- **Dependencies**: MongoDB (User model), NextAuth session.

### `/addresses/save`
- **Method**: POST
- **Path**: `/api/account/addresses/save`
- **Description**: Appends a new shipping address to the authenticated user's `addresses` array. If `isDefault` is true, default status is cleared from the user's other addresses first.
- **Request body**: `{ name, phone, addressLine1, addressLine2?, city, state, postalCode, isDefault? }`. `name`, `phone`, `addressLine1`, `city`, `state`, and `postalCode` are required (400 otherwise).
- **Response**: `{ "message": "Address saved successfully", "address": { ... } }` (201).
- **Authentication**: Required (401 otherwise).
- **Dependencies**: MongoDB (User model), NextAuth session.

## Wishlist API Endpoints

The following wishlist endpoints exist under `app/api/wishlist/`:

### `/wishlist`
- **Method**: GET
- **Path**: `/api/wishlist`
- **Description**: Returns the authenticated user's wishlist. Slugs stored in the user's `wishlist` array are resolved against the local `data/product.js` catalog (the same source read by `/products/[slug]`); slugs not present in the catalog are skipped.
- **Response**: `{ "items": [{ "id": number, "name": string, "slug": string, "price": number, "category": string, "images": string[] }], "wishlist": string[] }`.
- **Authentication**: Required (401 with `{ "error": "Unauthorized" }`).
- **Dependencies**: MongoDB (User model), local `data/product.js`, NextAuth session.

### `/wishlist/toggle`
- **Method**: POST
- **Path**: `/api/wishlist/toggle`
- **Description**: Adds the given product slug to the user's wishlist if absent, or removes it if present. Keeps `wishlistCount` in sync with the array length.
- **Request body**: `{ "slug": string }` (non-empty string required; 400 `{ "error": "Invalid slug" }` otherwise).
- **Response**: `{ "wishlist": string[] }`.
- **Authentication**: Required (401 with `{ "error": "Unauthorized" }`).
- **Dependencies**: MongoDB (User model), NextAuth session.

## Search API Endpoints

### `/search/autocomplete`
- **Method**: GET
- **Path**: `/api/search/autocomplete`
- **Description**: Public typeahead endpoint for the header search dropdown. Case-insensitive substring match on product name and keywords. Returns up to 8 results. No embedding computation is performed.
- **Query params**: `q` (optional; if empty or missing, returns `{ "results": [] }` with no database query).
- **Response**: `{ "results": [{ "name": string, "slug": string, "category": string, "image"?: string }] }`. `image` is the first element of `images`, included only when present.
- **Authentication**: None (public).
- **Dependencies**: MongoDB (Product model).

### `/search`
- **Method**: GET
- **Path**: `/api/search`
- **Description**: Public hybrid search endpoint. Filters products by category and max price. When `q` is provided, computes a keyword substring match subset (against name, description, and keywords) and semantic ranking via an NVIDIA embedding call plus in-memory cosine similarity over stored product embeddings; each product's combined score is the semantic similarity plus a 0.15 bonus when it also matches keywords. When `q` is absent, no embedding/scoring is performed and filtered products are returned in `sort` order.
- **Query params**: `q` (optional), `category` (optional; comma-separated and/or repeated), `maxPrice` (optional number), `sort` (`popular` | `price-asc` | `price-desc`, default `popular`).
- **Response**: `{ "results": [{ "id": string, "name": string, "slug": string, "price": number, "images": string[], "category": string, "rating": number, "reviewCount": number, "stock": number }] }`. The `embedding` field is stripped from the response.
- **Authentication**: None (public).
- **Dependencies**: MongoDB (Product model), NVIDIA embeddings (only when `q` is provided), `NVIDIA_API_KEY`, `NVIDIA_EMBEDDING_MODEL`, `NVIDIA_EMBEDDING_URL`.

## Authentication Requirements

APIs are partially authenticated. NextAuth manages sessions via JWT. Secure routes verify the session token.

## Current Data Access

Most frontend components still import local JavaScript arrays from `lib/products.js`, but Authentication and Account pages use real API calls to the above endpoints, connected to MongoDB.
