# R5 — Drive identity & management

**Status:** Prototype scope

## Summary

Stable identity for drives, plus a way to scope which drives are in play.

## Behavior

- Each drive gets a **UUID**, generated and stored in its `.catalog/` on first scan.
- Drives are identified by **UUID, not mount path** — so `E:` vs `F:` across sessions doesn't matter.
- Users can **virtually mount/unmount** drives in the UI. This narrows search scope — important when working with many drives (e.g. 20 SD cards) and you know the file is on SD 1, 2, or 3.

## Related

- [R1 — Indexing](./indexing.md) — UUID assigned on first scan
- [Architecture: Drive Lifecycle](../architecture/drive-lifecycle.md) — the state machine
- [Requirements overview](./README.md)
