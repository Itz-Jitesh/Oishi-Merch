# AGENTS.md — AI Operating Manual for This Repository

> **Status:** Living governance document
> **Audience:** Every AI agent (and human) that contributes code, documentation, or architectural decisions to this repository
> **Authority:** This document is the single source of truth. If any instruction, prompt, memory, or prior conversation conflicts with this file, **this file wins**.

---

## Table of Contents

1. [Purpose of This Document](#1-purpose-of-this-document)
2. [Prime Directives](#2-prime-directives)
3. [Hallucination Prevention Protocol](#3-hallucination-prevention-protocol)
4. [Repository Awareness Protocol](#4-repository-awareness-protocol)
5. [Context Files Registry](#5-context-files-registry)
6. [Documentation Synchronization Rules](#6-documentation-synchronization-rules)
7. [Project Overview](#7-project-overview)
8. [Coding Standards](#8-coding-standards)
9. [AI Decision Process](#9-ai-decision-process)
10. [What AI Is Allowed to Change](#10-what-ai-is-allowed-to-change)
11. [What AI Must Never Change](#11-what-ai-must-never-change)
12. [Clarification Protocol](#12-clarification-protocol)
13. [Quality Checklist](#13-quality-checklist)
14. [Failure Modes and How to Avoid Them](#14-failure-modes-and-how-to-avoid-them)
15. [Glossary](#15-glossary)
16. [Amendment Process for This Document](#16-amendment-process-for-this-document)

---

## 1. Purpose of This Document

This repository will be touched by many different AI agents over an extended period of time — different models, different sessions, different vendors, possibly different tools. None of these agents share memory with one another. None of them share memory with previous sessions of themselves.

Because of this, **the repository's files are the only persistent memory that exists.** This document exists to:

- Give every new agent instant orientation without requiring a human to re-explain the project.
- Prevent contradictory, duplicated, or fabricated work caused by agents "filling in the gaps" with plausible-sounding guesses.
- Keep a strict boundary between **what is true today** (documented, verified, implemented) and **what is planned, proposed, or unknown**.
- Make documentation maintenance a mandatory part of every task, not an afterthought.

This document does not describe how to build any specific feature. It describes **how to behave** while working in this repository.

---

## 2. Prime Directives

These directives override convenience, speed, and the temptation to produce a "complete-looking" answer.

1. **Truth over completeness.** An incomplete but accurate answer is always better than a complete but fabricated one.
2. **Verify before asserting.** Never state that something exists, works a certain way, or was decided a certain way without having checked the repository or the context files in this session.
3. **Silence is not permission.** The absence of a rule against something is not authorization to do it. If it isn't documented as decided, treat it as undecided.
4. **Ask rather than assume.** When a required fact is missing, stop and request clarification instead of inventing a plausible default, *unless* this document explicitly grants default behavior for that situation.
5. **Leave the repository more understandable than you found it.** Every change should make the next agent's job easier, not harder.
6. **Documentation is not optional.** A code change without the corresponding documentation update is an incomplete task, not a finished one.
7. **No duplicate implementations.** If something similar already exists, extend or reuse it. Do not create a parallel version because it seemed easier than reading the existing one.

---

## 3. Hallucination Prevention Protocol

This is the **highest priority** section of this document. AI agents produce plausible-sounding but false output more often when working with codebases than when doing pure reasoning, because code has many silent, non-obvious conventions. The following rules are absolute.

### 3.1 Never invent, under any circumstance:

| Category | Rule |
|---|---|
| APIs | Do not invent endpoints, methods, request/response shapes, or status codes. Only describe what is verified in `API.md` or the actual route/controller files. |
| Backend logic | Do not describe business logic you have not read in the actual source files. |
| Database schemas | Do not invent tables, collections, fields, types, or relationships. Only what is verified in `DATABASE.md` or actual schema/migration files. |
| Authentication flows | Do not assume a login/session/token strategy. Verify from actual auth code or explicitly ask. |
| Environment variables | Do not invent `.env` keys. Only reference variables found in an actual `.env.example`, config loader, or deployment config. |
| Libraries / packages | Do not assume a library is installed. Check `package.json`, `requirements.txt`, `go.mod`, `Cargo.toml`, or equivalent before referencing it. |
| Business rules | Do not infer business rules from naming conventions or intuition. Business rules must come from code, tests, or `KNOWN_DECISIONS.md`. |
| Folder structures | Do not describe a folder structure without having actually listed the directory. |
| Routes | Do not invent frontend routes. Verify against the actual router configuration. |
| Models | Do not invent data models or types. Verify against actual model/type definitions. |
| Permissions / roles | Do not invent a permission system. Verify against actual authorization code. |
| Third-party services | Do not assume integrations (payment providers, email services, analytics, etc.) exist unless verified in code or config. |
| Implementation details | Do not fill gaps in understanding with "reasonable" assumptions about how something probably works. |

### 3.2 Never create placeholder implementations unless explicitly requested

If a user asks for a feature that depends on something unimplemented (e.g., "add password reset" when there is no email service), do not silently stub it out with fake logic. State clearly what is missing and ask how to proceed, or explicitly implement a clearly-labeled placeholder **only if requested**.

### 3.3 Never claim a feature exists without verifying it from the repository

"This project probably has X because most apps do" is a hallucination. If you have not read the code or a context file that confirms X, do not state it exists.

### 3.4 Never assume architecture from the project name or folder name

A folder named `auth/` does not guarantee JWT, sessions, OAuth, or any particular strategy. A project named "shop-api" does not guarantee a specific database or framework. Verify.

### 3.5 Never assume previous conversations

Each session may start with no memory of prior sessions. Do not reference "as we discussed" or "as I mentioned before" unless that information is actually present in this session's context or in a persisted context file. If information seems like it should exist from a prior session but isn't in the files, treat it as lost and ask, or reconstruct it from `CHANGELOG.md` / `KNOWN_DECISIONS.md`.

### 3.6 When required information is missing

**Stop. Ask. Do not guess.** See [Section 12: Clarification Protocol](#12-clarification-protocol) for the exact procedure.

---

## 4. Repository Awareness Protocol

Before writing or modifying any code, an agent must perform a repository inspection pass. This is not optional busywork — skipping it is the single largest cause of duplicated code and architectural drift.

### 4.1 Mandatory inspection steps, in order

1. **Read the context files** (see [Section 5](#5-context-files-registry)) — start with `PROJECT_STATE.md` and `CURRENT_ARCHITECTURE.md`.
2. **List the relevant directory tree** for the area you're about to touch. Do not assume structure from memory of "typical" projects.
3. **Search for existing implementations** relevant to the task:
   - Reusable components
   - Reusable hooks / composables
   - Utility functions
   - Services / API clients
   - Existing API endpoints/routes
   - Existing models / types / schemas
   - Existing tests covering related behavior
4. **Read the actual code**, not just filenames. A file named `userService.js` might not do what its name implies.
5. **Check `KNOWN_DECISIONS.md`** for any prior decision that constrains the approach.
6. **Check `ROADMAP.md`** to see if the requested work overlaps with planned-but-not-yet-started work, to avoid conflicting partial implementations.

### 4.2 If an implementation already exists

- **Reuse it.** Extend it if it's close but incomplete.
- Do not create a second version "to be safe" or because reading the existing one takes more effort.
- If the existing implementation is flawed, flag the flaw explicitly and propose a fix — do not silently route around it with a duplicate.

### 4.3 If you cannot find something you expect to exist

Do not conclude it doesn't exist after a single shallow search. Search using multiple plausible names/patterns. Only after a genuine, thorough search should you document something as "not implemented" in `PROJECT_STATE.md` or ask the user for its location.

---

## 5. Context Files Registry

The repository maintains a set of Markdown files that together form the persistent memory of the project. Every agent must know the purpose of each and update them appropriately. These files must live at the repository root unless the project explicitly relocates them (in which case this document must be updated to reflect the new location).

### 5.1 `CHANGELOG.md`

**Purpose:** Chronological history of repository changes.

**Rules:**
- Append-only. Never rewrite or delete history.
- Every architectural change must be recorded.
- Each entry must include:
  - Date
  - Summary of the change
  - Affected files
- Entries should be newest-first or oldest-first — pick one convention and stay consistent with what's already in the file; do not switch ordering mid-file.

**Entry template:**
```
## YYYY-MM-DD
**Summary:** <one or two sentence description>
**Affected files:** <list of paths>
**Related decision:** <link to KNOWN_DECISIONS.md entry, if applicable>
```

### 5.2 `KNOWN_DECISIONS.md`

**Purpose:** Permanent record of architectural decisions and their reasoning.

**Rules:**
- Never delete previous decisions, even if later superseded.
- If a decision is superseded, add a new entry that references and supersedes the old one — do not edit the old entry's substance.
- Every decision entry must include:
  - Title
  - Date
  - Context (why this decision was needed)
  - Decision (what was decided)
  - Alternatives considered
  - Consequences (trade-offs accepted)

**Entry template:**
```
## <Decision Title>
**Date:** YYYY-MM-DD
**Status:** Accepted | Superseded by <link>
**Context:** <why this decision was needed>
**Decision:** <what was decided>
**Alternatives considered:** <list with brief reasons for rejection>
**Consequences:** <trade-offs, risks, follow-up work implied>
```

### 5.3 `ROADMAP.md`

**Purpose:** Future work only — nothing that is already implemented.

**Contains:**
- Planned features
- Priorities
- Milestones
- Backlog items
- Known technical debt to be addressed later

**Rules:**
- Never list implemented features here.
- When a roadmap item is completed, remove it from this file and reflect its completion in `FEATURES.md`, `PROJECT_STATE.md`, and `CHANGELOG.md`.

### 5.4 `PROJECT_STATE.md`

**Purpose:** A snapshot of what exists **today**, and only today.

**Must answer, and be kept current on:**
- Current phase of the project
- Completed features
- In-progress work
- Blocked work (and why)
- Missing systems (explicitly stated, not left ambiguous)
- Current backend status
- Current frontend status
- Current authentication status
- Current deployment status
- Current testing status
- Current known issues
- Current technical debt

**Rule:** This file must always reflect reality *as of the most recent merged change*. If you make a change that alters any of the above, you must update this file in the same task.

### 5.5 `CURRENT_ARCHITECTURE.md`

**Purpose:** Documents the architecture as it is actually implemented right now.

**Should describe:**
- Folder structure
- Architectural layers
- Component relationships
- Data flow
- Routing structure
- Authentication mechanism
- Backend structure
- Services and their responsibilities
- Repositories/data-access patterns
- State management approach
- Current conventions/patterns in use

**Rule:** Only describe implemented architecture. Proposed or future architecture belongs in `ROADMAP.md` or `KNOWN_DECISIONS.md` (as a decision not yet executed), never here.

### 5.6 `FEATURES.md`

**Purpose:** Complete documentation of every feature in the product.

**Each feature entry must include:**
- Purpose
- Status (planned / in progress / complete / deprecated)
- Dependencies
- Entry points
- Routes involved
- Components involved
- API usage
- Database usage
- Known future improvements

### 5.7 `DATABASE.md`

**Purpose:** Current database documentation.

**Should include, if a database exists:**
- Tables / collections
- Schemas
- Relationships
- Indexes
- Constraints
- Validation rules

**Rule:** If no database exists yet, this file must state that explicitly (e.g., "No database is currently implemented. Data is not persisted / is stored in-memory / is stored via <mechanism>."). Do not invent a database structure that doesn't exist.

### 5.8 `API.md`

**Purpose:** Current API documentation.

**Each endpoint entry must include:**
- HTTP method
- Path
- Authentication requirements
- Request shape
- Response shape
- Error responses
- Status codes
- Dependencies (services, database tables, etc.)

**Rule:** If no APIs exist yet, state that explicitly. Never fabricate an endpoint list to look complete.

### 5.9 If a context file does not yet exist

If this repository does not yet contain one or more of these files, do not silently skip documentation. Create the missing file with accurate content reflecting the real current state (even if that state is "nothing implemented yet"), and note its creation in `CHANGELOG.md`.

---

## 6. Documentation Synchronization Rules

Code changes and documentation changes are **the same task**, not two separate tasks. A pull request or patch that changes code without the corresponding documentation update is incomplete.

| If this changes... | ...then update these files |
|---|---|
| Architecture | `CURRENT_ARCHITECTURE.md`, `KNOWN_DECISIONS.md`, `CHANGELOG.md` |
| A new feature is added | `FEATURES.md`, `PROJECT_STATE.md`, `CHANGELOG.md`, `ROADMAP.md` (remove if it was listed there) |
| A feature is completed | Remove from `ROADMAP.md`, mark complete in `FEATURES.md`, update `PROJECT_STATE.md`, append `CHANGELOG.md` |
| An API changes | `API.md`, `CHANGELOG.md`, `PROJECT_STATE.md` |
| The database changes | `DATABASE.md`, `CURRENT_ARCHITECTURE.md`, `CHANGELOG.md` |
| A major project decision is made | `KNOWN_DECISIONS.md`, `CHANGELOG.md` |

**Rule:** Never leave documentation outdated after implementation. If you are unsure whether a change is "major enough" to warrant a `KNOWN_DECISIONS.md` entry, err on the side of recording it — a redundant record is far cheaper than a lost one.

---

## 7. Project Overview

> **Agent instruction:** The fields below must be filled in from verified project information — from an existing README, from `PROJECT_STATE.md`, or from direct clarification with the user/maintainer. Do **not** invent plausible-sounding answers to these fields. If a field is unknown at the time this document is first created, write `UNKNOWN — requires clarification` rather than a guess, and raise it per the [Clarification Protocol](#12-clarification-protocol).

- **Project name:** Oishi Merch
- **Purpose:** A frontend-only anime merchandise storefront prototype with storefront, catalog, search, cart, checkout UI, account UI, auth UI, and admin UI screens.
- **Vision:** Build toward a polished anime merchandise e-commerce experience. The current implementation is a static/client-side prototype and does not yet implement production commerce systems.
- **Business goals:** Support direct-to-consumer merchandise browsing and purchasing once backend, persistence, authentication, checkout, and admin workflows are implemented.
- **Target audience:** Anime merchandise shoppers and fans browsing apparel/accessory-style products.
- **Project scope:** Currently implemented scope includes public storefront pages, product/category/collection browsing, local search/filtering, wishlist, cart UI, checkout UI, order UI, account UI, auth UI, admin UI, and static informational pages.
- **Non-goals:** The current codebase does not implement a marketplace, backend commerce engine, payment processing, real authentication, database persistence, mobile app, loyalty system, or social/community features.

### 7.1 Guiding Philosophies

These philosophies should be filled in with project-specific detail once known. Until then, the following defaults apply and should be treated as the baseline unless overridden by an explicit `KNOWN_DECISIONS.md` entry:

- **Design philosophy:** Favor clarity and consistency over cleverness.
- **Engineering philosophy:** Favor explicit, verifiable code over implicit "magic" behavior.
- **Architecture philosophy:** Favor simple, well-understood patterns over speculative generality. Do not build for hypothetical future scale that hasn't been requested.
- **Security philosophy:** Treat all user input as untrusted. Never invent or weaken authentication/authorization without an explicit decision recorded in `KNOWN_DECISIONS.md`.
- **Performance philosophy:** Correctness first, then measure, then optimize. Do not micro-optimize unverified bottlenecks.
- **Scalability philosophy:** Build for the scale that is actually needed today plus a reasonable, explicitly-discussed margin — not indefinite hypothetical scale.
- **Maintainability philosophy:** Code and documentation should allow a new agent with zero prior context to become productive using only this repository's files.

---

## 8. Coding Standards

> **Agent instruction:** Where this repository already has established conventions (visible in existing code), those conventions take precedence over the generic defaults below. Detect and follow existing patterns before applying anything listed here. If this is a greenfield repository with no established conventions yet, the defaults below apply until a `KNOWN_DECISIONS.md` entry says otherwise.

### 8.1 Folder Conventions
- Group files by feature/domain where the codebase already does so; do not introduce a competing organizational scheme (e.g., switching from feature-based to type-based folders) without a recorded decision.
- New files belong in the location a careful reading of the existing structure implies. If genuinely ambiguous, ask.

### 8.2 Naming Conventions
- Match existing casing conventions exactly (e.g., `camelCase` vs `snake_case` vs `PascalCase`) per language/file type as already established in the repo.
- Names should be descriptive and unambiguous; avoid abbreviations not already in use elsewhere in the codebase.

### 8.3 Components
- Follow the existing component structure (props typing, file co-location with styles/tests, etc.) exactly as already practiced.
- Do not introduce a new component pattern (e.g., class vs functional, new state library) without a recorded decision.

### 8.4 Hooks / Composables
- Reuse existing hooks before writing new ones.
- New hooks must follow the existing naming and return-shape conventions.

### 8.5 Services
- Business logic that talks to external systems belongs in service modules, matching existing service-layer conventions.
- Do not embed service-layer logic directly in UI components or route handlers if the codebase already separates these concerns.

### 8.6 Repositories / Data Access
- Follow the existing data-access pattern. Do not introduce direct database calls in places where the codebase already uses a repository/data-access abstraction.

### 8.7 Utilities & Constants
- Check existing utility/constants files before adding new ones; avoid duplicate helper functions.

### 8.8 Imports
- Match existing import ordering/grouping conventions and aliasing patterns already used in the repo.

### 8.9 Error Handling
- Match the existing error-handling pattern (thrown exceptions vs. result objects vs. error boundaries, etc.). Do not mix strategies within the same layer without a recorded decision.

### 8.10 Async Rules
- Follow existing async conventions (promises vs async/await vs callbacks) consistently with the surrounding code.

### 8.11 State Management
- Do not introduce a new state management library alongside an existing one without a recorded decision in `KNOWN_DECISIONS.md`.

### 8.12 Performance Rules
- Do not prematurely optimize. Do not introduce caching, memoization, or parallelism unless there's a demonstrated need or explicit request.

### 8.13 Accessibility Rules
- All new UI must meet at least the accessibility bar already established in the codebase (semantic HTML, ARIA where appropriate, keyboard navigability). Never lower it.

### 8.14 Testing Expectations
- New logic should include tests consistent with the existing testing framework and conventions already in the repo.
- Do not skip tests for "small" changes without explicit user direction.

### 8.15 Security Expectations
- Never hardcode secrets, tokens, or credentials.
- Never invent an environment variable name for a secret — verify against existing configuration or ask.
- Validate and sanitize all external input consistent with existing patterns.

### 8.16 Documentation Expectations
- Any new public function, component, endpoint, or module should be documented consistent with the existing documentation style (docstrings, comments, or context-file entries as appropriate).

---

## 9. AI Decision Process

Before writing any code, every agent must explicitly work through this sequence. This is not a suggestion — treat it as a required checklist for any non-trivial task (trivial tasks, like fixing an obvious typo, may skip straight to implementation with a brief note of why the full process was unnecessary).

1. **Understand the request.** Restate the task in your own words; identify ambiguity.
2. **Inspect the repository.** Follow the [Repository Awareness Protocol](#4-repository-awareness-protocol).
3. **Read relevant context files.** At minimum `PROJECT_STATE.md`, `CURRENT_ARCHITECTURE.md`, and any feature-specific entries in `FEATURES.md`.
4. **Determine affected architecture.** What layers, files, and systems does this change touch?
5. **Check for reusable implementations.** Search before writing.
6. **Verify assumptions.** Cross-check every non-trivial assumption against actual code or context files.
7. **Decide whether clarification is required.** If any required fact is still unverifiable, stop and ask (see [Section 12](#12-clarification-protocol)).
8. **Plan changes.** Outline the change before writing it, including which documentation files will need updates.
9. **Implement.** Write the code following [Section 8](#8-coding-standards).
10. **Update documentation.** Apply [Section 6](#6-documentation-synchronization-rules).
11. **Verify consistency.** Re-read the changed files and the updated docs together — do they agree?
12. **Ensure no duplication.** Confirm no parallel/duplicate implementation was introduced.
13. **Ensure architecture is preserved.** Confirm the change doesn't silently contradict `CURRENT_ARCHITECTURE.md` or an existing `KNOWN_DECISIONS.md` entry — if it must, that contradiction requires a new decision entry, not a silent override.

---

## 10. What AI Is Allowed to Change

Without further clarification, an agent may:

- Fix clearly-defined bugs in existing, understood code.
- Add new code that extends existing, verified patterns.
- Refactor code for clarity/consistency **without changing external behavior**, as long as the refactor is documented.
- Add tests.
- Update context files to keep them synchronized with actual code changes.
- Add new context files if genuinely missing (per [Section 5.9](#59-if-a-context-file-does-not-yet-exist)).
- Fix broken or outdated documentation that provably contradicts the current code.

## 11. What AI Must Never Change

Without explicit user instruction and, where applicable, a corresponding `KNOWN_DECISIONS.md` entry, an agent must never:

- Change the authentication/authorization strategy.
- Change the database technology or schema design philosophy.
- Remove or rewrite historical entries in `CHANGELOG.md` or `KNOWN_DECISIONS.md`.
- Introduce a new major dependency (framework, state library, database driver) without discussion.
- Change publicly-consumed API contracts (paths, request/response shapes) without discussion, since this may break consumers.
- Delete features silently — deprecation and removal must be discussed and recorded.
- Weaken existing security controls (validation, sanitization, permission checks) for convenience.
- Override or silently contradict an existing `KNOWN_DECISIONS.md` entry.

---

## 12. Clarification Protocol

When an agent encounters missing information required to proceed correctly:

1. **Do not guess.** Do not proceed with a plausible-sounding default unless this document explicitly authorizes one.
2. **State exactly what is missing** and why it's needed to proceed correctly.
3. **Propose options if reasonable ones exist**, but clearly label them as options, not decisions.
4. **Wait for an answer** before implementing the ambiguous part. Unambiguous, unrelated parts of the task may still proceed.
5. **Once answered, record the decision** in `KNOWN_DECISIONS.md` if it's architecturally significant, so future agents don't have to ask again.

---

## 13. Quality Checklist

Every completed task must satisfy all of the following before being considered done:

- [ ] Architecture preserved (or change is intentional and recorded)
- [ ] No duplicated code
- [ ] Reused existing implementations where available
- [ ] Documentation updated per [Section 6](#6-documentation-synchronization-rules)
- [ ] No hallucinated information anywhere in code or docs
- [ ] No invented APIs
- [ ] No invented schemas
- [ ] No invented services
- [ ] Implementation is production-ready, not a silent placeholder
- [ ] Code is maintainable and readable
- [ ] Security considerations addressed
- [ ] Accessibility considerations addressed (for UI work)
- [ ] Reasonable performance considerations addressed
- [ ] Repository remains internally consistent (code matches docs matches decisions)

---

## 14. Failure Modes and How to Avoid Them

| Failure mode | Why it happens | Prevention |
|---|---|---|
| Fabricated API endpoint | Agent pattern-matches to "typical" REST conventions instead of reading actual routes | Always read actual route/controller files; never infer from naming alone |
| Duplicate utility function | Agent didn't search before writing | Follow [Repository Awareness Protocol](#4-repository-awareness-protocol) before any new code |
| Stale documentation | Agent treats doc updates as optional/secondary | Treat doc updates as part of the same task, per [Section 6](#6-documentation-synchronization-rules) |
| Silent architecture drift | Agent makes a "small" change that actually contradicts an existing decision | Always cross-check against `KNOWN_DECISIONS.md` and `CURRENT_ARCHITECTURE.md` |
| Invented environment variable | Agent assumes a plausible config key exists | Only reference variables found in actual config/`.env.example` files |
| Confidently wrong feature status | Agent assumes a feature is "probably done" without checking | Always verify feature status against `FEATURES.md` and actual code before asserting status |
| Overwritten history | Agent "cleans up" `CHANGELOG.md` or `KNOWN_DECISIONS.md` | These files are append-only; never rewritten |

---

## 15. Glossary

- **Context files** — The set of Markdown files described in [Section 5](#5-context-files-registry) that together constitute the repository's persistent memory.
- **Decision** — An architecturally significant choice recorded in `KNOWN_DECISIONS.md`, including its rationale and trade-offs.
- **Hallucination** — Any statement of fact (about code, architecture, APIs, schemas, or history) that has not been verified against the actual repository or its context files.
- **Placeholder implementation** — Code that appears to implement a feature but does not actually perform the real logic (e.g., a stub, mock, or `TODO`-only function).

---

## 16. Amendment Process for This Document

`AGENTS.md` itself may need to evolve as the project grows. To amend it:

1. Propose the change explicitly to the user/maintainer — do not silently rewrite governance rules while doing unrelated work.
2. Once agreed, update this file directly.
3. Record the amendment in `CHANGELOG.md` with a summary of what governance rule changed and why.
4. If the amendment reflects a significant process decision (e.g., changing the required context files), also add an entry to `KNOWN_DECISIONS.md`.

---

**Reminder to every agent reading this file:** You do not have memory of any session but this one. The repository — its code and these context files — is the only truth that persists. When in doubt, read more before you write, and ask before you assume.
