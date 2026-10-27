/**
 * Every fact here was taken from qatarbowlingcenter.com during the audit.
 * Anything we authored ourselves is marked `proposed: true` and must be
 * presented to QBC as our proposal, never as their existing offer.
 */

export const CENTER = {
  name: "Qatar Bowling Center",
  nameAr: "مركز قطر للبولينج",
  parent: "Qatar Bowling Federation",
  parentUrl: "https://www.qatarbowlingfederation.com/",
  address: {
    line1: "Al Bidda, near Mannai Roundabout",
    line2: "P.O. Box 20305",
    city: "Doha",
    country: "Qatar",
  },
  phones: {
    office: ["+974 4435 3054", "+974 3336 2722"],
    restaurant: ["+974 4432 9178", "+974 4432 9132"],
    fax: "+974 4443 2436",
  },
  email: "qatarbowlingcenter@gmail.com",
  lanes: { total: 32, regular: 28, bumper: 4 },
  areaSqm: 2000,
  social: {
    facebook: "https://www.facebook.com/qatarbowling/",
    instagram: "https://www.instagram.com/qbc.bowling/",
    twitter: "https://twitter.com/BowlingQatar",
  },
} as const;

/** Verified credentials only. No reviews or testimonials exist; never invent any. */
export const CREDENTIALS = [
  { figure: "32", unit: "lanes", note: "28 regular, 4 bumper lanes for children" },
  { figure: "2006", unit: "state owned", note: "Operated by the Qatar Bowling Federation" },
  { figure: "15th", unit: "Asian Games", note: "Hosted at this centre, alongside the 3rd West Asian Games" },
  { figure: "2,000", unit: "square metres", note: "Central Doha, Al Bidda" },
] as const;

export type DayHours = {
  day: string;
  short: string;
  open: string;
  close: string;
  note?: string;
  leagueOnly?: { open: string; close: string };
};

export const HOURS: DayHours[] = [
  { day: "Sunday", short: "Sun", open: "10:00", close: "00:00" },
  { day: "Monday", short: "Mon", open: "10:00", close: "00:00" },
  { day: "Tuesday", short: "Tue", open: "10:00", close: "00:00" },
  { day: "Wednesday", short: "Wed", open: "10:00", close: "00:00" },
  { day: "Thursday", short: "Thu", open: "10:00", close: "01:00", note: "Late close" },
  {
    day: "Friday",
    short: "Fri",
    open: "19:00",
    close: "01:00",
    note: "League play holds all 32 lanes until 19:00",
    leagueOnly: { open: "08:00", close: "19:00" },
  },
  { day: "Saturday", short: "Sat", open: "10:00", close: "00:00" },
];

export const RATES = [
  {
    name: "Happy hour",
    price: 8,
    unit: "per game, per person",
    when: "Sunday to Thursday, 10:00 to 14:00",
    includes: "Shoe rental included",
  },
  {
    name: "Standard game",
    price: 12,
    unit: "per game, per person",
    when: "Every day after 14:00",
    includes: "Shoe rental included",
  },
  {
    name: "Lane hire",
    price: 100,
    unit: "per hour, per lane",
    when: "Minimum 4 lanes and 20 people",
    includes: "Shoe rental included. Bowling socks 3 QR",
  },
] as const;

export const FACILITIES = [
  { name: "Billiards", hour: 35, half: 20 },
  { name: "Snooker", hour: 35, half: 20 },
  { name: "Table tennis", hour: 30, half: 15 },
  { name: "PlayStation", hour: 30, half: 15 },
  { name: "Mini football", hour: 20, half: 10 },
] as const;

export const CLUBS = [
  {
    abbr: "UFBQ",
    name: "United Filipino Bowlers of Qatar",
    slots: ["Sunday 20:30", "Friday 14:00 to 18:00"],
  },
  {
    abbr: "FBAQ",
    name: "Filipino Bowlers Association of Qatar",
    slots: ["Tuesday 20:00", "Friday 11:00 to 13:00"],
  },
  {
    abbr: "AFTC",
    name: "All Filipino Ten-Pin Club",
    slots: ["Wednesday 20:00", "Friday 08:00 to 11:00"],
  },
] as const;

export const PROSHOP = {
  opens: "16:00",
  closes: "00:00",
  services: [
    "Ball fitting and drilling",
    "Free drilling with any ball bought here",
    "Professional coaching",
    "Complete ball repair",
  ],
  brands: [
    "Brunswick",
    "Storm",
    "Hammer",
    "Columbia",
    "Ebonite",
    "DV8",
    "Roto Grip",
    "Track",
    "900 Global",
  ],
} as const;

