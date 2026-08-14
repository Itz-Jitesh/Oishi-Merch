# Database

**Last updated:** 2026-08-14

The application currently uses MongoDB for persistence, with Mongoose as the Object Data Modeling (ODM) library.

## Current Persistence

- **Authentication and Users**: User accounts, Google OAuth mapping, and credentials (with bcrypt hashing) are persisted in MongoDB.
- **Products**: A Product schema exists in MongoDB, though some legacy pages still import local arrays from `lib/products.js`. The transition to fully database-backed products is in progress.
- **Orders/Cart**: Currently still largely client-side or mocked.

## Schemas

### User Schema (`models/users.js`)
- `username`: String, required, unique
- `email`: String, required, unique
- `password`: String (hashed), for credentials auth
- `role`: String enum (`user`, `admin`), default `user`
- `emailVerified`: Boolean
- `image`: String (avatar URL)
- `wishlistCount`: Number, default 0, min 0 (kept in sync with `wishlist` by `/api/wishlist/toggle`)
- `wishlist`: Array of Strings (product slugs), default `[]`
- `loyaltyPoints`: Number, default 0, min 0
- `addresses`: Array of address subdocuments (`name`, `phone`, `addressLine1`, `addressLine2`, `city`, `state`, `postalCode`, `country`, `isDefault`)
- `otp`: String, for email verification/password reset
- `otpExpiry`: Date
- `provider`: String enum (`credentials`, `google`), default `credentials`
- `otpPurpose`: String enum (`email-verification`, `password-reset`)
- *Timestamps*: enabled

### Product Schema (`models/product.js`)
- `name`: String, required
- `slug`: String, required, unique
- `description`: String, required
- `price`: Number, required, min 0
- `category`: String, required, indexed
- `keywords`: Array of Strings
- `embedding`: Array of Numbers (for semantic search / recommendations)
- `images`: Array of Strings
- `stock`: Number, default 0
- `rating`: Number, default 0, max 5
- `reviewCount`: Number, default 0
- *Timestamps*: enabled

## Relationships

No complex inter-document relationships (e.g. `ref`) are strictly enforced via schemas yet, though logical relationships will exist between Users and Orders in the future.

## Data Access Pattern

- **Mongoose Models**: Queries are handled via Mongoose models (`User`, `Product`).
- **Connection Management**: Managed by `lib/db/connect.js`, which caches the connection to avoid multiple connections in serverless environments.
