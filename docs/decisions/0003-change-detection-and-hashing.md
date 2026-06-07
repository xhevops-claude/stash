# ADR 0003 — `(size, mtime)` change detection with lazy tiered hashing

**Status:** Accepted
**Date:** 2026-06-07

## Context

A scan must decide, per file, whether it's new / changed / unchanged — over potentially millions of files — without re-reading content unnecessarily. Separately, [R4 duplicate detection](../requirements/duplicate-detection.md) and the future disc-comparison need content identity (hashes).

## Decision

1. **Change detection** uses the `(size, mtime)` fingerprint. Matching fingerprint → unchanged → skip (fast path). Differing → re-process.
2. **Hashing is tiered and lazy:**
   - `hash_quick` (first 4KB) is recorded during the scan — cheap.
   - `hash_full` (SHA-256 / BLAKE3) is **nullable**, computed only when a dupe-check or comparison needs it, then cached.
3. The dupe / compare ladder is **size → quick-hash → full-hash**, cheapest filter first.

## Alternatives considered

### Content-hash change detection

Hash every file on every scan to detect changes. Correct, but defeats the purpose — hashing is the expensive thing we're trying to avoid on unchanged files. Rejected for the default scan; offered instead as an explicit **deep rescan**.

### Eager full hashing on scan

Compute `hash_full` for every file during the scan. Gives instant dupe results, but makes every scan slow (a full content read of everything). Rejected in favor of lazy hashing; the first dupe-run pays the cost once, then it's cached.

## Consequences

**Positive:**

- Fast scans — an unchanged file costs one `stat` plus one indexed lookup.
- `size` does double duty (fingerprint + dupe tier-1) — no extra storage.
- Dupe / compare work is paid lazily and cached.

**Negative / trade-offs:**

- `mtime` can be preserved by some tools (`rsync --times`, `cp -p`), so a content change with identical `(size, mtime)` is missed by the default scan. Mitigated by the **deep rescan** option.
- The first dupe-check over a large unhashed set is slow (one-time, then cached).

## Open

- **Hash algorithm** — SHA-256 (ubiquitous) vs BLAKE3 (faster). Unresolved.
- **Progress totals** — count-pass (exact *X of Y*, ~5–15% slower on fresh discs) vs estimate from the previous scan. Currently leaning count-pass.

## Related

- [Scan Flow](../architecture/scan-flow.md)
- [Data Model](../architecture/data-model.md)
- [R1 — Indexing](../requirements/indexing.md)
