# Current Architecture

**Last updated:** 2026-08-02

## Core Technologies

- **Framework**: Next.js (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS v4, Radix UI (shadcn/ui patterns)
- **Database**: MongoDB
- **ORM / ODM**: Mongoose
- **Authentication**: NextAuth (Auth.js)

## Architectural Layers

### Frontend / Presentation (Next.js App Router)

- Located in `app/`.
- Uses Server Components by default. Interactivity is delegated to Client Components marked with `"use client"`.
- Layouts are composed hierarchically (e.g., `app/layout.js`, `app/admin/layout.js`).

### API Routes / Controllers

- Located in `app/api/`.
- Next.js Route Handlers (`route.js`) manage requests from the frontend and interface with NextAuth and Mongoose.
- The `[...nextauth]` catch-all route handles OAuth flows and session generation.

### Business Logic & Services

- Shared business logic resides in `lib/` (e.g., `lib/jwt/`, `lib/mailer.js`).
- Database connection management via `lib/db/connect.js`.

### Data Access & Models

- Located in `models/`.
- Mongoose schemas (`product.js`, `users.js`) define the structure and validation of MongoDB documents.

## Folder Structure

```
├── app/                  # Next.js App Router
│   ├── account/          # Customer account pages
│   ├── admin/            # Admin dashboard and management
│   ├── api/              # API route handlers (e.g. /api/auth)
│   ├── auth/             # Authentication UI pages
│   ├── ...               # Other storefront pages (cart, checkout, search)
│   └── layout.js         # Root layout
├── components/           # React components
│   ├── ui/               # Base UI components (shadcn pattern)
│   └── ...               # Domain-specific components
├── data/                 # Legacy mocked data (phasing out)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, DB connection, and services
├── models/               # Mongoose schema definitions
├── public/               # Static assets
└── scripts/              # Standalone scripts (e.g., database seed)
```

## Data Flow

1. **Client to API**: Client components or server actions trigger API routes (`/api/...`).
2. **Authentication Check**: API routes (or NextAuth directly) authenticate the user using JWT sessions.
3. **Database Access**: Authenticated requests query MongoDB via Mongoose Models (`User`, `Product`).
4. **Response**: JSON payloads are returned to the frontend or Server Components render HTML with direct database queries.

## Authentication Mechanism

- Powered by **NextAuth**.
- **Strategies**: Email/Password (Credentials) and Google OAuth.
- **Session Strategy**: JSON Web Tokens (JWT).
- User accounts are persisted in MongoDB (`models/users.js`). Password hashing is done via `bcrypt`.

## Current Conventions

- **Component Design**: UI components are isolated in `components/ui` following a standardized API (Radix primitives).
- **Styling**: Tailwind utility classes applied via `className`, using `clsx` and `tailwind-merge` (`cn` utility).
- **Environment Management**: Secrets and MongoDB URIs managed via `.env` variables.
