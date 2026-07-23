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

# AGENTS.md

## 1. Project Overview

- **Project name:** Oishi Merch
- **Project purpose:** A modern, premium anime merchandise e-commerce platform for high-quality apparel and accessories.
- **Vision:** Feel more like a premium anime brand than a traditional online store — aesthetic design, fast performance, intelligent product discovery, secure purchasing.
- **Goals:** Scalable D2C storefront with polished UX, product discovery, secure checkout, and an admin surface for catalog/order management.
- **Target audience:** Anime and manga enthusiasts aged 15–35 — casual fans, collectors, convention attendees, cosplayers, and everyday anime-fashion shoppers.
- **Business model:** Direct-to-consumer (D2C) e-commerce. Revenue from product sales; future opportunities in exclusive drops, seasonal campaigns, collaborations, promotions.
- **Project scope (V1):** Auth & account management, product catalog, search & filtering, categories & collections, product details, wishlist, cart, secure checkout, order management, user profile, admin dashboard (products, inventory, orders, customers, analytics, settings), responsive design, SEO-friendly pages, secure scalable backend.
- **Out of scope (V1):** Multi-seller marketplace, community/social features, product reviews, AI stylist/outfit recommendations, loyalty/rewards, referral program, gift cards, subscription boxes, mobile app, international multi-region support.
- **Success criteria:** To be finalized during implementation.
- **Core principles:**
  - Premium user experience over feature quantity.
  - Fast, responsive, accessible on every device.
  - Secure by design with server-first architecture.
  - Clean, maintainable, scalable codebase.
  - Consistent UI and reusable components.
  - Strong separation between frontend, backend, and business logic.
  - Every feature should solve a real user problem.
  - Simplicity over unnecessary complexity.

---

## 2. Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Runtime:** Node.js
- **Package manager:** bun
- **Styling:** Tailwind CSS v4
- **Component library:** shadcn/ui
- **Icons:** lucide-react
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation:** Zod
- **Forms:** React Hook Form
- **Server state:** TanStack Query
- **Authentication:** Better Auth (planned)
- **Deployment:** Vercel

---

## 3. Architecture Rules

- Server-first architecture using Next.js App Router.
- Route Handlers (`app/api/`) are used for backend logic and API endpoints.
- Server Components by default; use Client Components only when necessary (e.g., interactive UI, hooks).
- Business logic should reside in `services/` and server actions.
- Database access is handled via repositories in `repositories/`.
- Validation is performed both on the client (for UX) and server (source of truth).
- Never trust client input.
- Never duplicate business logic.
- APIs must be stateless.
- Never access the database directly from UI components.
- Only introduce new dependencies after discussion and approval.

---

## 4. Folder Structure

Project root:
```
app/             # Next.js App Router pages and API endpoints
components/      # Shared UI components
features/        # Feature-specific modules (domain logic, feature components)
lib/             # Utilities, helpers, general-purpose code
server/          # Server-only code (e.g., server actions)
hooks/           # Custom React hooks
types/           # TypeScript types and interfaces
constants/       # Application constants
schemas/         # Zod schemas and validation logic
middleware/      # Next.js middleware (auth, logging, etc.)
providers/       # React context providers
repositories/    # Database access logic (Mongoose models, queries)
public/          # Static assets
docs/            # Project documentation
```

---

## 5. Coding Standards

- Use TypeScript throughout the codebase.
- Functional components only.
- Prefer async/await; avoid `.then()` chains.
- Named exports preferred; default exports allowed for Next.js page components.
- Use absolute imports with configured path aliases.
- Small, reusable functions. Early returns. Consistent formatting (Prettier).
- Follow SOLID, DRY, KISS principles.
- Avoid use of `any` type.

---

## 6. Naming Conventions

