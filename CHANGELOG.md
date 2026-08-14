# Changelog

## 2026-08-14 (Fix Broken Product Image References)

**Summary:** Pre-deploy verification found three product image references in `data/product.js` pointing at files that do not exist in `public/` (`ramen-cat-t-shirt/2.webp`, `ramen-cat-t-shirt/3.webp`, `shadow-shinobi-hoodie/2.webp`). These would have rendered as broken images on the product detail page in production. Both products now reference only `1.webp`, matching every other product in the catalog. Since `lib/seed/product.js` seeds MongoDB from the same `data/product.js`, re-seeding the production database will use the corrected catalog. A production `next start` runtime check confirmed the middleware (bcrypt on Node runtime), DB-backed search, static assets, and NextAuth endpoints all work; the only failure mode found was local-only (`UntrustedHost` on `next start` without `AUTH_TRUST_HOST`, which Vercel sets automatically).

**Affected files:** `data/product.js`, `CHANGELOG.md`

**Related decision:** None.

## 2026-08-14 (Mobile Usability Pass)

**Summary:** Passed across the storefront to remove mobile overflow and improve touch ergonomics. Header icon buttons are now 44px tap targets (h-11 w-11 on mobile), the mobile header row shrinks to fit 320px screens, and the mobile search panel now shows the same typeahead autocomplete dropdown as desktop (blur/dismiss logic reused). Product cards and grids tighten to `gap-3` below `md` and the card title/price row no longer overflows; the wishlist heart is a 40px target. Product detail thumbnails scroll horizontally when they overflow, the qty/add-to-cart controls wrap, and the cart item rows shrink the media block to 80px on small phones (stepper + line price always fit). The search page sort control becomes full-width and a "Filters" toggle shows the filters panel on mobile (panel hidden below `lg` until opened). Checkout's address-mode toggle stacks into a two-row control on mobile. The account nav and admin nav keep 44px row targets; the admin layout gains a sticky mobile header with a native `<details>` menu that reveals the same nav links as the desktop sidebar. ESLint and `next build` both pass.

**Affected files:** `components/SiteHeader.jsx`, `components/ProductCard.jsx`, `app/products/page.js`, `app/search/page.js`, `app/products/[slug]/page.js`, `app/wishlist/page.js`, `app/categories/page.js`, `app/categories/[slug]/page.js`, `app/collections/[slug]/page.js`, `app/cart/page.js`, `app/checkout/page.js`, `app/account/layout.js`, `app/account/addresses/page.js`, `app/admin/layout.js`

**Related decision:** None.

## 2026-08-14 (Studio Video Auto-Hiding Controls)

**Summary:** The play/pause button on the home page studio video banner now fades out after 3 seconds. It reappears on hover, stays visible while the video is paused, and restarts its hide timer after the user resumes playback.

**Affected files:** `app/page.js`

**Related decision:** None.

## 2026-08-14 (Home Page Studio Video Banner)

