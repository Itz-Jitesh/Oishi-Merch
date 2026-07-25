# Known Decisions

## Use Repository Context Files As Verified Project Memory

**Date:** 2026-07-24

**Status:** Accepted

**Context:** The repository had empty context files and a `CLAUDE.md` that described planned systems not implemented in the current codebase. Future work needs a reliable distinction between verified current implementation and future intent.

**Decision:** The canonical context files at the repository root must describe only verified current state unless a section is explicitly marked as future work. `KNOWN_DECISIONS.md` is the canonical decision log filename. The existing `KNOWN_DECISION.md` is retained as a pointer for compatibility.

**Alternatives considered:** Leaving context files empty was rejected because it forces future agents to rediscover the codebase. Treating planned systems in `CLAUDE.md` as implemented was rejected because the codebase does not contain those systems.

**Consequences:** Documentation must be updated alongside code changes. Future backend, database, authentication, or API decisions must be recorded here before docs describe them as implemented.
