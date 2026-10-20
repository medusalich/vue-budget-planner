# 0043 — The discard question compares entered text

**Status:** accepted
**Date:** 2026-10-20

## Context

Closing the dialog while it holds input loses that input, so the dialog asks before it closes. A
question that also appears when nothing would be lost gets clicked away unread.

For a new transaction the test is simple: is any field filled? When editing, every field starts
filled, so that test is always true.

Two ways to tell whether an edit changed something were considered. One compares the text in each
field with the text it held when editing started. The other converts the fields into what would
be stored, cents and ids, and compares that with the stored transaction.

## Decision

A new transaction asks before closing when any field holds a value. An edit asks when the text of
any field differs from its text when editing started.

## Consequences

Comparing text needs no conversion. A half-typed amount differs from the starting text, so it
triggers the question without a rule of its own. A field added later is compared automatically.

The price is that an amount written differently but worth the same, `12,5` instead of `12,50`,
counts as a change. Asking once too often is preferred over missing a change.

The dialog keeps a copy of the form as it was when editing started.

Comparing meaning is rejected. It translates between the form and the stored shape in a second
place, for example an empty note against `null`. An amount that cannot be parsed needs a rule that
counts it as changed, and every new field has to be added to the comparison by hand.

A flag set on any input is rejected too. Changing a field and changing it back would count as a
change, and there would be no plain function to test.
