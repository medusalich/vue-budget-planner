# 0021 — Failures are state, not exceptions

**Status:** accepted
**Date:** 2026-08-25

## Context

Three classes of failure need three different answers: input the user can fix immediately, a
rejection the system issues for a reason, and a service that is simply unavailable. Treating them
alike, as one generic message, is the most common weakness in applications of this size.

However they are distinguished, a component should not have to know how a failure arrives.

## Decision

The transaction composable exposes `error` as a caught `Error` or `null`, beside `isLoading`. Its
operations do not throw at their caller. A component reads `error` exactly as it reads
`isLoading`.

There is one `error` for the whole composable rather than one per operation. Every operation
clears it as its first statement, and `isLoading` is released in a `finally`.

## Consequences

The caught object survives, so the surface can tell *no connection* from *you may not change that
row*. That distinction becomes real once the database refuses a write with a code of its own. The
sentence a person reads is formed in the component, because a finished sentence stored in the
composable would tie the data layer to the surface.

One field is enough while no two operations run at once.

Clearing first keeps the message of a failed attempt from standing beside the result of a
successful one, where it is no longer true. The `finally` keeps a loading flag from being left
`true`, which would show a spinner that never stops.

The catch branch of the loader has no test until there is a network to fail. Forcing an in-memory
array to throw would test the demo data, not the behaviour.
