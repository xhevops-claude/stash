# Architecture Decision Records

This folder holds [ADRs](https://adr.github.io/) — one file per significant architectural decision.

## Why ADRs

An ADR captures *why* a decision was made, what alternatives were considered, and the tradeoffs accepted. Six months later, when someone asks "why did we pick X?", the answer is here instead of buried in chat history or commit messages.

## Format

Each ADR is a numbered markdown file: `NNNN-short-title.md`.

Standard sections:

- **Status** — proposed / accepted / superseded
- **Context** — what problem we were solving
- **Decision** — what we chose
- **Alternatives** — what else we considered, why we didn't pick them
- **Consequences** — what we're now committed to, good and bad

**ADRs are immutable once accepted.** To change a decision, write a *new* ADR that supersedes the old one. The old one stays in the folder as historical record.

## Index

| #    | Title                                            | Status   |
| ---- | ------------------------------------------------ | -------- |
| [0001](./0001-sqlite-per-drive.md) | SQLite per drive                  | Accepted |
| [0002](./0002-relative-paths.md) | Relative paths                      | Accepted |
| [0003](./0003-change-detection-and-hashing.md) | Change detection & hashing | Accepted |
