# R3 — Search

**Status:** Prototype scope

## Summary

Quick search across file metadata.

## Behavior

- Search across: name, path, size, timestamps, type.
- Backed by **SQLite FTS5** for fast full-text search on text fields.

## Related

- [R2 — Metadata captured](./metadata.md) — the fields searched
- [Architecture: Data Model](../architecture/data-model.md) — FTS5 setup
- [Requirements overview](./README.md)
