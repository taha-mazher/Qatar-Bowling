import type { Metadata } from "next";
import Link from "next/link";
import { RATES, HOURS, POLICIES, BOOKING_RULES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rates & hours",
  description:
    "Bowling rates, opening hours, house rules, dress code and lane etiquette at Qatar Bowling Center.",
};

export default function BowlingPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="display text-[clamp(2.4rem,6vw,3.6rem)] text-bone">
        Rates &amp; hours.
      </h1>

      <section className="mt-14">
        <h2 className="display text-[1.7rem] text-bone">What it costs</h2>
        <div className="mt-6 border-t border-rule-bright">
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

      <section className="mt-16">
        <h2 className="display text-[1.7rem] text-bone">When we are open</h2>
        <dl className="mt-6 border-t border-rule-bright">
          {HOURS.map((h) => (
            <div
              key={h.day}
              className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-rule py-4"
            >
              <dt className="text-[16px] font-semibold text-bone">{h.day}</dt>
              <dd>
                <span className="tnum text-[16px] text-maple">
                  {h.open} – {h.close}
                </span>
                {h.leagueOnly && (
                  <span className="tnum ms-3 text-[14px] text-bone-dim">
                    ({h.leagueOnly.open} – {h.leagueOnly.close} league play, all
                    32 lanes)
                  </span>
                )}
                {h.note && !h.leagueOnly && (
                  <span className="ms-3 text-[14px] text-bone-dim">
                    {h.note}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16">
        <h2 className="display text-[1.7rem] text-bone">
          Before you step on the approach
        </h2>
        <div className="mt-6 border-t border-rule-bright">
          {POLICIES.map((p) => (
            <details key={p.title} className="group border-b border-rule">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-[18px] font-semibold text-bone marker:content-none hover:text-maple">
                {p.title}
                <span
                  aria-hidden
                  className="text-[22px] leading-none text-rule-bright transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <ul className="space-y-2.5 pb-6 text-[15px] leading-relaxed text-bone-dim">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[10px] h-px w-3.5 shrink-0 bg-maroon-bright"
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-14">
        <Link
          href="/book"
          className="lane inline-flex min-h-12 items-center px-6 text-[15px] font-bold uppercase tracking-[0.1em] text-ground transition-[filter] duration-200 hover:brightness-110"
        >
          Book a lane
        </Link>
      </div>
    </div>
  );
}
