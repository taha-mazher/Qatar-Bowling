import type { Metadata } from "next";
import { CLUBS, CENTER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Leagues",
  description:
    "Three clubs bowl at Qatar Bowling Center every week. UFBQ, FBAQ and AFTC. Anyone can join.",
};

export default function LeaguesPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-16">
        <div>
          <h1 className="display text-[clamp(2.4rem,6vw,3.6rem)] text-bone">
            League night.
          </h1>
          <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-bone-dim">
            League is open to every skill level, amateur through professional.
            You do not even have to be good. Each club has its own night.
          </p>
          <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-bone-dim">
            On Friday the whole house belongs to them. All 32 lanes are
            occupied from 08:00 to 18:00.
          </p>

          <div className="mt-8 border-t border-rule-bright pt-6">
            <h2 className="display text-[1.3rem] text-bone">How to join</h2>
            <ol className="mt-4 space-y-3 text-[16px] leading-relaxed text-bone-dim">
              <li className="flex gap-3">
                <span className="tnum shrink-0 font-bold text-maple">1</span>
                Become a member of Qatar Bowling Center.
              </li>
              <li className="flex gap-3">
                <span className="tnum shrink-0 font-bold text-maple">2</span>
                Pick the club whose schedule suits you: AFTC, UFBQ or FBAQ.
              </li>
            </ol>
            <div className="mt-5 space-y-1 text-[16px]">
              <p className="text-bone">Ask at the office:</p>
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

        <div className="border-t border-rule-bright">
          {CLUBS.map((c) => (
            <article
              key={c.abbr}
              className="grid gap-4 border-b border-rule py-8 sm:grid-cols-[7rem_1fr] sm:gap-8"
            >
              <div className="display text-[2rem] leading-none text-maple">
                {c.abbr}
              </div>
              <div>
                <h2 className="text-[18px] font-semibold text-bone">
                  {c.name}
                </h2>
                <ul className="mt-4 space-y-2">
                  {c.slots.map((s) => (
                    <li
                      key={s}
                      className="tnum flex items-baseline gap-3 text-[15px] text-bone-dim"
                    >
                      <span
                        aria-hidden
                        className="h-px w-4 shrink-0 translate-y-[-4px] bg-maroon-bright"
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
