# ADR 0001: Use POSIX TZ Strings Over IANA Timezone Identifiers

## Status

Accepted

## Context

The app needs DST-aware timezone support. Two main approaches exist:

1. **IANA identifiers** (e.g., `America/New_York`) — requires a timezone database or browser `Intl` API
2. **POSIX TZ strings** (e.g., `PST8PDT,M3.2.0,M11.1.0`) — self-contained rules, no external data

The app must work offline as a single HTML page with no build step or server.

## Decision

Use POSIX TZ strings embedded directly in `data.js`.

## Consequences

- **Pro**: No external timezone database needed — the rule is in the string itself
- **Pro**: Works fully offline with zero dependencies
- **Pro**: Lightweight — ~100 lines of parser code
- **Con**: POSIX TZ strings don't handle historical timezone changes (only current rules)
- **Con**: Less precise for timezones with complex transition rules (e.g., Morocco, Palestine)
- **Con**: POSIX strings are less human-readable than IANA identifiers

## Alternatives Considered

- **IANA + Intl API**: Would require modern browsers and doesn't work offline in all environments
- **moment-timezone**: Heavy dependency (~70KB) for a simple offset lookup
- **Porting user's C/MicroPython code**: Possible but adds maintenance burden; the posixtz npm package's core parsing logic was simpler to extract and adapt