/** House rules, etiquette and dress code, merged from four separate pages. */
export const POLICIES = [
  {
    title: "House rules",
    items: [
      "No smoking anywhere inside the centre.",
      "Outside food and drink is not permitted.",
      "Children must be supervised by a parent at all times.",
      "Bowling shoes must be worn on the approach, and never in the restrooms or outside.",
      "Return shoes and house balls to the counter after play.",
      "Bowling bags may not be left in the playing area.",
      "The centre is not liable for loss or damage to personal property.",
    ],
  },
  {
    title: "Dress code",
    items: [
      "A house dress code applies on the lanes.",
      "Any attire on or above the knee is not allowed, for men or women.",
      "Sleeveless tops and vests are not allowed on the approach.",
      "Thob and abaya may not be worn while bowling, for safety on the approach.",
    ],
  },
  {
    title: "Lane etiquette",
    items: [
      "Yield to the bowler on your right when you are both ready.",
      "Stay off the approach and out of sight when it is not your turn.",
      "Be ready when your turn comes.",
      "Never cross the foul line, and never use another bowler's ball without asking.",
      "Keep food and drink away from the approach and the lanes.",
    ],
  },
  {
    title: "Booking policy",
    items: [
      "A temporary hold lasts 24 hours and is released if it is not confirmed.",
      "A 50% deposit confirms the booking.",
      "The balance is settled at the bowling counter. Cash, cheque and card accepted.",
      "One banner is permitted for 10 to 19 lanes, two for 20 to 32 lanes, maximum 2m by 1m.",
      "Cancellations and rebookings carry a penalty.",
    ],
  },
] as const;

/**
 * PROPOSED party packages. QBC's site publishes no packages and no prices,
 * which is the single biggest revenue gap in the audit. These are our
 * proposal, priced consistently with their real published rates
 * (12 QR/game, 100 QR/lane/hour) so they are defensible in the meeting.
 */
export type PartyPackage = {
  id: string;
  name: string;
  proposed: true;
  perChild: number;
  minChildren: number;
  duration: string;
  lanes: number;
  featured?: boolean;
  includes: readonly string[];
};

export const PARTY_PACKAGES: readonly PartyPackage[] = [
  {
    id: "ten-pin",
    name: "Ten-Pin",
    proposed: true,
    perChild: 55,
    minChildren: 10,
    duration: "90 minutes",
    lanes: 2,
    includes: [
      "2 games per child",
      "Shoe rental for everyone",
      "Hot dog and a soft drink each",
      "Bumper lanes on request",
      "Reserved table beside your lanes",
    ],
  },
  {
    id: "strike",
    name: "Strike",
    proposed: true,
    perChild: 85,
    minChildren: 10,
    duration: "2 hours",
    lanes: 2,
    featured: true,
    includes: [
      "2 games per child",
      "Shoe rental for everyone",
      "Hot meal and unlimited soft drinks",
      "Dedicated party host for the full session",
      "Cake table set up and cleared for you",
      "Lane screens named for the birthday child",
    ],
  },
  {
    id: "perfect-game",
    name: "Perfect Game",
    proposed: true,
    perChild: 120,
    minChildren: 12,
    duration: "3 hours",
    lanes: 4,
    includes: [
      "3 games per child",
      "Shoe rental for everyone",
      "Full meal, dessert and unlimited drinks",
      "Dedicated party host and a private lane block",
      "Decoration of your lane block and cake table",
      "Printed invitations to send out beforehand",
      "A framed team scoresheet to take home",
    ],
  },
];

/** The real booking rules from their reservation and booking-policy pages. */
export const BOOKING_RULES = {
  minLanes: 2,
  minPlayers: 10,
  depositPct: 50,
  holdHours: 24,
  noticeDays: 7,
  walkInNote:
    "Under 10 players is walk-in only, first come first served. No booking needed.",
} as const;

export const NAV = [
  { href: "/", label: "Tonight", board: "01" },
  { href: "/book", label: "Book a lane", board: "02" },
  { href: "/parties", label: "Parties", board: "03" },
  { href: "/bowling", label: "Rates & hours", board: "04" },
  { href: "/leagues", label: "Leagues", board: "05" },
  { href: "/centre", label: "The centre", board: "06" },
] as const;
