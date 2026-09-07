# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js + Tailwind, deployed to Vercel. Vercel confirmed by the user directly.
No database, no CMS, no auth, no backend. All content in typed .ts files,
booking availability hard-coded. This is a pitch artifact, not the production
system; a real booking backend is explicitly deferred until the client signs.

## Users

Primary: a parent in Doha planning a child's birthday party, on a phone,
often outside office hours. They want to know what a party costs, what it
includes, and whether their date is free, without phoning a stranger in a
second language. The homepage speaks to this person first.

Secondary: casual walk-in bowlers checking whether lanes are free tonight;
corporate/group organisers booking 4+ lanes; league bowlers from the three
resident clubs (UFBQ, FBAQ, AFTC) checking schedules.

Tertiary but decisive: the Qatar Bowling Federation officials who approve
budget. They are the audience for the pitch meeting itself, not the site.

## Product Purpose

A speculative redesign of qatarbowlingcenter.com, built to win the redesign
contract. Success is the federation agreeing to fund a rebuild. The site must
demonstrate one thing above all: that bookings can happen without a phone call.

## Positioning

The incumbent site instructs every visitor to phone between 2:00 PM and
10:00 PM, while the centre is open until midnight (1:00 AM Thursday and
Friday). The parties page, their highest-value offering, lists no packages
and no prices. This redesign's mechanism is availability made visible and
bookable at the moment of intent. That is a business argument, not a taste
argument, and it is what the build must prove.

## Operating Context

Qatar Bowling Center, Al Bidda, near Mannai Roundabout, Doha.
State-owned since 2006, operated by the Qatar Bowling Federation.
32 lanes total: 28 regular, 4 bumper lanes for children. 2,000 sqm.
Hosted the 3rd West Asian Games and the 15th Asian Games.

Hours: Sun-Wed and Sat 10:00-24:00. Thu 10:00-01:00.
Fri 08:00-19:00 reserved for league play (all 32 lanes), 19:00-01:00 open.

Rates: happy hour Sun-Thu 10:00-14:00 = 8 QR/game/person.
After 14:00 = 12 QR/game/person. Shoes included both.
Lane hire 100 QR/hour, minimum 4 lanes and 20 people. Socks 3 QR.

Other facilities: billiards 35 QR/hr, snooker 35 QR/hr, table tennis 30 QR/hr,
PlayStation 30 QR/hr, mini football 20 QR/hr.

Pro shop: 16:00-24:00. Brands stocked: Brunswick, Columbia, Storm, Hammer,
Ebonite, DV8, Roto Grip, Track, Global 900.

Booking rules that the UI must honour: minimum 2 lanes AND 10 players to
reserve; under 10 players is walk-in only; one week notice requested;
50% deposit; temporary holds expire after 24 hours.

Contact: office +974 4435-3054 / 3336-2722, restaurant +974 4432-9132,
qatarbowlingcenter@gmail.com.

## Capabilities and Constraints

- Booking flow is a front-end demo over hard-coded availability. It must feel
  real and must enforce the real booking rules above.
- The flow ends on a full confirmation screen carrying a booking summary and
  deposit line, plus an honest, quiet note that this is a concept demo.
  Nothing is sent anywhere. No API route, no email.
- English only. Arabic is a priced phase-2 line item, not built now, but all
  layout uses CSS logical properties so it is not a rewrite later.
- The venue's physical signage is bilingual Arabic/English; the current site
  is English only. This gap is an argument in the pitch, not a build task.
- Must deploy to a neutral Vercel subdomain, carry noindex, and show a
  persistent marker that it is a concept proposal and not an official QBC
  site. It depicts a real state-linked organisation and must never be
  mistakable for their live site.

## Brand Commitments

Name: Qatar Bowling Center (Arabic on building: مركز قطر للبولينج).
Parent body: Qatar Bowling Federation.

Binding identity evidence, verified from their own files:
- QBF federation logo is a maroon rosette with a black bowling ball centre
  (assets/qbf-logo.png).
- The signage on the building is a maroon "Q" mark (assets/qbc-header.jpg).
- Their current website uses burnt orange #c74300, which contradicts both.

Maroon is therefore the brand, evidenced rather than assumed. The redesign
adopts it. The orange is treated as incumbent error, not identity.

## Evidence on Hand

Real and usable:
- FULL RESTAURANT MENU, extracted from their 10 menu images (assets/menu/).
  Bilingual Arabic/English with prices: grills, Filipino mains (adobo, sisig,
  kare kare, sinigang), silog breakfasts 22 QR, noodles, seafood, vegetables,
  sandwiches 12-20 QR, desserts 12-15 QR, appetizers, salads, soups, Arabic
  dips, Pepsi range, juices and hot drinks. KIDDIE COMBO MEALS at QR 25.
