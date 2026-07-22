# ADR 0002: Extract and Simplify posixtz Instead of Porting C/MicroPython Code

## Status

Accepted

## Context

The user has POSIX TZ rule libraries in C and MicroPython. The existing npm package `posixtz` by jdiamond provides POSIX TZ parsing in JavaScript but depends on `moment` and `moment-timezone`.

## Decision

Extract the core parsing logic from `posixtz`, rewrite date arithmetic using native `Date`, and drop the moment dependency entirely.

## Consequences

- **Pro**: Zero dependencies — keeps the app lightweight for offline use
- **Pro**: ~100 lines of focused, testable code in `posix-tz.js`
- **Pro**: Avoids maintaining parallel C/MicroPython/JS implementations
- **Con**: Lose `formatPosixTZ` (IANA→POSIX conversion) — not needed for this app
- **Con**: Must handle edge cases (half-hour offsets, southern hemisphere DST) ourselves

## Alternatives Considered

- **Port C code**: Would work but adds build complexity and maintenance overhead for a small feature
- **Use posixtz as-is**: moment-timezone is ~70KB minified — unacceptable for an offline-first app
- **Use other npm libraries**: No other library provides POSIX TZ string parsing without IANA dependency