- **Components/files:** PascalCase (`ProductCard.tsx`, `AuthCard.tsx`)
- **Folders:** kebab-case or lower-case
- **Hooks:** `useSomething`
- **Utilities/lib:** camelCase exports, kebab-case files
- **Constants:** SCREAMING_SNAKE_CASE
- **Environment variables:** SCREAMING_SNAKE_CASE, prefixed with `NEXT_PUBLIC_` if public
- **API routes:** under `app/api/`, RESTful conventions
- **Types/interfaces:** PascalCase
- **Schemas:** PascalCase, ending with `Schema`

---

## 7. UI / UX Guidelines

- Premium, playful anime aesthetic — warm cream background, coral pink accents, generous whitespace, soft rounded corners.
- Light theme only (no dark mode yet).
- Use Tailwind CSS v4 design tokens for all colors and spacing.
- Typography: Bricolage Grotesque (display/headings), Inter (body).
- Use shadcn/ui primitives for consistency.
- Responsive layouts using Tailwind breakpoints.
- Semantic HTML and accessibility best practices.
- Never hardcode raw color utilities; always use semantic tokens.

---

## 8. Component Guidelines

- Shared components in `components/`, feature-specific in `features/`.
- Use Server Components by default; use Client Components only when interactivity is required.
- Keep components focused and small; extract as needed.
- Use props for data; document prop shapes with TypeScript interfaces.
- Memoize components only when performance benefits are measured.
- Prefer composition over inheritance.

---

## 9. State Management

- Local state: React `useState`, `useReducer`.
- Server state: TanStack Query.
- Global state: To be finalized during implementation.
- Authentication state: To be finalized during implementation.
- Form state: React Hook Form.
- Caching/optimistic updates: To be finalized during implementation.

---

## 10. Routing Structure

- Use Next.js App Router conventions.
- Pages and layouts in `app/` directory.
- Auth: `app/auth/login/page.tsx`, `app/auth/signup/page.tsx`, etc.
- Catalog: `app/products/page.tsx`, `app/products/[slug]/page.tsx`, etc.
- Account: `app/account/page.tsx`, `app/account/profile/page.tsx`, etc.
- Admin: `app/admin/products/page.tsx`, `app/admin/orders/page.tsx`, etc.
- API endpoints: `app/api/*/route.ts`
- Protected routes, role-based access, error/loading/not-found pages: To be finalized during implementation.

---

## 11. Database Design

To be finalized during implementation. Use MongoDB via Mongoose ODM. All access through repositories.

---

## 12. API Design Standards

To be finalized during implementation. Use RESTful endpoints under `app/api/`. Validate input with Zod. Never expose sensitive data.

---

## 13. Authentication & Authorization

To be finalized during implementation. Use Better Auth (planned). All sensitive routes must be protected on the server. Never trust client-side auth alone.

---

## 14. Validation Rules

- Use Zod schemas for both client-side and server-side validation.
- Always validate user input on the server, even if validated on the client.
- Never skip validation for any user-supplied data.

---

## 15. Security Rules

- Never store secrets in frontend code.
- Never trust client input.
- All secrets managed via environment variables.
- Secure cookies, CSRF, XSS, injection, rate limiting, CSP, and HTTPS enforcement: To be finalized during implementation.

---

## 16. Performance Guidelines

- Use lazy loading, dynamic imports, and code splitting where beneficial.
- Optimize images and fonts.
- Use server-side streaming where appropriate.
- Avoid premature optimization.

---

## 17. SEO Strategy

- Use Next.js metadata API for unique titles, descriptions, and OG tags.
- Semantic HTML with a single `<h1>` per page.
- Implement sitemap, robots.txt, structured data, and canonical URLs as needed.

---

## 18. Accessibility

- Keyboard navigation and visible focus states.
- ARIA labels on icon-only buttons.
- Color contrast per WCAG AA.
- Alt text on all meaningful images.
- Accessible forms and modals.
- Formal audit to be performed before production.

---

## 19. Error Handling

