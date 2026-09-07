# Qatar Bowling Center - Redesign Pitch Plan

Status: planning. Nothing built yet.
Target: qatarbowlingcenter.com (Wix, 18 pages, copyright still says 2009).
Decision maker: Qatar Bowling Federation, not counter staff.

## Pitch angle

Lead with the revenue leak, not the visuals:
Center open until midnight. Site says "call between 2 PM and 10 PM".
Parties page lists no packages and no prices.
Every booking is a phone call in a second language.

Secondary: no Arabic, menu locked in 10 image files, 2009 copyright,
contact page links to the wrong domain (.net instead of .com).

## Scope (locked)

Build fully:
1. Home
2. Book a Lane  (the hero)
3. Parties and Events  (real packages, real prices)

Stub as real-but-simple, using audit content verbatim:
Rates, Hours, Leagues and Clubs, Restaurant, Facilities and Pro Shop,
About, Contact. Nav must never dead-end during the meeting.

Skipped for now: gallery lightbox, CMS, real backend, Arabic copy.

## Information architecture: 18 -> 8

Home
Bowling            (rates + hours + house rules + etiquette + dress code as accordions)
Book a Lane        /book
Parties and Events /parties
Leagues and Clubs  /leagues   (merges /our-history1 + /results1)
Restaurant         /restaurant (menu as real text, not images)
Facilities and Pro Shop
About and Contact

Clean slugs throughout. Kills four `copy-of-` pages and Gallery-at-/tournament-rules.

## Booking flow

Full front-end flow against hard-coded availability.
Date -> lane count -> time slot -> name/phone -> confirmation.
No database, no Stripe, no auth. Swap in real inventory only if they sign.

Enforce their actual rules in the UI (proves we read their booking policy):
- minimum 2 lanes AND 10 players
- Friday 8 AM - 7 PM blocked (league play, all 32 lanes)
- 50% deposit shown at confirmation
- under 10 players -> walk-in only message

## Stack

Next.js + Tailwind on Vercel. Content in plain .ts files.
No CMS. No database. No auth. No Cloudflare anything.
Reason for Next: same repo continues if the deal closes, plus image optimization.
Use CSS logical properties (margin-inline-start etc) from day one so Arabic
is a phase-2 line item, not a rewrite.

## Assets

Photography: mix. Their usable gallery shots + stock for gaps, labelled in
the pitch. Quote a photo day as a separate line item.
Menu: transcribe the 10 QBC MENU images into structured data. Manual but
high-value, gives them a searchable menu they can edit.

## Timeline (~1 week of evenings)

Day 1    IA + content migration from audit
Day 2-3  Home
Day 4-5  Booking flow
Day 6    Parties + stubs
Day 7    Mobile pass + deploy to Vercel
Past day 10: cut Parties to a stub and ship.

(Days, not Cloudflare D1. There is no database in this project.)

## Presenting

- Send nothing in advance. Show live, side by side, phone first.
- Their site on mobile, then ours. Contrast does the arguing.
- One-page leave-behind: the 9 defects, each with its fix.
- Open with the .net typo on their own contact page.

## Safeguard

Neutral Vercel subdomain, noindex, persistent footer marker:
"Concept proposal, not an official QBC site."

## Reference data (from audit)

Address: P.O. Box 20305, Al Bidda, near Mannai Roundabout, Doha
Office: +974 4435-3054 / 3336-2722   Restaurant: +974 4432-9132
Email: qatarbowlingcenter@gmail.com
Lanes: 32 total (28 regular + 4 bumper), 2000 sqm
Owned by govt since 2006, run by Qatar Bowling Federation
Hosted 3rd West Asian Games, 15th Asian Games

Hours: Sun-Wed + Sat 10:00-24:00 | Thu 10:00-01:00
       Fri 08:00-19:00 leagues only, 19:00-01:00 open

Bowling: happy hour Sun-Thu 10:00-14:00 = 8 QR/game/person
         after 14:00 = 12 QR/game/person  (shoes free both)
         lane hire 100 QR/hr, min 4 lanes + 20 people
         socks 3 QR

Facilities: billiards 35/hr, snooker 35/hr, table tennis 30/hr,
            PlayStation 30/hr, mini football 20/hr

Clubs: UFBQ Sun 20:30, Fri 14:00-18:00
       FBAQ Tue 20:00, Fri 11:00-13:00
       AFTC Wed 20:00, Fri 08:00-11:00

Pro shop: opens 16:00-24:00. Brands: Brunswick, Columbia, Storm, Hammer,
Ebonite, DV8, Roto Grip, Track, Global 900.
