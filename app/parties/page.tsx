import Link from "next/link";
import type { Metadata } from "next";
import { PARTY_PACKAGES, BOOKING_RULES, CENTER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Parties",
  description:
    "Birthday parties on lanes of your own. Three packages, priced per child, from 10 children.",
};

export default function PartiesPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-16">
        <div>
          <h1 className="display text-[clamp(2.4rem,6vw,3.6rem)] text-bone">
            Birthdays, on lanes of your own.
          </h1>
          <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-bone-dim">
            Bumper lanes so nobody rolls a gutter ball. A table beside your
            lanes for the cake. Someone to run it so you can watch instead of
            organise.
          </p>
          <Link
            href="/book"
            className="lane mt-8 inline-flex min-h-12 items-center px-6 text-[15px] font-bold uppercase tracking-[0.1em] text-ground transition-[filter] duration-200 hover:brightness-110"
          >
            Check a date
          </Link>
        </div>

        <div className="border-t border-rule-bright">
          {PARTY_PACKAGES.map((p) => (
            <article
              key={p.id}
              className="grid gap-x-10 gap-y-5 border-b border-rule py-8 sm:grid-cols-[1fr_auto]"
            >
              <div className="sm:col-start-1 sm:row-start-1">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h2 className="display text-[1.8rem] text-bone">{p.name}</h2>
                  {p.featured && (
                    <span className="border border-maple px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-maple">
                      Our recommendation
                    </span>
                  )}
                </div>
                <p className="tnum mt-2 text-[14px] text-bone-dim">
                  {p.duration} &nbsp;·&nbsp; {p.lanes} lanes &nbsp;·&nbsp; from{" "}
                  {p.minChildren} children
                </p>
              </div>

              {/* On a phone the price belongs with the name, not stranded
                  under the inclusions list. */}
              <div className="flex items-start gap-2 sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:justify-end">
                <span className="tnum display text-[3rem] leading-none text-maple">
                  {p.perChild}
                </span>
                <span className="pt-1 text-[13px] leading-tight text-bone-dim">
                  QR
                  <br />
                  per child
                </span>
              </div>

              <ul className="grid gap-2 text-[15px] leading-snug text-bone sm:col-start-1 sm:row-start-2 sm:grid-cols-2">
                {p.includes.map((inc) => (
                  <li key={inc} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-[9px] h-px w-3 shrink-0 bg-maroon-bright"
                    />
                    {inc}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <section className="mt-16 grid gap-10 border-t-2 border-maroon pt-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="display text-[1.6rem] text-bone">
            How booking works.
          </h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-bone-dim">
            <li>
              Give us about {BOOKING_RULES.noticeDays} days notice so we can
              hold the right lanes.
            </li>
            <li>
              We hold them for {BOOKING_RULES.holdHours} hours while you decide.
            </li>
            <li>
              A {BOOKING_RULES.depositPct}% deposit confirms it. The balance is
              settled at the counter on the day.
            </li>
            <li>Cash, cheque and card are all fine.</li>
            <li>
              You may hang one banner for 10 to 19 lanes, two for 20 or more,
              up to 2m by 1m.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="display text-[1.6rem] text-bone">
            Something bigger?
          </h2>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-bone-dim">
            Corporate days, anniversaries, family reunions and tournaments. We
            have 32 lanes and we have hosted the Asian Games on them, so almost
            nothing is too large. Call the office and ask.
          </p>
          <div className="mt-5 space-y-1 text-[16px]">
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
      </section>

      <p className="mt-14 max-w-[70ch] border-s-2 border-rule-bright ps-4 text-[14px] leading-relaxed text-bone-dim">
        Package names, contents and prices on this page are a proposal prepared
        for Qatar Bowling Center and are not QBC&rsquo;s published pricing. They
        are costed against the centre&rsquo;s real published rates of 12 QR per
        game and 100 QR per lane per hour.
      </p>
    </div>
  );
}
