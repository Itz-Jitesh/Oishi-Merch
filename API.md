# API

**Last updated:** 2026-08-02

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

## Authentication Requirements

APIs are partially authenticated. NextAuth manages sessions via JWT. Secure routes verify the session token.

## Current Data Access

Most frontend components still import local JavaScript arrays from `lib/products.js`, but Authentication uses real API calls to the above endpoints, connected to MongoDB.
