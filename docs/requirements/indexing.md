# R1 — Indexing

**Status:** Prototype scope

## Summary

Scan a mounted drive and record file metadata into its `.catalog/` SQLite database.

## Behavior

- Walk the drive's filesystem and record [metadata](./metadata.md) for every file.
- **Idempotent** — re-running a scan updates the existing catalog in place; it never creates duplicate records.
- The **first scan** on a drive initializes the catalog (`<drive-root>/.catalog/index.db`) and assigns a stable [drive UUID](./drive-management.md).

## Related

- [R2 — Metadata captured](./metadata.md) — what each scan records
- [Architecture: Scan Flow](../architecture/scan-flow.md) — idempotent fast-path, schema init/migration
- [Requirements overview](./README.md)
