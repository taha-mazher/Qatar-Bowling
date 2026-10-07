# Qatar Bowling Center: redesign pitch

A speculative redesign of [qatarbowlingcenter.com](https://www.qatarbowlingcenter.com),
built to win the rebuild contract. It is a pitch artifact, not the production
system, and it is not affiliated with or endorsed by the Qatar Bowling Federation.

## The argument

The current site tells every visitor to phone between 2 PM and 10 PM, while the
centre is open until midnight. The parties page lists no packages and no prices.
Every booking is a phone call.

This build proves one thing: a booking can happen without that call. The
homepage speaks first to a parent planning a birthday party on a phone, outside
office hours.

## What is built

| Route | What it does |
|---|---|
| `/` | Home, led by a lane availability board |
| `/book` | Full booking flow: date, lanes, time slot, details, confirmation |
| `/parties` | Party and event packages with real prices |
| `/bowling` | Rates, hours, house rules, etiquette, dress code |
| `/leagues` | The three resident clubs and league schedule |
| `/centre` | Other facilities, the pro shop, and contact |

The original 18 pages are consolidated into these routes. See [`PLAN.md`](PLAN.md)
for the information architecture and the reasoning behind each merge.

The booking flow enforces the centre's actual rules in the UI: lane and player
minimums, the Friday league hours when all 32 lanes are reserved, and the four
bumper lanes for children.

## Deliberately not built

No database, no payments, no auth, no CMS. All content lives in typed
TypeScript files, and availability is deterministic demo data generated in
[`lib/availability.ts`](lib/availability.ts). That file is the only thing a
real lane inventory would replace. A booking backend is deferred until the
client signs.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP for motion.

```
app/          routes
components/   BookingFlow, LaneBoard, header and footer
lib/          data.ts (content), availability.ts (slot logic)
assets/       source material audited from the existing site
```

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## How it was planned

The planning documents are kept in the repository on purpose:

- [`PRODUCT.md`](PRODUCT.md): users, purpose, positioning and operating facts
- [`PLAN.md`](PLAN.md): pitch angle, scope and information architecture
- [`DESIGN.md`](DESIGN.md): the design direction, including what was rejected and why
