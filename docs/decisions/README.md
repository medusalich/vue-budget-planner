# Decision records

Why this project is built the way it is. One file per decision, numbered in the order the
decisions were taken, so reading from `0001` downwards is reading the project's history.

`accepted` means decided and in the code. `proposed` means decided but not built yet.

A record is never rewritten. When a decision changes, a new one is written and the old one gets
`superseded by` with its number, so what was thought at the time stays readable. The empty form
is in [0000-template.md](0000-template.md).

## By subject

### The domain: what gets recorded

- [0001](0001-money-is-stored-as-integer-cents.md) — Money is stored as integer cents
- [0002](0002-the-sign-lives-in-the-category.md) — The sign lives in the category, not in the amount
- [0003](0003-an-unknown-pot-instead-of-a-nullable-column.md) — An unknown pot instead of a nullable column
- [0004](0004-created-by-is-a-security-field-not-who-paid.md) — `created_by` is a security field, not who paid
- [0016](0016-money-moving-inside-the-household-is-not-recorded.md) — Money moving inside the household is not recorded

### Categories and accounts

- [0011](0011-category-ids-are-chosen-never-derived-from-the-name.md) — Category ids are chosen, never derived from the name
- [0012](0012-category-colours-are-validated-not-picked-by-eye.md) — Category colours are validated, not picked by eye
- [0013](0013-an-account-is-a-pot-of-money.md) — An account is a pot of money
- [0014](0014-account-ids-are-stable-slugs-not-uuids.md) — Account ids are stable slugs, not uuids

### What enters and leaves the repository

- [0006](0006-pnpm-runs-no-lifecycle-scripts-by-default.md) — pnpm runs no lifecycle scripts by default
- [0007](0007-releases-wait-before-they-are-installed.md) — Releases wait before they are installed
- [0015](0015-real-household-data-never-enters-the-repository.md) — Real household data never enters the repository

### Running without a database

- [0005](0005-demo-data-mirrors-the-schema.md) — Demo data mirrors the schema
- [0008](0008-demo-mode-shares-the-pages-of-live-mode.md) — Demo mode shares the pages of live mode
- [0017](0017-live-changes-propagate-without-a-reload.md) — Live changes propagate without a reload
- [0018](0018-the-demo-loader-waits.md) — The demo loader waits

### The data layer

- [0010](0010-entered-data-is-never-lost-to-an-error.md) — Entered data is never lost to an error
- [0021](0021-failures-are-state-not-exceptions.md) — Failures are state, not exceptions
- [0023](0023-the-write-interface-takes-only-what-a-form-can-supply.md) — The write interface takes only what a form can supply
- [0027](0027-categories-and-accounts-are-reached-through-composables.md) — Categories and accounts are reached through composables
- [0028](0028-shared-state-lives-in-module-scope-not-in-a-store.md) — Shared state lives in module scope, not in a store
- [0029](0029-named-accessors-instead-of-a-general-filter.md) — Named accessors instead of a general filter
- [0033](0033-who-is-signed-in-is-its-own-composable.md) — Who is signed in is its own composable

### Code organisation and tests

- [0009](0009-tests-live-in-a-top-level-folder.md) — Tests live in a top-level folder
- [0019](0019-the-whole-test-suite-runs-in-one-environment.md) — The whole test suite runs in one environment
- [0020](0020-framework-dependent-tests-live-in-their-own-folder.md) — Framework-dependent tests live in their own folder
- [0022](0022-imports-use-the-alias-where-a-typescript-project-resolves-it.md) — Imports use the alias where a TypeScript project resolves it
- [0024](0024-logic-leaves-the-component.md) — Logic leaves the component
- [0034](0034-calculation-is-separated-from-input-and-output.md) — Calculation is separated from input and output

### The interface

- [0025](0025-routing-is-introduced-before-it-is-needed.md) — Routing is introduced before it is needed
- [0026](0026-the-transaction-form-lives-in-a-dialog.md) — The transaction form lives in a dialog
- [0030](0030-four-device-sizes-not-mobile-first.md) — Four device sizes, not mobile-first
- [0031](0031-accessibility-targets-wcag-2-2-level-aa.md) — Accessibility targets WCAG 2.2 Level AA
- [0032](0032-appearance-comes-from-props.md) — Appearance comes from props

### The transaction list

- [0035](0035-a-row-shows-four-things.md) — A row shows four things
- [0036](0036-the-whole-row-is-the-control.md) — The whole row is the control
- [0037](0037-deleting-lives-only-in-the-dialog.md) — Deleting lives only in the dialog
- [0038](0038-the-list-has-one-appearance.md) — The list has one appearance
- [0039](0039-view-filters-wait.md) — View filters wait
- [0040](0040-the-special-states-come-from-the-framework.md) — The special states come from the framework

## In order

