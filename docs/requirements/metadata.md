# R2 — Metadata captured

**Status:** Prototype scope

## Summary

The metadata fields recorded for each file during [indexing](./indexing.md).

## Fields

- **Path** — filesystem path, relative to the drive root (keeps the catalog valid regardless of mount point).
- **Size** — file size in bytes.
- **Timestamps** — created, modified, accessed.
- **Type** — file extension / type.
- **Content hash** — used for [duplicate detection](./duplicate-detection.md). Algorithm TBD, likely tiered.

> **Note:** "location" here means *filesystem path*. Richer location data (e.g. EXIF GPS) is a [future](./README.md#future) consideration.

## Related

- [R1 — Indexing](./indexing.md)
- [Architecture: Data Model](../architecture/data-model.md)
- [Requirements overview](./README.md)
