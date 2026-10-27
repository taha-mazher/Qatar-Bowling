# Qatar Bowling Center: a booking-first website redesign

An unsolicited concept redesign of [qatarbowlingcenter.com](https://www.qatarbowlingcenter.com), built as a working
Next.js site. It is not affiliated with or endorsed by the Qatar Bowling Center or the Qatar Bowling Federation; the
venue's name, logo and building photo belong to them.

## The problem

The current site tells every visitor to phone between 2 PM and 10 PM, while the centre is open until midnight. The
parties page lists no packages and no prices. Every booking is a phone call.

## The design answer

Book without the call. The homepage leads with a lane board: all 32 lanes, which are open at the chosen time, and one
tap into booking. The primary user is a parent planning a birthday party on a phone, outside office hours.

| Route | What it does |
|---|---|
| `/` | Home, led by the lane availability board |
| `/book` | Booking flow: date, lanes, time slot, details, confirmation |
| `/parties` | Party and event packages with prices |
| `/bowling` | Rates, hours, house rules, etiquette, dress code |
| `/leagues` | The three resident clubs and the league schedule |
| `/centre` | Other facilities, the pro shop, and contact |

The original site's 18 pages are consolidated into these six routes.

## The venue's rules, enforced in the interface

- Booking minimums (10 players, 2 lanes): smaller groups are told up front they can simply walk in, instead of being
  refused at the end of the form.
- Pricing guidance: when paying per game (12 QR a head) is cheaper than hiring whole lanes, the flow says so.
- Friday league play holds all 32 lanes from 08:00 to 19:00, so those slots show as league time, not bookable.
- Four of the 32 lanes are bumper lanes for children. The current site never says which ones;
  [`lib/availability.ts`](lib/availability.ts) documents the assumption made.

## Design decisions

Full reasoning, including rejected directions, is in [`DESIGN.md`](DESIGN.md).

- **Colour from evidence.** The current site is burnt orange, but the federation logo and the building signage are
  maroon. The redesign follows the logo.
- **Every colour pair contrast-checked.** Gold on white fails (1.86:1), so gold is used only as a button fill with dark
  text, never as text.
- **Type for numbers.** Barlow Condensed for lane numbers, rates and hours (it reads as a scoreboard), Inter for forms
  and tables.
- **Ready for Arabic.** The building signage is bilingual and the site is English only, so layout uses CSS logical
  properties throughout; adding Arabic is not a rewrite.
- **Accessibility basics from the first component:** visible focus rings, 44 px touch targets, inline form errors,
  `prefers-reduced-motion` respected, motion limited to transform and opacity.

## Scope

No database, payments, auth or CMS. Content lives in typed TypeScript ([`lib/data.ts`](lib/data.ts)), and lane
availability is deterministic demo data from [`lib/availability.ts`](lib/availability.ts), the only file a real lane
inventory would replace.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP for motion.

```bash
npm install
npm run dev     # http://localhost:3000
```