| #    | Date       | Status   | Decision                                                                                                                             |
| ---- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 0001 | 2026-08-12 | accepted | [Money is stored as integer cents](0001-money-is-stored-as-integer-cents.md)                                                         |
| 0002 | 2026-08-12 | accepted | [The sign lives in the category, not in the amount](0002-the-sign-lives-in-the-category.md)                                          |
| 0003 | 2026-08-12 | accepted | [An unknown pot instead of a nullable column](0003-an-unknown-pot-instead-of-a-nullable-column.md)                                   |
| 0004 | 2026-08-12 | accepted | [`created_by` is a security field, not who paid](0004-created-by-is-a-security-field-not-who-paid.md)                                |
| 0005 | 2026-08-12 | accepted | [Demo data mirrors the schema](0005-demo-data-mirrors-the-schema.md)                                                                 |
| 0006 | 2026-08-12 | accepted | [pnpm runs no lifecycle scripts by default](0006-pnpm-runs-no-lifecycle-scripts-by-default.md)                                       |
| 0007 | 2026-08-12 | accepted | [Releases wait before they are installed](0007-releases-wait-before-they-are-installed.md)                                           |
| 0008 | 2026-08-12 | proposed | [Demo mode shares the pages of live mode](0008-demo-mode-shares-the-pages-of-live-mode.md)                                           |
| 0009 | 2026-08-12 | accepted | [Tests live in a top-level folder](0009-tests-live-in-a-top-level-folder.md)                                                         |
| 0010 | 2026-08-12 | accepted | [Entered data is never lost to an error](0010-entered-data-is-never-lost-to-an-error.md)                                             |
| 0011 | 2026-08-20 | accepted | [Category ids are chosen, never derived from the name](0011-category-ids-are-chosen-never-derived-from-the-name.md)                  |
| 0012 | 2026-08-20 | accepted | [Category colours are validated, not picked by eye](0012-category-colours-are-validated-not-picked-by-eye.md)                        |
| 0013 | 2026-08-20 | accepted | [An account is a pot of money](0013-an-account-is-a-pot-of-money.md)                                                                 |
| 0014 | 2026-08-20 | accepted | [Account ids are stable slugs, not uuids](0014-account-ids-are-stable-slugs-not-uuids.md)                                            |
| 0015 | 2026-08-20 | accepted | [Real household data never enters the repository](0015-real-household-data-never-enters-the-repository.md)                           |
| 0016 | 2026-08-20 | accepted | [Money moving inside the household is not recorded](0016-money-moving-inside-the-household-is-not-recorded.md)                       |
| 0017 | 2026-08-21 | proposed | [Live changes propagate without a reload](0017-live-changes-propagate-without-a-reload.md)                                           |
| 0018 | 2026-08-21 | accepted | [The demo loader waits](0018-the-demo-loader-waits.md)                                                                               |
| 0019 | 2026-08-21 | accepted | [The whole test suite runs in one environment](0019-the-whole-test-suite-runs-in-one-environment.md)                                 |
| 0020 | 2026-08-21 | accepted | [Framework-dependent tests live in their own folder](0020-framework-dependent-tests-live-in-their-own-folder.md)                     |
| 0021 | 2026-08-25 | accepted | [Failures are state, not exceptions](0021-failures-are-state-not-exceptions.md)                                                      |
| 0022 | 2026-08-25 | accepted | [Imports use the alias where a TypeScript project resolves it](0022-imports-use-the-alias-where-a-typescript-project-resolves-it.md) |
| 0023 | 2026-08-27 | accepted | [The write interface takes only what a form can supply](0023-the-write-interface-takes-only-what-a-form-can-supply.md)               |
| 0024 | 2026-09-07 | accepted | [Logic leaves the component](0024-logic-leaves-the-component.md)                                                                     |
| 0025 | 2026-09-07 | accepted | [Routing is introduced before it is needed](0025-routing-is-introduced-before-it-is-needed.md)                                       |
| 0026 | 2026-09-07 | accepted | [The transaction form lives in a dialog](0026-the-transaction-form-lives-in-a-dialog.md)                                             |
| 0027 | 2026-09-07 | accepted | [Categories and accounts are reached through composables](0027-categories-and-accounts-are-reached-through-composables.md)           |
| 0028 | 2026-09-07 | accepted | [Shared state lives in module scope, not in a store](0028-shared-state-lives-in-module-scope-not-in-a-store.md)                      |
| 0029 | 2026-09-07 | accepted | [Named accessors instead of a general filter](0029-named-accessors-instead-of-a-general-filter.md)                                   |
| 0030 | 2026-09-07 | accepted | [Four device sizes, not mobile-first](0030-four-device-sizes-not-mobile-first.md)                                                    |
| 0031 | 2026-09-07 | accepted | [Accessibility targets WCAG 2.2 Level AA](0031-accessibility-targets-wcag-2-2-level-aa.md)                                           |
| 0032 | 2026-09-08 | accepted | [Appearance comes from props](0032-appearance-comes-from-props.md)                                                                   |
| 0033 | 2026-09-09 | accepted | [Who is signed in is its own composable](0033-who-is-signed-in-is-its-own-composable.md)                                             |
| 0034 | 2026-09-10 | accepted | [Calculation is separated from input and output](0034-calculation-is-separated-from-input-and-output.md)                             |
| 0035 | 2026-09-11 | accepted | [A row shows four things](0035-a-row-shows-four-things.md)                                                                           |
| 0036 | 2026-09-14 | accepted | [The whole row is the control](0036-the-whole-row-is-the-control.md)                                                                 |
| 0037 | 2026-09-14 | proposed | [Deleting lives only in the dialog](0037-deleting-lives-only-in-the-dialog.md)                                                       |
| 0038 | 2026-09-14 | accepted | [The list has one appearance](0038-the-list-has-one-appearance.md)                                                                   |
| 0039 | 2026-09-14 | accepted | [View filters wait](0039-view-filters-wait.md)                                                                                       |
| 0040 | 2026-09-14 | accepted | [The special states come from the framework](0040-the-special-states-come-from-the-framework.md)                                     |
