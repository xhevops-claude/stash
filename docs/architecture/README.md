# Architecture

How Stash is built. This folder breaks the architecture into focused topics — each file covers one aspect with its own diagrams and narrative.

## Contents

- **[System Overview](./overview.md)** — the system as a whole. Components, where they live, how they talk.
- **[Data Model](./data-model.md)** — per-drive SQLite schema, the ER diagram, indexes.
- **[Scan Flow](./scan-flow.md)** — what happens when a drive is scanned. Idempotency, fast path, schema migration.
- **[Duplicate Detection](./duplicate-detection.md)** — the tiered hashing algorithm and cross-drive aggregation.
- **[Drive Lifecycle](./drive-lifecycle.md)** — states a drive moves through (Unknown → Initialized → Mounted → Unmounted → Detached) and what triggers each transition.

## Conventions

- Diagrams use [Mermaid](https://mermaid.js.org/) — plain text, renders natively in GitHub, VS Code (with extension), and DocFX.
- Architecture content describes **current** design. Past decisions, alternatives, and the *why* behind them live in [decisions/](../decisions/).
- Each topic file is self-contained — read any one without needing context from another.
