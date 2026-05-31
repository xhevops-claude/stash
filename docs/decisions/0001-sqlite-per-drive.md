# ADR 0001 — One SQLite catalog per drive

**Status:** Accepted
**Date:** 2026-05-31

## Context

Stash catalogs files across multiple drives. The catalog needs to be:

- **Portable** — drives move between machines; the catalog should travel with them.
- **Fast to search** — over text (paths, names) and numeric metadata (size, timestamps).
- **Zero-infrastructure** — usable without setting up a server, daemon, or external service.

The driving architectural premise is that **each drive should be self-describing**: plug it into any machine running Stash and the catalog is right there on the drive.

## Decision

Each drive carries one SQLite database file at `<drive-root>/.catalog/index.db`. The app reads and writes to each drive's catalog independently. Cross-drive queries are runtime aggregation over multiple SQLite connections (e.g. `ATTACH DATABASE` or in-memory joins in app code).

## Alternatives considered

### MongoDB (or any client/server DB)

Requires a running server process (`mongod`, `postgres`, etc.) somewhere. That breaks the self-describing-drive model — plugging the drive into a new machine isn't enough; you'd need to provision the server too. Centralizes what we explicitly wanted decentralized.

### Central SQLite catalog (single DB for all drives)

Faster cross-drive queries (one connection, one query). But the catalog lives somewhere — that "somewhere" is either tied to one machine or has to be synced across machines. Either way the drive is no longer self-describing, which was the whole architectural premise.

### Custom binary index format

Smaller and lighter than SQLite. But we'd lose: SQL queries, FTS5 full-text search, ACID guarantees, mature cross-platform tooling, and the ability for any developer to inspect a catalog with the `sqlite3` CLI. Reinventing a storage engine to save a few megabytes is poor value.

## Consequences

**Positive:**

- The drive is portable in the strongest sense: plug it in, the catalog is right there. No app state to sync.
- Zero infrastructure — no server process, no setup beyond the app itself.
- SQLite FTS5 gives fast text search for free.
- Mature ecosystem; debuggable with the `sqlite3` CLI on any OS.
- Schema can evolve per-drive; old catalogs migrate lazily when opened.

**Negative / trade-offs accepted:**

- Cross-drive queries require opening multiple DBs and aggregating in app code. Slower than a single index would be, but acceptable for expected query volumes (handful of drives, modest result sets).
- Schema evolution must handle drives created against older app versions — needs explicit `schema_version` tracking + lazy migration on open. (Captured as a constraint in the [Scan Flow](../architecture/scan-flow.md).)
- SQLite serializes concurrent writes to a single DB. Acceptable since we're single-user and each drive's catalog has at most one writer at a time.

## Related

- [Architecture: Data Model](../architecture/data-model.md)
- [Requirements](../requirements.md)
