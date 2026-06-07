# R1 — Indexing

**Status:** Prototype scope

## Summary

Scan a mounted drive and record file metadata into its `.catalog/` SQLite database.

## Behavior

- Walk the drive's filesystem and record [metadata](./metadata.md) for every file.
- **Idempotent** — re-running a scan updates the existing catalog in place; never creates duplicates.
- The **first scan** initializes the catalog (`<drive-root>/.catalog/index.db`) and assigns a stable [drive UUID](./drive-management.md).
- Files removed from disk are **soft-deleted** in the catalog (kept for history), not erased.

The full algorithm — idempotent decision, three phases, crash behavior — lives in [Architecture: Scan Flow](../architecture/scan-flow.md).

## Scan kinds

- **Full** (default) — fast-path scan using the `(size, mtime)` fingerprint to skip unchanged files.
- **Deep** — ignores the fast path and re-hashes everything; for when a tool may have changed content while preserving `mtime`.
- **Discovery** (future) — path-only pass to flag drift without full metadata.

## Scan history

Every run is recorded (start/finish, status, and +added / Δchanged / −removed / skipped counts), so the UI can show *"Disc 2 — scanned 2026-05-30, 1.2M files, +340 / Δ58 / −12."*

## Progress

Scans report live progress as **X of Y files** (plus bytes). A cheap count pass establishes the total before the main pass — see [Scan Flow → Phase 0](../architecture/scan-flow.md).

## Scale

Designed for **millions of files**: streaming traversal, batched writes, and bounded memory — the scan never loads the full file list or the whole catalog at once.

## Related

- [R2 — Metadata captured](./metadata.md)
- [Architecture: Scan Flow](../architecture/scan-flow.md)
- [ADR 0003 — Change detection & hashing](../decisions/0003-change-detection-and-hashing.md)
- [Requirements overview](./README.md)
