# Known Decisions

## Per-User Wishlist Persistence and Checkout Saved-Address Selection

**Date:** 2026-08-14

**Status:** Accepted

**Context:** The wishlist page rendered a hardcoded product slice and checkout's saved-address feature was a placeholder ("Saved addresses aren't available yet"). Users need a persistent, per-account wishlist and the ability to reuse saved addresses at checkout.

**Decision:** Store the wishlist as an array of product slugs on the existing `User` document (`User.wishlist`, default `[]`), keeping the existing `wishlistCount` in sync inside `POST /api/wishlist/toggle`. `GET /api/wishlist` resolves those slugs against the local `data/product.js` catalog — the same source `app/products/[slug]/page.js` reads — rather than the MongoDB `Product` collection, for consistency with the product detail page (no new model or collection). Checkout reuses the existing `GET /api/account/addresses/fetch` and `POST /api/account/addresses/save` endpoints instead of creating new ones; a selected saved address is mapped client-side into the same `{ fullName, phone, street, city, postalCode }` shape the manual form already sends, so `/api/payment/success` and the `Order.shippingAddress` schema are untouched. `ProductCard` became a client component to host the heart toggle; no props contract or rendered fields changed.

**Alternatives considered:** Resolving wishlist slugs against the MongoDB `Product` collection was rejected because the storefront catalog (including the product detail page) still reads `data/product.js`, so slugs must resolve against that same source to stay consistent. Adding a separate `Wishlist` collection was rejected as unnecessary — a slug array on the existing user document avoids a new model and keeps `wishlistCount` trivially correct. Introducing a new addresses list endpoint was rejected because `/api/account/addresses/fetch` already exists and serves the account addresses page.

**Consequences:** Wishlist items only appear for slugs present in `data/product.js`; products added later via MongoDB but not re-synced into `data/product.js` won't render in the wishlist. The save-to-account checkbox is best-effort and non-blocking — if the optional State field is left blank, `/api/account/addresses/save` returns 400 and the address is silently not saved while payment proceeds. Because `/api/payment/success` still reads the `cart` cookie, checkout behavior beyond address selection is unchanged.

## Hybrid Keyword + Semantic Search With NVIDIA Embeddings

**Date:** 2026-08-14

**Status:** Accepted

**Context:** Search previously ran entirely in the browser as exact substring matching on product name against a local array. The storefront needed server-backed hybrid search (keyword plus semantic) with a fast typeahead dropdown in the header, without introducing a new database or collection.

**Decision:** Use NVIDIA embeddings for semantic search. Generate embeddings only for products, only at seed time, from a concatenation of the product's name, description, category, and keywords, stored in the existing `Product.embedding` field. Serve typeahead suggestions via `/api/search/autocomplete` (case-insensitive regex match on name/keywords, no embedding computation) and hybrid results via `/api/search` (in-memory cosine similarity over stored embeddings, plus a 0.15 bonus for products that also match keywords). Similarity ranking is computed in Node.js at request time because no MongoDB Atlas vector index is assumed to exist; this is acceptable at the current catalog scale (~40 products). No new MongoDB collection or external vector database is introduced. Environment variables `NVIDIA_API_KEY`, `NVIDIA_EMBEDDING_MODEL`, and `NVIDIA_EMBEDDING_URL` are required to enable embedding calls.

**Alternatives considered:** MongoDB native vector search was rejected because vector-index support in the deployed MongoDB environment is unverified. A dedicated vector database (e.g., Pinecone) was rejected per the no-new-database constraint. Keeping client-side-only search was rejected because it cannot provide semantic ranking.

**Consequences:** `/api/search` with a query requires the three NVIDIA env vars and seeded embeddings; until then, query-based requests error and `/search` without a query still works (filtering + sorting only). The catalog must be re-seeded to refresh embeddings when product text changes. Embedding dimensionality must stay consistent between seed time and query time.

## Use Repository Context Files As Verified Project Memory

**Date:** 2026-07-24

**Status:** Accepted

**Context:** The repository had empty context files and a `CLAUDE.md` that described planned systems not implemented in the current codebase. Future work needs a reliable distinction between verified current implementation and future intent.

**Decision:** The canonical context files at the repository root must describe only verified current state unless a section is explicitly marked as future work. `KNOWN_DECISIONS.md` is the canonical decision log filename. The existing `KNOWN_DECISION.md` is retained as a pointer for compatibility.

**Alternatives considered:** Leaving context files empty was rejected because it forces future agents to rediscover the codebase. Treating planned systems in `CLAUDE.md` as implemented was rejected because the codebase does not contain those systems.

**Consequences:** Documentation must be updated alongside code changes. Future backend, database, authentication, or API decisions must be recorded here before docs describe them as implemented.
