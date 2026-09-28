# 0040 — The special states come from the framework

**Status:** accepted
**Date:** 2026-09-14

## Context

A list has three states besides showing rows: loading, failed, and empty. The plan originally
foresaw a component of its own for the empty case.

## Decision

All three are framework components with a few properties: a progress indicator while loading, an
alert for a failure, an empty state for no rows. No component of our own.

The empty state carries the button for creating the first transaction, not only the bar above it.

## Consequences

The planned component falls away. What it would have been is four properties on something that
already exists, which follows from [0032](0032-appearance-comes-from-props.md).

The empty state is the first impression of the application. On the very first start it is the
only thing anyone sees, which is why the way forward belongs inside it.

A skeleton placeholder is rejected. It shows the shape of the list in advance and avoids the jump
when data arrives, but at fifteen rows the jump is bearable.

A spinner is visible and silent. The loading state needs to be announced, which is the same
live-region question as the feedback after saving. See
[0031](0031-accessibility-targets-wcag-2-2-level-aa.md).
