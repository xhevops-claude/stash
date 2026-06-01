# Stash

A web-based catalog for your disks. Plug in a drive, scan it, and search across everything you've ever stored — across one drive or many at once.

Inspired by [Calibre](https://calibre-ebook.com/) — but for entire drives instead of books. Each drive carries its own catalog in a `.catalog/` folder at its root, so the drive is self-describing and the catalog travels with the data.

## Status

Early planning. No code yet — design is being captured in [docs/](./docs/).

## Docs

- [Requirements](./docs/requirements/) — what Stash does and why.

## Planned features

- Per-drive SQLite catalogs — portable, no central server
- Quick search across metadata (name, path, size, timestamps)
- Cross-drive duplicate detection
- Virtual mount/unmount in the UI (handy when juggling many drives)
- File operations through the web UI
