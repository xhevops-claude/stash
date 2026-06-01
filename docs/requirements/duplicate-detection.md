# R4 — Duplicate detection

**Status:** Prototype scope

## Summary

Find duplicate files, within one drive or across several.

## Behavior

- **Within a single drive.**
- **Cross-drive, on demand** — e.g. "compare drive 1 and drive 2, show me the duplicates."
- Results are presented to the user; **the user decides** what to keep or delete.

## Related

- [Architecture: Duplicate Detection](../architecture/duplicate-detection.md) — the tiered hashing algorithm
- [R2 — Metadata captured](./metadata.md) — the content-hash field
- [Requirements overview](./README.md)
