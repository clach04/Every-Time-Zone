// Zero-dependency POSIX timezone string parser and offset calculator.
// Parses POSIX TZ strings like "PST8PDT,M3.2.0,M11.1.0" and computes
// UTC offset for any given Date.
//
// Based on posixtz by jdiamond (MIT license).
// https://github.com/jdiamond/posixtz

var posixTZ = (function() {

    function parse(tz) {
        var result = {
            stdAbbr: null,
            stdOffset: 0,
            dst: false,
            dstAbbr: null,
            dstOffset: null,
            dstStart: null,
            dstEnd: null
        };

        var parts = tz.split(',');
        var localTZ = parts[0];

        // Parse std abbreviation (letters only)
        var abbrMatch = /^([A-Za-z]+)/.exec(localTZ);
        if (!abbrMatch) return null;
        result.stdAbbr = abbrMatch[1];

        var rest = localTZ.slice(abbrMatch[1].length);

        // Parse std offset: [+|-]digits[:digits]
        var offsetMatch = /^([+-]?\d+(:\d+)?)/.exec(rest);
        if (offsetMatch) {
            result.stdOffset = parseOffset(offsetMatch[1]);
            rest = rest.slice(offsetMatch[0].length);
        }

        // If anything remains, it's dst abbreviation + optional offset
        if (rest.length > 0) {
            var dstAbbrMatch = /^([A-Za-z]+)/.exec(rest);
            if (dstAbbrMatch) {
                result.dst = true;
                result.dstAbbr = dstAbbrMatch[1];
                rest = rest.slice(dstAbbrMatch[1].length);

                var dstOffsetMatch = /^([+-]?\d+(:\d+)?)/.exec(rest);
                if (dstOffsetMatch) {
                    result.dstOffset = parseOffset(dstOffsetMatch[1]);
                } else {
                    result.dstOffset = result.stdOffset + 60;
                }

                result.dstStart = parseTransition(parts[1]);
                result.dstEnd = parseTransition(parts[2]);
            }
        }

        return result;
    }

    function parseOffset(offset) {
        var parts = offset.split(':');
        var hours = Number(parts[0]);
        var minutes = parts[1] ? Number(parts[1]) : 0;
        var total = hours * 60 + (hours >= 0 ? minutes : -minutes);
        return -total;
    }

    function parseTransition(transition) {
        if (!transition) return null;

        if (transition[0] === 'M') {
            var parts = transition.slice(1).split('/');
            var dateParts = parts[0].split('.');

            var time = { hour: 2, minute: 0, second: 0 };

            if (parts[1]) {
                var timeParts = parts[1].split(':');
                time.hour = Number(timeParts[0]);
                time.minute = timeParts[1] ? Number(timeParts[1]) : 0;
                time.second = timeParts[2] ? Number(timeParts[2]) : 0;
            }

            return {
                month: Number(dateParts[0]),
                week: Number(dateParts[1]),
                day: Number(dateParts[2]),
                hour: time.hour,
                minute: time.minute,
                second: time.second
            };
        }

        // TODO: support Julian day (Jn) and zero-based Julian day (n) formats
        return null;
    }

    function transitionToDate(year, t) {
        var jsMonth = t.month - 1;
        var dt = new Date(Date.UTC(year, jsMonth, 1));

        // Find the first occurrence of the target weekday
        while (dt.getUTCDay() !== t.day) {
            dt.setUTCDate(dt.getUTCDate() + 1);
        }

        // Move to the Nth occurrence
        if (t.week > 1) {
            dt.setUTCDate(dt.getUTCDate() + (t.week - 1) * 7);
            // If we rolled into next month, step back to last occurrence
            if (dt.getUTCMonth() !== jsMonth) {
                dt.setUTCDate(dt.getUTCDate() - 7);
            }
        }

        dt.setUTCHours(t.hour, t.minute, t.second);
        return dt;
    }

    // Returns offset in minutes from UTC for a given Date and POSIX TZ string.
    function getOffset(posixTZ, date) {
        var dt = new Date(date.getTime());
        var parsed = parse(posixTZ);

        if (!parsed) return 0;

        if (parsed.dst) {
            var year = dt.getUTCFullYear();
            var dstStart = transitionToDate(year, parsed.dstStart);
            var dstEnd = transitionToDate(year, parsed.dstEnd);

            // Northern hemisphere: DST start < DST end (e.g., Mar-Nov)
            // Southern hemisphere: DST start > DST end (e.g., Oct-Apr, spans year boundary)
            if (parsed.dstStart.month < parsed.dstEnd.month) {
                // Northern: standard check
                if (dt >= dstStart && dt < dstEnd) {
                    return parsed.dstOffset;
                }
            } else {
                // Southern: DST runs from dstStart to year end, then Jan 1 to dstEnd
                if (dt >= dstStart || dt < dstEnd) {
                    return parsed.dstOffset;
                }
            }
        }

        return parsed.stdOffset;
    }

    // Returns the timezone abbreviation (e.g., "PST" or "PDT") for a given Date.
    function getAbbr(posixTZ, date) {
        var parsed = parse(posixTZ);
        if (!parsed) return '';

        if (parsed.dst) {
            var year = date.getUTCFullYear();
            var dstStart = transitionToDate(year, parsed.dstStart);
            var dstEnd = transitionToDate(year, parsed.dstEnd);

            if (parsed.dstStart.month < parsed.dstEnd.month) {
                if (date >= dstStart && date < dstEnd) {
                    return parsed.dstAbbr;
                }
            } else {
                if (date >= dstStart || date < dstEnd) {
                    return parsed.dstAbbr;
                }
            }
        }

        return parsed.stdAbbr;
    }

    return {
        parse: parse,
        getOffset: getOffset,
        getAbbr: getAbbr
    };

})();
