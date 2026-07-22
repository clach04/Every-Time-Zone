# Every Time Zone — Glossary

## POSIX TZ String

A compact text format that defines a timezone's rules: standard abbreviation, UTC offset, and daylight saving time transitions. Example: `PST8PDT,M3.2.0,M11.1.0` means PST is UTC-8, PDT is UTC-7, DST starts second Sunday in March, ends first Sunday in November.

## Offset

The number of hours (and optionally minutes) a timezone is ahead of or behind UTC. Positive means ahead (east), negative means behind (west). Example: UTC+5:30 for India, UTC-7 for Pacific Daylight Time.

## DST (Daylight Saving Time)

Seasonal clock adjustment where clocks move forward by a fixed amount (typically 1 hour) during warmer months. Not all timezones observe DST. Southern hemisphere DST spans across year boundaries (e.g., October to April).

## Transition Rule

The rule defining when DST starts and ends each year. POSIX format uses `M<month>.<week>.<day>` notation — for example, `M3.2.0` means month 3 (March), 2nd occurrence of day 0 (Sunday).

## Static Offset

A fixed UTC offset that does not change with seasons. Singapore (`SGT-8`) and Bangalore (`IST-5:30`) use static offsets — no DST.

## Canvas Rendering

The timeline bars are drawn on an HTML5 canvas element. Each city's position on the timeline is computed from its UTC offset relative to the current time.

## Display Label

A text label shown next to each city name on the timeline and in the dropdown selector. Format: `<abbreviation> UTC<sign><offset>` — for example, `PDT UTC-7` or `IST UTC+5.5`. The label is generated dynamically from the POSIX TZ string and the current date, so it updates automatically when DST transitions occur.
