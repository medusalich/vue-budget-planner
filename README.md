# Budget Planner

A household ledger for recording income and expenses. Each entry has a date, a category, an
account and an optional note. Members of a household can view all entries and edit or delete
their own. The interface is in German.

Built with Nuxt 4, Vuetify 3 and Vitest.

**Status:** in development. The app currently runs on demo data held in memory; nothing is
stored, and reloading the page restores the original entries. A backend with sign-in is planned.

## Getting started

### Requirements

Tested with:

- Node.js 24.14
- pnpm 11.17

### Why pnpm

Install with pnpm, not npm or yarn. The supply-chain rules in `pnpm-workspace.yaml` are only read
by pnpm:

- new releases are installed only after they have been public for 14 days
  ([0007](docs/decisions/0007-releases-wait-before-they-are-installed.md))
- dependencies may not run install scripts
  ([0006](docs/decisions/0006-pnpm-runs-no-lifecycle-scripts-by-default.md))

Any other package manager skips both rules and ignores `pnpm-lock.yaml`.

### Install and run

```sh
pnpm install
pnpm dev
```

`pnpm dev` starts the development server and opens the app in the browser. No account, no
`.env` file and no database are needed.

## Commands

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `pnpm dev`      | development server, opens the browser |
| `pnpm test`     | Vitest in watch mode                  |
| `pnpm test:run` | Vitest once                           |
| `pnpm lint`     | ESLint                                |
| `pnpm build`    | production build                      |

## Decisions

Why the project is built the way it is, one record per decision:
[docs/decisions](docs/decisions/README.md).
