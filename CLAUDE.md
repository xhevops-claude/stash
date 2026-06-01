# CLAUDE.md — Working on Stash

Read this first. It's how we collaborate on this project.

## What this is

Stash is a web-based catalog for disks/drives — see [README.md](./README.md) and [docs/requirements.md](./docs/requirements.md).

## Working style

- **Discuss first, code later.** Big decisions get talked through before code lands. Default cadence is chat → agree → act.
- **Default to chat output.** Brainstorming, naming, weighing options — keep it in chat. Write to disk only when the user asks, or when the scope is clearly settled.
- **Show diagrams inline.** ASCII in chat first so the user actually sees them. Commit mermaid to docs only after the shape is agreed.
- **Prototype-first.** Ship the boring functional version first; personality and polish are deferred (see [docs/requirements.md → Future](./docs/requirements.md#future--post-prototype)).
- **Confirm before destructive actions.** Renames, deletes, restructuring, edits to committed files.
- **Push back with reasoning.** Don't be a yes-machine. Recommend with tradeoffs.

## Git workflow

- Trunk: `main` — **protected**. All changes land via PR; no direct pushes to main.
- **Every feature request → auto-create `feature/<slug>-<NNNN>`** (NNNN = 3–4 random digits, collision suffix).
  - Example: "add EXIF parsing" → `feature/exif-parsing-4821`
  - Don't ask permission, just do it. Confirm the slug only if ambiguous.
  - Skip for doc edits, renames, in-progress refinements, project-admin tasks.
- **PRs merge only after CI is fully green** — build pipeline complete, every workflow finished and passing. Don't merge with pending checks. Don't merge with failures. If checks fail, fix on the branch and push again — don't bypass.
- **After merge, delete the local feature branch** — `git checkout main && git pull --ff-only && git branch -d <branch>`. The remote side is automatic via the `delete_branch_on_merge` repo setting (see [Repo settings](#repo-settings) below).
- Do **not** commit unless explicitly asked.
- Do **not** push unless explicitly asked.

## PR lifecycle

End-to-end flow for shipping any change to `main`:

```
branch → commit → push -u → gh pr create → gh pr checks --watch → gh pr merge --merge → local cleanup
```

- **Open the PR** with `gh pr create --base main --title "..." --body "..."`. Body uses `## Summary` + `## Test plan` sections.
- **Watch CI** with `gh pr checks <pr> --watch` (blocks until all checks finish).
- **Merge** with `gh pr merge <pr> --merge` once CI is fully green.
- **Local cleanup:** `git checkout main && git pull --ff-only && git branch -d <branch>`.

The repo has `delete_branch_on_merge: true`, so GitHub auto-deletes the source branch on merge — no `--delete-branch` flag needed on `gh pr merge`.

## Repo settings

Auto-delete head branches on merge is **on** for this repo. Verify and (if needed) enable on every new project repo before opening the first PR:

```bash
# Check
gh api repos/<owner>/<repo> --jq .delete_branch_on_merge

# Enable if false
gh api -X PATCH repos/<owner>/<repo> -f delete_branch_on_merge=true
```

## Stack

Decided:
- **.NET 10** (LTS)
- **C#**
- **ASP.NET Core** — HTTP API + hosting
- **Blazor** — UI

Open within the stack:
- Blazor rendering mode (Server vs WebAssembly vs unified). Server likely fits best given the local-tool, direct-filesystem model.
- SQLite access (raw `Microsoft.Data.Sqlite`, Dapper, or EF Core).
- Hash algorithm (SHA-256 vs BLAKE3).
- Duplicate detection tier specifics.

## Layout

`docs/` is the source of truth — decisions land there as they're made.

- `docs/requirements.md` — the WHAT
- `docs/architecture/` — the HOW (folder of focused topics; see folder README)
- `docs/decisions/` — Architecture Decision Records (numbered, immutable once accepted)
- `docfx.json` — DocFX config for the rendered docs site (`docfx --serve` once .NET 10 + DocFX are installed)

## Tone

User speaks casually ("aight", "yupp", "bro"). Match that register: terse, direct, lowercase-friendly, no corporate hedging.
