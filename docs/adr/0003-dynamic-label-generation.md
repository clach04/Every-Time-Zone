# ADR 0003: Generate Timezone Labels Dynamically

## Status

Accepted

## Context

Timezone labels (e.g., "PST UTC-8") were previously hardcoded in `data.js`. With DST support, the abbreviation and offset change seasonally — PST becomes PDT, and the offset shifts from -8 to -7.

Two approaches:

1. **Static labels**: Store a fixed label per city, update manually twice a year
2. **Dynamic labels**: Compute the label at render time from the POSIX TZ string

## Decision

Generate labels dynamically using `posixTZ.getAbbr()` and the computed offset. Labels update on every render cycle.

## Consequences

- **Pro**: Labels always reflect the current state — no manual updates needed
- **Pro**: Single source of truth — the POSIX TZ string defines both the offset and the label
- **Con**: Small runtime cost (regex parse + date comparison per city per render)
- **Con**: Label format is fixed — harder to customize per-city formatting

## Alternatives Considered

- **Pre-compute and cache**: Calculate labels once on load, recompute only on date change. Slightly faster but adds complexity for minimal gain given ~10 cities
- **Static labels with manual updates**: Error-prone and requires maintenance twice yearly
