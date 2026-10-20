# 0041 — Someone else's transaction shows no edit button

**Status:** accepted
**Date:** 2026-09-29

## Context

Only the member who entered a transaction may edit it, see
[0033](0033-who-is-signed-in-is-its-own-composable.md). The dialog shows every transaction, so in
its viewing state it also shows ones the viewer may not change.

Three arrangements were considered: a disabled edit button, a line of text in place of the
button saying who may edit, or no button at all.

## Decision

The edit button appears only when the signed-in member may edit the transaction. Otherwise
nothing takes its place.

## Consequences

The rule of thumb behind it: a control is disabled when the person can enable it themselves, as
with saving before every required field is filled. It is left out when it is never open to them
in this context. A permission is the standard case of the second kind.

A disabled button drops out of the tab order. A button with an explanation below would be an
explanation plus a dead control.

The hint about who may edit is already there: the dialog header names the member who entered
the transaction.

The price is that a member who does not know the rule sees no reason why one transaction offers
editing and another does not.

A mistake in someone else's transaction is reported outside the app. Marking it in the app was
rejected for now: it needs new columns, and an exception to the permission rule that row-level
security can express per row but not per column. A button preparing a message through the Web
Share API was rejected because desktop browsers support it unevenly.
