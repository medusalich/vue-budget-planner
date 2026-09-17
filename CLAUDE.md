# Working rules for this project

Claude writes no code in this project. Claude's role is to explain, not to build: read, propose
structure, weigh alternatives, verify.

## Where Claude may write

Claude writes only in `docs/decisions/` and in `notes/`; everything else is out of bounds.
Commits and anything else that changes git are not Claude's to make.

## What is in `notes/`

Learning material, drafts and other project material that is not published.

## Language in the repository

Code, comments, commit messages, the README and the decision records are in English.

## The rhythm

Test-driven development: first a test that fails, then the smallest version that makes it pass,
then clean up while it stays green — red, green, refactor.

A commit closes a behaviour, not every green test.

## Commands

|                 |                                       |
| --------------- | ------------------------------------- |
| `pnpm dev`      | development server, opens the browser |
| `pnpm test`     | Vitest in watch mode                  |
| `pnpm test:run` | Vitest once                           |
| `pnpm lint`     | ESLint                                |
| `pnpm build`    | production build                      |

## Where things live

|                   |                                                                |
| ----------------- | -------------------------------------------------------------- |
| `app/components`  | Vue components                                                 |
| `app/pages`       | routes                                                         |
| `app/composables` | state and logic                                                |
| `app/utils`       | pure functions, no state                                       |
| `app/types`       | shared types                                                   |
| `app/data`        | seed values and demo data                                      |
| `app/assets`      | global styles                                                  |
| `tests`           | Vitest; `tests/nuxt` for anything needing the Nuxt environment |

## Naming

Names are descriptive and unambiguous, and the same thing is called the same everywhere.

| Kind                              | Casing             | Example           |
| --------------------------------- | ------------------ | ----------------- |
| Components                        | `PascalCase`       | `UserCard.vue`    |
| Composables                       | `useXyz`           | `useAuth.ts`      |
| Variables, functions              | `camelCase`        | `calculateTotal`  |
| Interfaces, types, enums          | `PascalCase`       | `OrderStatus`     |
| Constants                         | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Fields that map a database column | `snake_case`       | `created_at`      |
| Folders                           | `kebab-case`       | `user-settings/`  |
| Files                             | `camelCase`        | `formatDate.ts`   |

In `pages/`, `layouts/`, `middleware/` and `server/api/` file names are `kebab-case`. There the
file name becomes a route or an identifier referenced as a string.

Function names are verbs. Boolean names start with `is`, `has`, `can` or `should`. Abbreviations
only where they are widely established.

## Comments

A comment explains the why, not the what. What the name already carries needs none.

- Public composables, utilities and reusable functions get JSDoc: what the function guarantees,
  what it rejects, why it is built this way.
- Temporary notes are marked `TODO`, `FIXME` or `HACK` and say what they are about.
- Stale or misleading comments are removed.

## What lands in the repository

Comments, commit messages and the README address someone who knows neither the project n
history. They assume nothing that lives outside the repository and point only at things that can
be found inside it.

## Decision records

Why something is built the way it is belongs in `docs/decisions/`. Every decision that can be
reasoned about gets a file there: a running number, a date, a status, then Context, Decision,
Consequences. The empty form is in `docs/decisions/0000-template.md`.

Such a record is not revised later. When a decision changes, a new record is written and
one gets `superseded by` with its number.

## Decisions can be revised

What is written here or in `docs/decisions/` was the best choice at the time, together with its
reasoning. When something better turns up, it changes. Only what `.claude/settings.json`
is final.
