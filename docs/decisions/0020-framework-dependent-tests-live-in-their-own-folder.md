# 0020 — Framework-dependent tests live in their own folder

**Status:** accepted
**Date:** 2026-08-21

## Context

One folder division survives [0019](0019-the-whole-test-suite-runs-in-one-environment.md), for a
reason that has nothing to do with speed.

The root TypeScript configuration holds no files of its own. It references generated configs, and
those name the folders they cover. A test file outside those paths belongs to no TypeScript
project. The editor still opens it, but without the generated declarations, so framework symbols
are unknown and whatever they return becomes `any`. The error then surfaces far downstream, as an
implicit-`any` parameter somewhere unrelated. The test run is unaffected, because at runtime the
environment really is present. Only the type checker is blind.

Verified on 2026-08-21: a type-check listing covered 1059 files and not one of them came from the
tests folder.

## Decision

A test whose subject relies on anything the framework injects goes in `tests/nuxt/`. A test of
plain TypeScript may stay at the top level, where it type-checks from its own imports.

## Consequences

The rule is about type checking, not about execution. The runner still executes every file in one
environment and finds subfolders by itself.

The top-level tests keep relative imports, which is
[0022](0022-imports-use-the-alias-where-a-typescript-project-resolves-it.md) applied rather than an
exception to it.
