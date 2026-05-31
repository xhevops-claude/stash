# Stash — Requirements

A web-based tool for indexing, searching, and managing files across multiple disks/drives. Inspired by Calibre's library model, but applied to entire drives rather than books.

## Vision

Each drive carries its own catalog inside a `.catalog/` folder at its root. The drive is **self-describing**: plug it into any machine running the tool and it knows what's on it. No central server-side catalog to drift out of sync.

The web tool is a reader/scanner over whatever drives are currently visible — it aggregates per-drive catalogs at runtime.

## Architecture

- **Interface:** local web app (browser-based UI, local server).
- **Storage:** one SQLite database file per drive, stored in `<drive-root>/.catalog/`.
  - SQLite chosen for portability: single file, zero-config, opens on any OS, no server process.
  - SQLite FTS5 used for fast text search.
  - MongoDB rejected: requires a running `mongod`, which breaks the "drive carries its own index" model.
- **Drives:** assumed writable. The tool can delete files via the UI.

## Core Features (Prototype)

### 1. Indexing
- Scan a mounted drive and record file metadata into its `.catalog/` SQLite DB.
- Idempotent: re-running scan updates the existing catalog without duplicating.
- First scan on a drive initializes the catalog and assigns a stable **drive UUID**.

### 2. Metadata Captured
- Filesystem path (relative to drive root).
- File size.
- Timestamps (created, modified, accessed).
- File type / extension.
- Content hash (for duplicate detection — algorithm TBD, likely tiered).

> Note: "location" in this context means filesystem path. Richer location data (e.g. EXIF GPS) is a future consideration.

### 3. Search
- Quick search across metadata: name, path, size, timestamps, type.
- Backed by SQLite FTS5 for text fields.

### 4. Duplicate Detection
- **Within a single drive.**
- **Cross-drive**, on demand: "compare drive 1 and drive 2, show me duplicates."
- Results presented to the user; the user decides what to delete or keep.

### 5. Drive Identity & Management
- Each drive gets a UUID, generated and stored in its `.catalog/` on first scan.
- Drives are identified by UUID, not mount path (so `E:` vs `F:` doesn't matter across sessions).
- Users can **virtually mount/unmount** drives in the UI. This narrows search scope — important when the user is working with many drives (e.g. 20 SD cards) and knows the file is on SD 1, 2, or 3.

### 6. File Operations
- Delete files through the UI (writes back to the drive and updates the catalog).

## Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Catalog location | `<drive-root>/.catalog/` | Self-describing drive, travels with the data |
| Catalog folder name | `.catalog` | Clear, self-explanatory. Personality (e.g. `.shelf`) deferred until virtual-paths feature lands |
| Database | SQLite | Portable single file, no server, FTS5 search |
| Drive identification | UUID stored in catalog | Survives remount under different paths |

## Open Decisions

- **Language / stack** — not yet chosen.
- **Duplicate detection algorithm** — likely tiered (size filter → partial hash → full hash) to balance speed and correctness. To be designed before implementing dupes feature.
- **File-type scope** — initial prototype indexes all files; later we may add type-specific metadata extractors (EXIF for images, ID3 for audio, etc.).

## Future / Post-Prototype

These are explicitly **deferred** — not in the prototype scope, but noted so design choices today don't paint us into a corner.

### Virtual paths / shelves
- Group files from different physical paths into "albums" or "shelves."
- Example: pick 10 files from 10 different folders and present them as one collection.
- When this lands, may revisit the `.catalog/` name for something with more personality (`.shelf/`, `.atlas/`, `.tome/`).

### Quick discovery / drive-state sync
- Lightweight scan that only checks paths (not full metadata) against the catalog.
- Flags drift: files in catalog that no longer exist on disk ("orphaned records").
- Idempotent; user confirms before any record removal.

### Read-only drive support
- Not in prototype. The current model assumes writable drives.

### Background / scheduled rescans
- Not in prototype. Initial version is on-demand only.

### Richer metadata extraction
- EXIF (including GPS), ID3, video codecs, document authors, etc.

## Non-Goals (for now)

- Central server / multi-user catalog.
- Cloud sync.
- Networked drives (NFS, SMB) — not explicitly excluded, but not a design target.
- Read-only media (optical discs, write-protected drives).
