// ─────────────────────────────────────────────────────────────
//  WEEKLY REPORT DATA
//  Add a new week object to this array to include it in the report.
//  The selector and historical totals update automatically.
// ─────────────────────────────────────────────────────────────

const WEEKS_DATA = [
    {
        id: "w1",
        label: "Week 1 — May 18–22",
        range: "May 18th through May 22nd",
        shortRange: "MON 18 – FRI 22",
        contactsNeeded: "21.0k",
        meta: [
            { name: "Reach",        value: "46.3k" },
            { name: "Frequency",    value: "1.74"  },
            { name: "Impressions",  value: "14.4k" }
        ],
        days: [
            { name: "MONDAY",    leads: 1 },
            { name: "TUESDAY",   leads: 7 },
            { name: "WEDNESDAY", leads: 6 },
            { name: "THURSDAY",  leads: 7 },
            { name: "FRIDAY",    leads: 5 }
        ]
    },
    {
        id: "w2",
        label: "Week 2 — May 25–29",
        range: "May 25th through May 29th",
        shortRange: "MON 25 – FRI 29",
        contactsNeeded: "21.5k",
        meta: [
            { name: "Reach",        value: "67.5k" },
            { name: "Frequency",    value: "1.98"  },
            { name: "Impressions",  value: "20.3k" }
        ],
        days: [
            { name: "MONDAY",    leads: 3 },
            { name: "TUESDAY",   leads: 10 },
            { name: "WEDNESDAY", leads: 3 },
            { name: "THURSDAY",  leads: 2 },
            { name: "FRIDAY",    leads: 9 }
        ]
    },
    {
        id: "w3",
        label: "Week 3 — Jun 1–5",
        range: "June 1st through June 5th",
        shortRange: "MON 1 – FRI 5",
        contactsNeeded: "22.5k",
        meta: [
            { name: "Reach",        value: "71.3k" },
            { name: "Frequency",    value: "1.98"  },
            { name: "Impressions",  value: "20.3k" }
        ],
        days: [
            { name: "MONDAY",    leads: 5 },
            { name: "TUESDAY",   leads: 3 },
            { name: "WEDNESDAY", leads: 4 },
            { name: "THURSDAY",  leads: 9 },
            { name: "FRIDAY",    leads: 6 }
        ]
    },
    {
        id: "w4",
        label: "Week 4 — Jun 8–12",
        range: "June 8th through June 12th",
        shortRange: "MON 8 – FRI 12",
        contactsNeeded: "22.5k",
        meta: [
            { name: "Reach",       value: "71.3k" },
            { name: "Frequency",   value: "1.98"  },
            { name: "Impressions", value: "20.3k" }
        ],
        days: [
            { name: "MONDAY",    leads: 13 },
            { name: "TUESDAY",   leads: 10 },
            { name: "WEDNESDAY", leads: 4  },
            { name: "THURSDAY",  leads: 2  },
            { name: "FRIDAY",    leads: 3  }
        ]
    }

    // ── ADD MORE WEEKS HERE ──────────────────────────────────────
    // ,{
    //     id: "w3",
    //     label: "Week 3 — Jun 1–5",
    //     range: "Jun 1st through Jun 5th",
    //     shortRange: "MON 1 – FRI 5",
    //     contactsNeeded: "25k",
    //     meta: [
    //         { name: "Reach",       value: "58k"  },
    //         { name: "Frequency",   value: "2.10" },
    //         { name: "Impressions", value: "28k"  }
    //     ],
    //     days: [
    //         { name: "MONDAY",    leads: 5 },
    //         { name: "TUESDAY",   leads: 8 },
    //         { name: "WEDNESDAY", leads: 7 },
    //         { name: "THURSDAY",  leads: 9 },
    //         { name: "FRIDAY",    leads: 6 }
    //     ]
    // }
];
