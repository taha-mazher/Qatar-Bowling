import type { Metadata } from "next";
import Image from "next/image";
import { CENTER, CREDENTIALS, FACILITIES, PROSHOP } from "@/lib/data";

export const metadata: Metadata = {
  title: "The centre",
  description:
    "32 lanes in Al Bidda, Doha. Billiards, snooker, table tennis, a pro shop and a restaurant.",
};

export default function CentrePage() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="display text-[clamp(2.4rem,6vw,3.6rem)] text-bone">
        The centre.
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <p className="max-w-[52ch] text-[17px] leading-relaxed text-bone-dim">
            Two thousand square metres in Al Bidda, thirty-two lanes, and a
            history that runs through the 3rd West Asian Games and the 15th
            Asian Games. The state took the centre on in 2006 and the{" "}
            {CENTER.parent} has run it since. The national team trains on these
            lanes. So does everybody else.
          </p>
          <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-7">
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
        <figure>
          <Image
            src="/brand/qbc-building.jpg"
            alt="Qatar Bowling Center seen from the street, its bilingual sign above the entrance"
            width={1962}
            height={436}
            sizes="(max-width: 1024px) 100vw, 620px"
            className="w-full border border-rule object-cover"
          />
          <figcaption className="mt-3 text-[13px] text-bone-dim">
            {CENTER.address.line1}, {CENTER.address.city}.
          </figcaption>
        </figure>
      </div>

      <section className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="display text-[1.7rem] text-bone">Not only bowling</h2>
          <dl className="mt-6 border-t border-rule-bright">
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
          <p className="mt-4 text-[14px] text-bone-dim">
            First come, first served.
          </p>
        </div>

        <div>
          <h2 className="display text-[1.7rem] text-bone">The pro shop</h2>
          <p className="tnum mt-3 text-[15px] text-bone-dim">
            Open daily {PROSHOP.opens} to {PROSHOP.closes}
          </p>
          <ul className="mt-6 space-y-2.5 text-[15px] leading-relaxed text-bone">
            {PROSHOP.services.map((s) => (
              <li key={s} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[10px] h-px w-3.5 shrink-0 bg-maroon-bright"
                />
                {s}
              </li>
            ))}
          </ul>
          <h3 className="label mt-8">Balls we stock</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-bone-dim">
            {PROSHOP.brands.join(", ")}.
          </p>
        </div>
      </section>

      <section className="mt-16 border-t-2 border-maroon pt-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="display text-[1.5rem] text-bone">Find us</h2>
            <address className="mt-4 not-italic text-[16px] leading-relaxed text-bone-dim">
              {CENTER.address.line1}
              <br />
              {CENTER.address.line2}
              <br />
              {CENTER.address.city}, {CENTER.address.country}
            </address>
          </div>
          <div>
            <h2 className="display text-[1.5rem] text-bone">Call us</h2>
            <div className="mt-4 space-y-1 text-[16px]">
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
              <div className="pt-2 text-bone-dim">
                Restaurant{" "}
                <a
                  href={`tel:${CENTER.phones.restaurant[0].replace(/\s/g, "")}`}
                  className="text-maple hover:text-maple-lit"
                >
                  {CENTER.phones.restaurant[0]}
                </a>
              </div>
            </div>
          </div>
          <div>
            <h2 className="display text-[1.5rem] text-bone">Write to us</h2>
            <a
              href={`mailto:${CENTER.email}`}
              className="mt-4 inline-block break-all text-[16px] text-maple hover:text-maple-lit"
            >
              {CENTER.email}
            </a>
            <div className="mt-5 flex gap-4 text-[15px]">
              <a href={CENTER.social.instagram} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-maple">
                Instagram
              </a>
              <a href={CENTER.social.facebook} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-maple">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
