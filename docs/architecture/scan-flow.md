# Scan Flow

> 🚧 Not yet drafted. Will land after the scan flow is agreed in chat.

## What this will cover

- Sequence diagram of a scan from user click to completion
- First-scan catalog initialization (mkdir, schema creation, UUID assignment)
- Idempotent re-scan with the `(size, mtime)` fast-path
- Tiered hashing on changed/new files
- Soft-delete of files that disappeared from disk
- Progress streaming back to the UI (SSE / SignalR)
- Schema migration on open (for catalogs created against older app versions)

## Related

- [Requirements → Indexing](../requirements.md)
- [Data Model](./data-model.md)
- [Architecture index](./README.md)
