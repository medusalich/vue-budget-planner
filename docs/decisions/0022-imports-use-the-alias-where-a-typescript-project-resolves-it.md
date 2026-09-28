# 0022 — Imports use the alias where a TypeScript project resolves it

**Status:** accepted
**Date:** 2026-08-25

## Context

The repository carried two import styles for four days. The original rule was relative paths
everywhere, written when the test runner still ran without the framework configuration and could
not resolve the alias at all. That reason disappeared when the test environment changed on
2026-08-21. The rule outlived it.

The alias is translated by a `paths` entry in a generated TypeScript config, and that entry only
reaches the folders the same config includes. The runtime alias and the type checker's alias are
separate things, and outside those folders only the second one is missing. What that does to a
file is described in
[0020](0020-framework-dependent-tests-live-in-their-own-folder.md).

## Decision

Imports use the `~/` alias wherever a TypeScript project resolves it, and relative paths where
none does.

## Consequences

Inside the application, and inside the tests that need the framework, an import reads the same
from any depth and survives a file being moved.

The top-level tests keep relative paths. A relative path needs no project configuration at all,
which is exactly why those files can sit outside every project and still type-check from their
own imports.

The mixed style in the tree is therefore intended. A reader who normalises it will break the type
checking of the files they normalise.
