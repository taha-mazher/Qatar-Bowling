import Link from "next/link";
import Image from "next/image";
import LaneBoard from "@/components/LaneBoard";
import {
  CENTER,
  CREDENTIALS,
  RATES,
  PARTY_PACKAGES,
  CLUBS,
  FACILITIES,
  BOOKING_RULES,
} from "@/lib/data";
import {
  DEMO_TODAY,
  LANE_COUNT,
  openLaneCount,
  prettyDate,
  slotLabel,
} from "@/lib/availability";

export default function Home() {
  const focus = 8; // 20:00
  const open = openLaneCount(DEMO_TODAY, focus);

  return (
    <>
      {/* ---------- first viewport: the board is the thesis ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(280px,360px)_1fr] lg:gap-12">
          {/* the dark gutter margin */}
          <div className="lg:pt-1">
            <h1 className="display text-[clamp(2.6rem,7vw,4.1rem)] text-bone">
              Tonight,
              <br />
              lane by lane.
            </h1>
            <p className="mt-6 max-w-[38ch] text-[17px] leading-relaxed text-bone-dim">
              Every lit stretch on this board is a lane you can take right now.
              Pick one and it is yours. No phone call, no waiting for the office
              to open.
            </p>

            <dl className="mt-8 border-t border-rule pt-5">
              <div className="flex items-baseline gap-3">
                <dt className="sr-only">Lanes open at {slotLabel(focus)}</dt>
                <dd className="tnum display text-[3.4rem] leading-none text-maple">
                  {open}
                </dd>
                <span className="text-[15px] leading-tight text-bone-dim">
                  of {LANE_COUNT} lanes open
                  <br />
                  at {slotLabel(focus)}
                </span>
              </div>
              <div className="mt-4 text-[14px] text-bone-dim">
                {prettyDate(DEMO_TODAY)}
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="lane inline-flex min-h-12 items-center px-6 text-[15px] font-bold uppercase tracking-[0.1em] text-ground transition-[filter] duration-200 hover:brightness-110"
              >
                Book a lane
              </Link>
              <a
                href={`tel:${CENTER.phones.office[0].replace(/\s/g, "")}`}
                className="inline-flex min-h-12 items-center border border-rule-bright px-6 text-[15px] font-semibold text-bone transition-colors duration-200 hover:border-maple hover:text-maple"
              >
                Or call {CENTER.phones.office[0]}
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <LaneBoard dateISO={DEMO_TODAY} focusSlot={focus} />
          </div>
        </div>
      </section>

      {/* ---------- quiet: what this place is ---------- */}
      <section className="border-y border-rule bg-ground-raised">
        <div className="mx-auto max-w-[1240px] px-5 py-14 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="display text-[clamp(1.9rem,3.4vw,2.6rem)] text-bone">
                The national centre, open to everyone.
              </h2>
              <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-bone-dim">
                Qatar Bowling Center has stood in Al Bidda since long before it
                was handed to the state in 2006. It is run by the{" "}
                {CENTER.parent}, it trains the national team, and it is where
                the country came to bowl at the 15th Asian Games. On any given
                evening it is also where a nine-year-old rolls their first
                bumper strike.
              </p>
              <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4 lg:grid-cols-2">
                {CREDENTIALS.map((c) => (
                  <div key={c.figure} className="border-t border-rule pt-3">
                    <dt className="tnum display text-[1.9rem] leading-none text-maple">
                      {c.figure}
                    </dt>
                    <dd className="mt-1.5 text-[13px] leading-snug text-bone">
                      {c.unit}
                      <span className="mt-1 block text-bone-dim">{c.note}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="relative">
              <Image
                src="/brand/qbc-building.jpg"
                alt="Qatar Bowling Center seen from the street, its bilingual sign above the entrance"
                width={1962}
                height={436}
                sizes="(max-width: 1024px) 100vw, 620px"
                className="w-full border border-rule object-cover"
              />
              <figcaption className="mt-3 text-[13px] text-bone-dim">
                Al Bidda, near Mannai Roundabout, Doha.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- dense: what it costs ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-8">
        <h2 className="display text-[clamp(1.9rem,3.4vw,2.6rem)] text-bone">
          What a game costs.
        </h2>
        <div className="mt-9 border-t border-rule-bright">
          {RATES.map((r) => (
            <div
              key={r.name}
              className="grid items-baseline gap-2 border-b border-rule py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8"
            >
              <div>
                <h3 className="text-[19px] font-bold text-bone">{r.name}</h3>
                <p className="mt-1 text-[15px] text-bone-dim">{r.when}</p>
                <p className="mt-0.5 text-[14px] text-bone-dim">{r.includes}</p>
              </div>
              <div className="flex items-baseline gap-2 sm:justify-end">
                <span className="tnum display text-[2.6rem] leading-none text-maple">
                  {r.price}
                </span>
                <span className="text-[14px] leading-tight text-bone-dim">
                  QR
                  <br />
                  {r.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-[60ch] text-[15px] text-bone-dim">
          {BOOKING_RULES.walkInNote}
        </p>
      </section>

      {/* ---------- the money page: parties, sized by the lanes they take ---------- */}
      <section className="border-y border-rule bg-ground-raised">
        <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display max-w-[18ch] text-[clamp(1.9rem,3.4vw,2.6rem)] text-bone">
              Birthdays, on lanes of your own.
            </h2>
            <Link
              href="/parties"
              className="text-[15px] font-semibold text-maple hover:text-maple-lit"
            >
              All three packages &rarr;
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PARTY_PACKAGES.map((p) => (
              <article
                key={p.id}
                className={`flex flex-col border-t-2 pt-5 ${
                  p.featured ? "border-maple" : "border-rule-bright"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="display text-[1.5rem] text-bone">{p.name}</h3>
                  <span className="tnum text-[12px] text-bone-dim">
                    {p.lanes} lanes
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="tnum display text-[2.4rem] leading-none text-maple">
                    {p.perChild}
                  </span>
                  <span className="text-[13px] leading-tight text-bone-dim">
                    QR per child
                    <br />
                    from {p.minChildren} children
                  </span>
                </div>
                <p className="mt-3 text-[14px] text-bone-dim">{p.duration}</p>
                <ul className="mt-5 space-y-2 text-[14px] leading-snug text-bone">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex gap-2.5">
                      <span
                        aria-hidden
                        className="mt-[7px] h-px w-3 shrink-0 bg-maroon-bright"
                      />
                      {inc}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- leagues + everything else, one measured row ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="display text-[clamp(1.7rem,3vw,2.2rem)] text-bone">
              The clubs that bowl here every week.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-bone-dim">
              Friday morning through to seven in the evening, all 32 lanes
              belong to the leagues. Anyone can join one.
            </p>
            <dl className="mt-8 border-t border-rule-bright">
              {CLUBS.map((c) => (
                <div
                  key={c.abbr}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-rule py-4"
                >
                  <dt className="display text-[1.15rem] text-maple">
                    {c.abbr}
                  </dt>
                  <dd>
                    <div className="text-[15px] text-bone">{c.name}</div>
                    <div className="tnum mt-1 text-[13px] text-bone-dim">
                      {c.slots.join("  ·  ")}
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/leagues"
              className="mt-6 inline-block text-[15px] font-semibold text-maple hover:text-maple-lit"
            >
              League schedules &rarr;
            </Link>
          </div>

          <div>
            <h2 className="display text-[clamp(1.7rem,3vw,2.2rem)] text-bone">
              Not only bowling.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-bone-dim">
              Billiards, snooker, table tennis, PlayStation and mini football,
              all first come first served.
            </p>
            <dl className="mt-8 border-t border-rule-bright">
              {FACILITIES.map((f) => (
                <div
                  key={f.name}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-4"
                >
                  <dt className="text-[16px] text-bone">{f.name}</dt>
                  <dd className="tnum text-[15px] text-bone-dim">
                    <span className="text-maple">{f.hour}</span> QR / hour
                    <span className="mx-2 text-rule-bright">|</span>
                    <span className="text-maple">{f.half}</span> QR / half
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- the close ---------- */}
      <section className="border-t-2 border-maroon">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:px-8">
          <div>
            <h2 className="display text-[clamp(2rem,4vw,3rem)] text-bone">
              The lanes are lit. Come and take one.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="lane inline-flex min-h-12 items-center px-6 text-[15px] font-bold uppercase tracking-[0.1em] text-ground transition-[filter] duration-200 hover:brightness-110"
              >
                Book a lane
              </Link>
              <Link
                href="/parties"
                className="inline-flex min-h-12 items-center border border-rule-bright px-6 text-[15px] font-semibold text-bone transition-colors duration-200 hover:border-maple hover:text-maple"
              >
                Plan a party
              </Link>
            </div>
          </div>
          <div className="text-[15px] leading-relaxed text-bone-dim md:text-end">
            {CENTER.address.line1}
            <br />
            {CENTER.address.city}
            <div className="mt-3">
              {CENTER.phones.office.map((p) => (
                <div key={p}>
                  <a
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="text-maple hover:text-maple-lit"
                  >
                    {p}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
