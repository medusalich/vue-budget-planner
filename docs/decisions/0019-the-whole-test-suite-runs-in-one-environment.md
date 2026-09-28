# 0019 — The whole test suite runs in one environment

**Status:** accepted
**Date:** 2026-08-21

## Context

Part of this codebase is plain TypeScript and part of it depends on the framework. Splitting the
suite accordingly, pure functions in bare Node and the rest in the framework environment, is the
obvious optimisation. It was tried.

## Decision

Every test runs in the framework's test environment, declared once in a short configuration file.
The split was made on 2026-08-21 and reverted the same day.

## Consequences

Measured warm, the framework environment adds about half a second to a run of eighteen tests.
Only the first run after a configuration change pays a cold start of roughly ten seconds. Half a
second does not buy two projects, two folders and a configuration four times the size.

What the split bought is given up knowingly. Nothing now stops a module meant to be plain
TypeScript from quietly coming to depend on an auto-import. That property is a matter of intent
rather than something a test would catch. The cost lands only if those functions are ever wanted
outside the framework, which nothing in this plan calls for.

The split can return in five minutes if the suite ever grows enough to want it.
