# QBC Redesign - Design Direction

Overrides the ui-ux-pro-max default output. Reasons for each override noted.

## Rejected from the tool

- Palette "family blue + chore green" (#2563EB/#059669): matched a chores app.
  Generic Tailwind blue is the exact templated default this pitch must beat.
- Fonts Russo One / Chakra Petch: esports fonts. Wrong register for a
  government-owned venue run by a national federation.

## Colour evidence (verified, not assumed)

Pulled from their live homepage HTML and their own logo files.

What their SITE uses today:
  #c74300  burnt orange   (20 uses, their dominant branded colour)
  #8b6755  warm brown
  #ff8044 / #fabd71 / #fcd29d / #fef6ed   warm orange + cream tints
  #ed1566 / #116dff  are Wix chrome, not theirs. Ignored.

What their BRAND actually is:
  QBF federation logo  = maroon rosette, black bowling ball centre
  QBC building signage = maroon "Q" mark (see assets/qbc-header.jpg)

Their website contradicts their own identity. The federation logo and the
sign on the building are maroon. The site is burnt orange. Add this to the
defect list for the pitch: it is a brand-consistency argument, not a taste
argument, which is much harder for them to wave away.

Also visible in assets/qbc-header.jpg: the building signage is bilingual
Arabic and English, and the Emir's portrait is on the facade. The physical
venue is bilingual and official. The website is English only. That is the
strongest possible support for the Arabic phase-2 line item.

Decision: maroon primary, drop the orange. Two dark warm reds side by side
muddy each other, and the orange is the one that does not match the logo.

Pattern validation: ui-ux-pro colour DB returns deep-maroon-primary +
gold-accent + warm-off-white as its Sports Team/Club and heritage archetype.
Our palette matches that structure, using the actual Qatar maroon rather
than a generic red-900.

## Verified contrast

  maroon #8A1538 on white          9.35  AA pass
  maroon #8A1538 on #FAF8F7        8.84  AA pass
  gold #F0B429 on near-black      10.39  AA pass
  gold #F0B429 on white            1.86  FAIL
  fg #171314 on #FAF8F7           17.40  AA pass
  #F7F5F4 on #0F0D0E              17.82  AA pass
  muted #6B6266 on #FAF8F7         5.57  AA pass
  muted #A8A0A2 on #0F0D0E         7.58  AA pass

HARD RULE from the failure above: gold is a fill colour carrying dark text.
Never gold text, never gold on white, never gold as a border that has to be
seen. CTA buttons only.

## Brand anchor: Qatar maroon

QBC is state-owned since 2006 and run by the Qatar Bowling Federation.
Primary is Qatar maroon, the national and federation colour.

Why it wins:
- instantly legible as official to a federation audience
- distinctive, nothing like the stock blue every Wix competitor uses
- already their identity, so we are not inventing a brand they must approve

## Concept: the venue itself

A bowling centre is a dark room with bright lanes and warm wood.
The site mirrors that: dark hero, warm lane-wood accent, bright CTA.

NOT a fully dark site. Parents booking birthday parties read prices, hours
and forms. Dark hero and section breaks, light content and booking flow.

## Tokens

Dark surfaces
  --bg-dark        #0F0D0E   near-black, slightly warm
  --surface-dark   #1A1617
  --fg-on-dark     #F7F5F4
  --muted-on-dark  #A8A0A2

Light surfaces
  --bg             #FAF8F7
  --surface        #FFFFFF
  --fg             #171314
  --muted-fg       #6B6266
  --border         #E5E0DE

Brand
  --primary        #8A1538   Qatar maroon
  --primary-hover  #A61A43
  --on-primary     #FFFFFF
  --accent         #F0B429   lane wood / pin highlight, CTA only
  --on-accent      #0F0D0E
  --destructive    #DC2626

Contrast verified above. All pairs pass AA except gold-on-white,
which is why gold is fill-only.

Accent is reserved for primary CTAs only. If gold appears more than twice
on a screen it stops meaning "click here".

## Typography

Display: Barlow Condensed (600/700)
Body:    Inter (400/500/600)

Why: bowling is a game of numbers. Condensed numerals read as scoreboard,
which suits lane numbers, rates and hours tables. Inter carries small-size
form and table legibility that a condensed face cannot.

Both Google-hosted and free. Arabic phase 2 pairs with IBM Plex Sans Arabic
or Noto Kufi Arabic, both of which sit well against Inter.

Base 16px, line-height 1.5, no body text under 14px.

## Motion

Tier: subtle to standard. 150-300ms, ease-out.
Purpose only: state changes, section reveals on scroll, booking step
transitions. No scroll-jacking, no decorative loops.
Respect prefers-reduced-motion from the first component.
Animate transform and opacity only.

## Signature element

Homepage carries a live "lanes open right now" panel: 32 lane markers,
current availability, one tap to book.

This is the pitch angle made visible. Their current site says "call between
2 PM and 10 PM". Ours shows the answer and takes the booking. It is the one
thing they will remember from the meeting.

For the demo it reads from the same hard-coded availability as /book.

## Layout

Mobile-first. Breakpoints 375 / 768 / 1024 / 1440.
Spacing scale 16-64px. Content max-width ~1200px.
CSS logical properties throughout (margin-inline-start, not margin-left)
so Arabic is a phase-2 line item and not a rewrite.

## Non-negotiables

- SVG icons (Lucide), never emoji
- visible focus rings, never removed
- touch targets 44x44 minimum, 8px apart
- alt text on every image
- reserve image dimensions, CLS under 0.1
- WebP/AVIF, lazy load below the fold
- labels visible, never placeholder-only
- errors inline next to the field
