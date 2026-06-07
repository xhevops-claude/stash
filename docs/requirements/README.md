# Requirements

What Stash does and why. Each requirement has its own page; this overview ties them together and holds the cross-cutting notes (design decisions, open questions, future scope, non-goals).

## Vision

Each drive carries its own catalog inside a `.catalog/` folder at its root. The drive is **self-describing**: plug it into any machine running Stash and it knows what's on it. No central server-side catalog to drift out of sync.

The web tool is a reader/scanner over whatever drives are currently visible — it aggregates per-drive catalogs at runtime.

## Prototype requirements

| ID | Requirement | What it covers |
|---|---|---|
| [R1](./indexing.md) | Indexing | Scan a drive, record metadata into its catalog |
| [R2](./metadata.md) | Metadata captured | Path, size, timestamps, type, content hash |
| [R3](./search.md) | Search | Quick metadata search via FTS5 |
| [R4](./duplicate-detection.md) | Duplicate detection | Within-drive and cross-drive dupes |
| [R5](./drive-management.md) | Drive identity & management | UUIDs, virtual mount/unmount |
| [R6](./file-operations.md) | File operations | Delete files from the UI |

## Design decisions

| Decision | Choice | Reason |
|---|---|---|
| Catalog location | `<drive-root>/.catalog/` | Self-describing drive, travels with the data |
| Catalog folder name | `.catalog` | Clear, self-explanatory. Personality deferred until virtual-paths feature lands |
| Database | SQLite | Portable single file, no server, FTS5 search |
| Drive identification | UUID stored in catalog | Survives remount under different paths |
| Runtime | .NET 10 (C#) | Cross-platform, async-first I/O, strong filesystem and crypto APIs |
| Web framework | ASP.NET Core + Blazor | One stack from API to UI; SignalR built-in for scan progress |

The big ones get their own [Architecture Decision Record](../decisions/) — e.g. [ADR 0001 — SQLite per drive](../decisions/0001-sqlite-per-drive.md).

## Open decisions

- **Blazor rendering mode** — Server vs WebAssembly vs unified. Server likely fits best given the local-tool, direct-filesystem model.
- **SQLite access** — raw `Microsoft.Data.Sqlite` vs Dapper vs EF Core.
- **Hash algorithm** — SHA-256 (built-in) vs BLAKE3 (faster, needs NuGet).
- **Duplicate detection algorithm** — likely tiered (size filter → partial hash → full hash). To be designed before implementing [R4](./duplicate-detection.md).
- **File-type scope** — initial prototype indexes all files; type-specific extractors (EXIF, ID3) come later.

## Future

Explicitly **deferred** — not in prototype scope, but noted so today's choices don't paint us into a corner.

- **Virtual paths / shelves** — group files from different physical paths into albums/shelves. May revisit the `.catalog/` folder name for more personality (`.shelf/`, `.atlas/`).
- **Quick discovery / drive-state sync** — lightweight path-only scan that flags orphaned records (in catalog, gone from disk). Idempotent; user confirms removals.
- **Disc comparison** — diff exactly two drives (identical / differs / only-here / moved), by relative path and content hash. Distinct from [R4](./duplicate-detection.md): R4 *groups* dupes, this *reconciles* two drives. Relies on [relative paths](../decisions/0002-relative-paths.md).
- **Read-only drive support** — the current model assumes writable drives.
- **Background / scheduled rescans** — initial version is on-demand only.
- **Richer metadata extraction** — EXIF (incl. GPS), ID3, video codecs, document authors.

## Non-goals (for now)

- Central server / multi-user catalog.
- Cloud sync.
- Networked drives (NFS, SMB) — not excluded, but not a design target.
- Read-only media (optical discs, write-protected drives).