**Summary:** Replaced the static "Inside the studio" image section on the home page with the actual studio video (`public/video/Video.mp4`, 1920x1080) in a banner format. The video fills a 2:1 (mobile) / 2.29:1 (desktop) rounded banner with `object-cover`, cropping a little above and below the frame. It auto-plays muted with `loop` + `playsInline` on page load (state is synced to the video's native play/pause events, so if the browser blocks autoplay the button correctly shows Play). The only control is a single centered play/pause SVG toggle; native controls, audio, seeking, playback-rate, picture-in-picture, and fullscreen are all disabled.

**Affected files:** `app/page.js`, `public/video/Video.mp4`

**Related decision:** None.

## 2026-08-14 (Remove GitHub Auth Button)

**Summary:** Removed the GitHub sign-in button from the authentication UI. `SocialAuthButtons` previously rendered an unwired GitHub button (using the Google icon by mistake) next to Google on `/auth/login` and `/auth/signup`; neither page ever passed an `onGithub` handler, and no GitHub provider exists in `auth.js`. The component now renders only the Google button as a full-width button. No GitHub auth was ever implemented, so no provider or env config was removed.

**Affected files:** `components/SocialAuthButtons.jsx`

**Related decision:** None.

## 2026-08-14 (Wishlist Persistence and Checkout Saved Addresses)

**Summary:** Made the wishlist per-user and database-backed, and wired checkout to saved addresses. Added a `User.wishlist` slug array (with `wishlistCount` kept in sync), `GET /api/wishlist` (resolves saved slugs against `data/product.js`, the same catalog source `/products/[slug]` reads) and `POST /api/wishlist/toggle` (add/remove, 401/400 guarded). `ProductCard` is now a client component with a heart toggle button (filled/outline driven by the toggle response, best-effort initial state from `GET /api/wishlist`, 401 redirects to `/auth/login`, `stopPropagation` so it never navigates the card link), and `/wishlist` fetches the user's items with an empty state (matching the cart page pattern). `/checkout` now fetches `/api/account/addresses/fetch` on mount to detect auth and load saved addresses, adds a "Add address manually" / "Select a saved address" mode toggle (defaulting to manual), a "Save this address to my account" checkbox that best-effort POSTs to `/api/account/addresses/save`, and an optional State input; a selected saved address is mapped into the same `{ fullName, phone, street, city, postalCode }` shippingAddress shape the manual form sends, so `/api/payment/success` is unchanged. `proxy.js` already protected `/wishlist/:path*` and `/checkout/:path*`, so no middleware change was needed.

**Affected files:** `models/users.js`, `app/api/wishlist/route.js`, `app/api/wishlist/toggle/route.js`, `components/ProductCard.jsx`, `app/wishlist/page.js`, `app/checkout/page.js`, `API.md`, `DATABASE.md`, `FEATURES.md`, `PROJECT_STATE.md`, `CURRENT_ARCHITECTURE.md`

**Related decision:** `KNOWN_DECISIONS.md` entry "Per-User Wishlist Persistence and Checkout Saved-Address Selection"

## 2026-08-14 (Front Page Carousel Fix)

**Summary:** The home page product carousel used a legacy product shape (`p.image`, `p.tag`) that does not exist in `data/product.js` — products use `images`, so every slide image rendered an undefined `src`. Cards were also not links, so they were not clickable. The carousel now renders `p.images[0]` (with `₹{p.price}`), and image/title areas link to `/products/[slug]`. The hero slider's CTA button is now a link to `/products` instead of a dead button.

**Affected files:** `app/page.js`

**Related decision:** None.

## 2026-08-14 (Product Images Display Fix)

**Summary:** Product images were never rendered — `ProductCard` and the product detail page drew an empty `product.color` gradient div (a field that does not exist in `data/product.js`), so the `.webp` files in `public/products/` were unreferenced. `ProductCard` now renders `product.images[0]` with the category badge overlaid, and `/products/[slug]` renders a main image plus a thumbnail gallery when multiple images exist.

**Affected files:** `components/ProductCard.jsx`, `app/products/[slug]/page.js`

**Related decision:** None.

## 2026-08-14 (NVIDIA Embedding Model Fix)

**Summary:** The originally configured embedding model (`nvidia/nv-embedcode-7b-v1`) returned NVIDIA 500 for every request, and the reference model (`nv-embedcode-7b-v1`) is retired on the hosted API. Verified `nvidia/nv-embedqa-e5-v5` returns 200 with 1024-dimension embeddings for both `query` and `passage` input types, and set it as `NVIDIA_EMBEDDING_MODEL` in `.env`. Re-run `npm run seed` so product embeddings are generated with the working model.

**Affected files:** `.env`

**Related decision:** None.

## 2026-08-14 (NVIDIA Embedding Request Fix)

**Summary:** Fixed `getEmbedding` sending an incomplete request body that NVIDIA rejected with 400. The request now sends `input_type`, `encoding_format: "float"`, and `truncate: "NONE"` per the official NVIDIA embed API contract, and accepts an `inputType` argument ("passage" at seed time in `lib/seed/product.js`, "query" at search time in `app/api/search/route.js`). Error messages now include the API response body for easier debugging.

**Affected files:** `lib/embeddings/nvidia.js`, `lib/seed/product.js`, `app/api/search/route.js`

**Related decision:** None.

## 2026-08-14 (Hybrid Product Search)

**Summary:** Implemented hybrid (keyword + semantic) product search using NVIDIA embeddings. Added `lib/embeddings/nvidia.js` as the NVIDIA embedding client, per-product embedding generation at seed time in `lib/seed/product.js`, public `/api/search` (keyword + semantic ranking via in-memory cosine similarity with a 0.15 keyword-match bonus, category/maxPrice filters, and sort) and `/api/search/autocomplete` (typeahead) endpoints, a debounced typeahead dropdown in `components/SiteHeader.jsx`, and switched `/search` to fetch results from the API. Added `NVIDIA_API_KEY`, `NVIDIA_EMBEDDING_MODEL`, and `NVIDIA_EMBEDDING_URL` placeholders to `.env`.

**Affected files:** `lib/embeddings/nvidia.js`, `lib/seed/product.js`, `app/api/search/route.js`, `app/api/search/autocomplete/route.js`, `components/SiteHeader.jsx`, `app/search/page.js`, `.env`, `API.md`, `FEATURES.md`, `PROJECT_STATE.md`, `CURRENT_ARCHITECTURE.md`

**Related decision:** `KNOWN_DECISIONS.md` entry "Hybrid Keyword + Semantic Search With NVIDIA Embeddings"

## 2026-08-14 (Vector Search Planning Details)

**Summary:** Added a verified planning reference for the upcoming vector search feature, documenting the current stack, structure, state management, auth, search implementation, product embedding fields, data volume, conventions, and open implementation decisions. Appended verified wishlist, address, checkout, and order schema details for related feature planning.

**Affected files:** `VECTOR_SEARCH_FEATURE_DETAILS.md`

**Related decision:** None.

## 2026-08-14 (Order History Integration)

**Summary:** Created API route `/api/account/orders` and integrated the customer `/account/orders` page to fetch order details (items, prices, dates, totals, shipping addresses) from MongoDB via `useEffect` and render them in a custom card layout.

**Affected files:** `app/api/account/orders/route.js`, `app/account/orders/page.js`, `API.md`, `FEATURES.md`, `PROJECT_STATE.md`

**Related decision:** None.

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