- The menu cover carries their real tagline: "Let's Roll the Ball and Strike
  the Fun!" and a QBC logo (a "Q" with three bowling pins and a red ball)
  which is DIFFERENT from the QBF federation rosette currently used on the
  site. The building signage uses the QBC mark, not the federation one.
- Restaurant numbers are 4432 9178 AND 4432 9132; fax 4443 2436.
- Menu image 08 shows a full banquet set-up (long tables, chair covers,
  maroon sashes), so the venue does catered functions. Nothing on their
  website mentions this and it is directly relevant to the parties pitch.
- Dress code images state the rule verbatim: "Any attire on or above the
  knees, NOT ALLOWED." Shown prohibited: shorts (men and women), sleeveless
  tops and vests, short skirts, thob and abaya.
- League joining process, verbatim from their Leagues page: "Just be a member
  of the QBC, then choose what club are you joining in (AFTC, UFBQ, & FBAQ)."
- League positioning, verbatim: "You don't even have to be good. It is open to
  all skill levels from amateur to professional bowlers." 
- Full content of all 18 incumbent pages (audited this session): rates,
  hours, house rules, etiquette, dress code, booking policy, club schedules,
  facilities pricing, pro shop brands.
- assets/qbf-logo.png, assets/qbc-header.jpg (venue exterior, bilingual
  signage, Emir's portrait on facade).
- Live event on their current site: GCC Games 2026, May 10-17, 13:00-20:00.

Contradictions inside their own site, worth raising in the meeting:
- THEIR PUBLISHED LEAGUE SCHEDULE IS INCOMPLETE. The clubs page lists three
  clubs on Sunday, Tuesday, Wednesday plus the Friday block. But a Gallery
  photo is filenamed "Monday League2.jpg" and shows league play in progress,
  with bowlers in yellow QATAR shirts rather than the Filipino club colours.
  So at least one league night is missing from their own schedule, and it may
  be a Qatari or national-team league distinct from the three Filipino clubs.
  We cannot name it from the evidence. ASK QBC what bowls on Monday.
- Friday league block ends at 18:00 on the clubs page (/results1, "32 lanes
  occupied from 8:00 AM to 6:00 PM") but at 19:00 on the timings page. We use
  19:00 for the availability model and quote 08:00-18:00 in league copy,
  because both are true to their respective sources.
- www.qatarbowlingcenter.net appears on the contact page AND twice on their
  printed restaurant menu (cover and back). It is NOT a typo: the domain
  exists (returns 403, not NXDOMAIN), so they own or owned it. Do NOT call
  this a mistake in the meeting. Ask which domain is canonical instead.
- Six pages say "call between 2:00 PM and 10:00 PM" while the timings page
  opens the centre at 10:00 AM.

Assumed, not sourced, must be confirmed with QBC before the meeting:
- WHICH lanes are the 4 bumper lanes. Their reservation page gives the split
  (28 regular + 4 bumper of 32) but never the numbering. The board places them
  at 29-32 purely so they can be drawn. See lib/availability.ts BUMPER_LANES.

Explicitly absent, must never be fabricated:
- No reviews, testimonials, ratings, customer quotes, or visitor numbers.
- No party package definitions or prices exist anywhere. Any packages shown
  are our proposal and must be presentable to the client as such.
- No photography beyond the header and low-res Wix gallery images. Stock
  stands in for interior shots and must be labelled as placeholder in the
  pitch.

Trust content on the site uses verifiable credentials only: 32 lanes,
hosted the 15th Asian Games and 3rd West Asian Games, state-owned since
2006, operated by the Qatar Bowling Federation.

## Product Principles

1. Availability is the product. If a visitor cannot see whether they can
   bowl tonight, the redesign has failed regardless of how it looks.
2. Never invent proof. Real credentials outrank invented testimonials, and
   an empty trust slot outranks a fake one.
3. The booking rules are real business rules. Enforcing them in the UI is
   what proves we read their operation rather than restyled their pages.
4. Phone remains a first-class path, not a fallback. Many of their visitors
   will still call, and the numbers must never be buried.
5. It must never be mistakable for the official site.

## Accessibility & Inclusion

WCAG 2.1 AA. Verified contrast for every token pair before use.
Touch targets 44x44 minimum. Visible focus states, never removed.
prefers-reduced-motion honoured from the first component.
Mobile-first: the primary user is a parent on a phone.
CSS logical properties throughout for future RTL.
