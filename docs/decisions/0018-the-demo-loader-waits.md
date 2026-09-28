# 0018 — The demo loader waits

**Status:** accepted
**Date:** 2026-08-21

## Context

`loadTransactions` is asynchronous in both implementations, because the live one reaches across
the network. The demo implementation has nothing to wait for.

A function marked `async` does not run beside anything. Its body executes top to bottom and
pauses only at an `await`. A demo loader without one finishes before its caller resumes, so
`isLoading` would be set to `true` and back to `false` within a single uninterrupted run. No
component could ever observe it as `true`.

## Decision

The demo implementation waits a deliberate 150 ms before it hands over the data.

## Consequences

A loading state nobody can observe is a loading state nobody builds against, and the demo
interface would quietly diverge from the live one it stands in for. The public demo exercises its
own loading path instead of jumping to the finished list.

Every test that calls the loader pays those 150 ms. At this size that is negligible, and a suite
that outgrows it can advance the clock with fake timers.
