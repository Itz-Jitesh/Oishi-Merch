# Project State

**Last updated:** 2026-08-14

## Current Phase

The project is currently transitioning from a static/client-side UI prototype to a full-stack Next.js application backed by MongoDB. Authentication has been implemented using NextAuth.

## Completed Features

- Responsive shell layout (header, footer, navigation).
- UI component library integration (shadcn/ui via Radix).
- All primary consumer-facing and admin-facing pages built with mock data.
- **Authentication**: Backend setup with NextAuth, MongoDB integration, credential and Google OAuth strategies.
- **Database Connection**: MongoDB connection caching and models for User and Product established.
- **Security Page**: Conditional UI rendering for Google OAuth accounts (showing Google auth status card) vs email/password accounts (showing password change form), enforced at both client and API route levels.

## In Progress

- Connecting static/mocked pages (like product catalogs and carts) to the actual MongoDB data via Mongoose.
- Integrating authentication sessions into the UI, restricting admin routes and tying user accounts to orders.
- Moving from client-side state models for things like Cart to backend/database persistence.

## Blocked Work

None known at this time.

## Missing Systems

- Payment gateway integration.
- Order processing system.
- Email delivery infrastructure (though structure exists in `lib/mailer.js`).
- Image upload and storage solution (currently referencing remote/local static URLs).

## Current Status by Domain

### Backend Status
The MongoDB connection is robust and schemas are defined for core entities (User, Product). The NextAuth backend has been configured to support Credentials (with bcrypt) and Google OAuth. Some core API routes are scaffolded under `app/api/auth/`.

### Frontend Status
Frontend is primarily built and structured as Server Components by default where applicable, with client-side interactivity where needed. Many pages currently rely on mock data in `lib/products.js` or inline arrays.

### Authentication Status
Configured securely via NextAuth utilizing JSON Web Tokens (JWT) for session strategy. Includes database persistence for users, supporting both email/password with verification OTPs and OAuth (Google).

### Deployment Status
Designed to be deployed on Vercel or any Node.js environment supporting Next.js. Currently running in a local development environment. Environment variables for MongoDB and NextAuth must be configured for deployment.

### Testing Status
No automated tests are currently implemented. 

### Current Known Issues
- UI still relies heavily on mock data, leading to a disconnect between the Database and the Frontend representation in some areas.

### Technical Debt
- Discrepancy between implemented backend models (`models/product.js`) and frontend consumption (still using `lib/products.js` mocked data).
