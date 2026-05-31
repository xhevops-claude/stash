# Data Model

> 🚧 Not yet drafted. Will land after the data model is agreed in chat.

## What this will cover

- ER diagram of the per-drive catalog (drive, file, scan, tag, tag_link tables)
- Each table's purpose and key columns
- Indexes
- FTS5 virtual table setup for fast text search
- Schema versioning approach (drives created against older app versions)

## Related

- [Requirements](../requirements.md)
- [ADR 0001 — SQLite per drive](../decisions/0001-sqlite-per-drive.md)
- [Architecture index](./README.md)
