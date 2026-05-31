# Duplicate Detection

> 🚧 Not yet drafted. Will land after the algorithm is agreed in chat.

## What this will cover

- Tiered hashing algorithm: size filter → quick hash (first 4KB) → full hash (SHA-256 / BLAKE3, TBD)
- Why tiered: most files are unique by size and never need to be hashed
- Hash caching in the catalog so subsequent runs are fast
- Cross-drive aggregation strategy (SQLite `ATTACH` vs in-memory join)
- Result presentation: grouped by content hash, user picks per group (keep / delete / ignore)

## Open questions

- Hash algorithm choice — SHA-256 vs BLAKE3 (see [requirements.md → Open Decisions](../requirements.md#open-decisions))
- Quick-hash chunk size — 4KB is a starting point but worth measuring

## Related

- [Requirements → Duplicate Detection](../requirements.md)
- [Data Model](./data-model.md)
- [Architecture index](./README.md)
