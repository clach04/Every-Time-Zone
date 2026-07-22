
// POSIX TZ strings for each city.
// Format: [posixTZ, cityName, abbrev, selected]
// abbrev is now unused — labels are generated dynamically (see getLabelForRow in everytimezone.js)
var data = [
    ["NZST-12NZDT,M9.5.0,M4.1.0", "Auckland", "NZ", true],
    ["AEST-10AEDT,M10.1.0,M4.1.0", "Sydney", "AUS", true],
    ["SGT-8", "Singapore", "SGT", true],
    ["IST-5:30", "Bangalore", "IST", true],
    ["CET-1CEST,M3.5.0,M10.5.0/3", "Europe", "CET", true],
    ["GMT0BST,M3.5.0/1:00:00,M10.5.0/2:00:00", "United Kingdom", "UK", true],
    ["EST5EDT,M3.2.0,M11.1.0", "New York", "US East", true],
    ["CST6CDT,M3.2.0,M11.1.0", "Austin", "US Central", true],
    ["MST7MDT,M3.2.0,M11.1.0", "Denver", "US Mountain", true],
    ["PST8PDT,M3.2.0,M11.1.0", "San Francisco", "US Pacific", true]
];
