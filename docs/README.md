# Stash — Documentation

Welcome. Stash is a web-based catalog for disks/drives — see the [project README](../README.md) for the elevator pitch.

These docs are the **source of truth** for the design. Decisions land here as they're made; chat is for brainstorming, this folder is for what we agreed on.

## Where to find things

- **[Requirements](./requirements/)** — what Stash does and why.
- **[Architecture](./architecture/)** — how it's built. Components, data model, key flows.
- **[Decisions](./decisions/)** — Architecture Decision Records (ADRs). One file per major decision, immutable once accepted.

## How these docs are organized

- Every folder has a `README.md` that introduces what's in it.
- Markdown is the source. Anything that renders on GitHub also renders in DocFX.
- The root [`docfx.json`](../docfx.json) configures the rendered docs site — `docfx --serve` (once installed) brings up a navigable site at `localhost:8080`.

## Viewing the docs

You don't need DocFX to read these — any markdown viewer works (VS Code preview, GitHub, Obsidian, etc.). DocFX is just the polished navigable-site option.
