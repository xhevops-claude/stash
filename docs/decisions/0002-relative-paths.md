# ADR 0002 — Store file paths relative to the drive root

**Status:** Accepted
**Date:** 2026-06-07

## Context

Each file in the catalog needs a path. The drive may be mounted at different points over time (`E:`, `F:`, `/mnt/x`) and on different machines. We also want to support a future **disc-comparison** feature ("compare Disc 1 vs Disc 2").

## Decision

Store each file's path **relative to the drive root** (e.g. `photos/2024/a.jpg`), never absolute (`E:\photos\2024\a.jpg`).

## Alternatives considered

### Absolute paths

Simple to capture, but tied to a mount point. The catalog would break the moment the drive remounts at a different letter, and would be meaningless on another machine — defeating the self-describing-drive premise ([ADR 0001](./0001-sqlite-per-drive.md)).

## Consequences

**Positive:**

- Catalog stays valid regardless of mount point or machine.
- **Disc comparison works**: lining up `photos/a.jpg` ↔ `photos/a.jpg` across two drives is only meaningful with relative paths. This decision is load-bearing for that future feature.
- `path` is a stable identity and lookup key for the [scan](../architecture/scan-flow.md).

**Negative / trade-offs:**

- To open or operate on a file, the app joins the relative path with the drive's current mount point at runtime — a trivial concatenation.

## Related

- [ADR 0001 — SQLite per drive](./0001-sqlite-per-drive.md)
- [Data Model](../architecture/data-model.md)
