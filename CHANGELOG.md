# Changelog

## 2026-08-14

**Summary:** Updated `/account/security` page and `/api/account/security` API route to restrict password changes for Google OAuth authenticated users while displaying the password change form for email/password authenticated users.

**Affected files:** `app/account/security/page.js`, `app/api/account/security/route.js`

**Related decision:** None.


## 2026-08-13

**Summary:** Added `AddressFormDialog` component, `EMPTY_ADDRESS` helper, and connected the `/account/addresses` page to trigger address addition/editing in a popup modal dialog.

**Affected files:** `components/AddressFormDialog.jsx`, `lib/addresses.js`, `app/account/addresses/page.js`

**Related decision:** None.


## 2026-08-07


**Summary:** Fixed category mapping logic so UI components read category object fields (`id`, `name`, `image`) instead of treating each category as a string.

**Affected files:** `app/categories/page.js`, `app/search/page.js`

**Related decision:** None.

## 2026-07-24

**Summary:** Filled repository context Markdown files from the verified current Next.js codebase. Documented the app as a frontend-only Oishi Merch prototype with local data, no API layer, no database, no implemented authentication, and static/client-side storefront, account, checkout, order, and admin screens.

**Affected files:** `AGENTS.md`, `PROJECT_STATE.md`, `CURRENT_ARCHITECTURE.md`, `FEATURES.md`, `DATABASE.md`, `API.md`, `ROADMAP.md`, `KNOWN_DECISIONS.md`, `KNOWN_DECISION.md`, `PROJECT_CONTEXT.md`, `README.md`, `CLAUDE.md`

**Related decision:** `KNOWN_DECISIONS.md` entry "Use repository context files as verified project memory"

## 2026-08-02
**Summary:** Updated documentation to reflect the addition of MongoDB and NextAuth authentication integrations. The codebase is no longer purely static/client-side and includes backend routing, User/Product schemas, and functional authentication routes.
**Affected files:** `PROJECT_STATE.md`, `CURRENT_ARCHITECTURE.md`, `FEATURES.md`, `DATABASE.md`, `API.md`

## 2026-08-12
**Summary:** Rebuilt order success page for Next.js App Router format, fixed AccountPage async client component runtime error, fixed User model schema caching and Google OAuth creation to persist loyaltyPoints, ordersCount, and wishlistCount, and removed stale Profile navigation item from Account layout sidebar.
**Affected files:** `app/checkout/success/page.js`, `app/checkout/success/OrderSuccessClient.jsx`, `app/account/page.js`, `models/users.js`, `auth.js`, `app/api/auth/signup/route.js`, `app/api/account/overview/route.js`, `app/account/layout.js`, `FEATURES.md`, `CLAUDE.md`