- Use Next.js error boundaries and error pages.
- Handle all errors gracefully; never expose stack traces to users.
- User-friendly error messages.
- Retry strategies and fallback UI: To be finalized during implementation.

---

## 20. Logging & Monitoring

To be finalized during implementation. Integrate logging and monitoring tools suitable for Vercel/Node.js stack.

---

## 21. Testing Strategy

To be finalized during implementation. Include unit, integration, and e2e tests. Ensure all critical paths are covered.

---

## 22. Git Workflow

To be finalized during implementation. Use conventional commits and protected main branch. Never rewrite pushed history.

---

## 23. Environment Configuration

- Public variables: `NEXT_PUBLIC_*`
- Server-only variables: `process.env.*`
- Separate configuration for development, staging, and production.
- Secrets managed via deployment platform.

---

## 24. Third-Party Services

To be finalized during implementation. Planned: MongoDB, Better Auth, payment provider, email, analytics, CDN, object storage.

---

## 25. Feature Documentation

See `FEATURES.md`.

---

## 26. Route Documentation

See `FEATURES.md` and section 10 above. Per-route metadata to be defined during implementation.

---

## 27. Database Collections

See `DATABASE.md`. To be finalized during implementation.

---

## 28. API Endpoint Documentation

See `API.md`. To be finalized during implementation.

---

## 29. Reusable Components Library

Documented in this file and inline. Key shared components: `SiteHeader`, `SiteFooter`, `PageShell`, `AuthCard`, `AuthIllustration`, `OtpInput`, `PasswordInput`, `SocialAuthButtons`, `VerificationWrapper`, `ProductCard`, and shadcn/ui primitives.

---

## 30. Reusable Utilities

- `lib/utils.ts` → utility functions (e.g., `cn` class name merger)
- Formatters, validators, shared hooks, shared types: to be implemented as needed.

---

## 31. AI Instructions

**General Behavior**
- Act as a senior engineer contributing to this codebase.
- Read existing code before writing new code.
- Search for reusable components, hooks, utilities, and services before creating new ones.
- Edit existing modules rather than duplicating logic.

**Architecture**
- Preserve the project architecture, folder structure, naming conventions, and coding standards as documented.
- Explain architectural decisions before major changes.
- Ask before introducing new dependencies.
- Never invent APIs, database schemas, or business rules not documented.
- Never duplicate code.
- Update documentation after any architecture, feature, or API change.
- Do not migrate away from the chosen stack (Next.js, TypeScript, etc.).

**Reuse**
- Never duplicate utilities, hooks, API logic, database logic, or components.

**Quality**
- Keep implementations production-ready, readable, and maintainable.
- Avoid unnecessary abstractions.
- Never ignore linting or type errors.

**Placeholders & Invention**
- Never generate placeholder implementations unless explicitly requested.
- When information is missing, ask for clarification.

**Backend / Data**
- Only add server functions, database calls, or auth logic with explicit approval.
- Follow all validation and security rules.

**Security**
- Never trust client data.
- Never expose secrets.
- Always sanitize and validate user input, especially on the server.

**Performance**
- Use lazy loading, dynamic imports, and memoization when beneficial.
- Avoid premature optimization.

**Error Handling**
- Never swallow errors.
- Provide user-friendly messages and developer-friendly logs.
- Never expose stack traces to users.

**Documentation**
- Update all relevant documentation files after architecture, feature, or API changes.
- Explain why, benefits, tradeoffs, and impact.

**Communication**
- When multiple valid solutions exist, present clear options and a recommendation.

---

## 32. Definition of Done

Every completed task must satisfy:

- Builds successfully
- Passes type checking
- Passes linting
- No runtime errors
- Responsive
- Accessible
- Secure
- Tested (once tests exist)
- Optimized
- Production ready
- No duplicated code
- Matches project architecture
- Matches coding standards
- Matches design system
- Context files updated when architecture, features, routes, DB, or APIs change
