import Link from "next/link";
import Image from "next/image";
import { CENTER, HOURS, NAV } from "@/lib/data";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t-2 border-maroon bg-ground-sunk">
      <div className="mx-auto max-w-[1240px] px-5 py-14 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/qbc-logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div className="display text-[17px] leading-[1.05]">
                Qatar
                <br />
                Bowling Center
              </div>
            </div>
            <address className="mt-5 not-italic text-[15px] leading-relaxed text-bone-dim">
              {CENTER.address.line1}
              <br />
              {CENTER.address.line2}
              <br />
              {CENTER.address.city}, {CENTER.address.country}
            </address>
            <div className="mt-5 space-y-1 text-[15px]">
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
              <div className="pt-1 text-bone-dim">
                Restaurant{" "}
                <a
                  href={`tel:${CENTER.phones.restaurant[0].replace(/\s/g, "")}`}
                  className="text-maple hover:text-maple-lit"
                >
                  {CENTER.phones.restaurant[0]}
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${CENTER.email}`}
                  className="text-maple hover:text-maple-lit"
                >
                  {CENTER.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="label">Opening hours</h2>
            <dl className="mt-4 space-y-1.5 text-[14px]">
              {HOURS.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <dt className="text-bone-dim">{h.short}</dt>
                  <dd className="tnum text-bone">
                    {h.open} – {h.close}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 max-w-[30ch] text-[13px] leading-relaxed text-bone-dim">
              Friday mornings belong to the leagues. All 32 lanes are held until
              19:00.
            </p>
          </div>

          <div>
            <h2 className="label">Pages</h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-bone hover:text-maple">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={CENTER.parentUrl}
              className="mt-6 inline-block text-[15px] text-maple hover:text-maple-lit"
              rel="noopener noreferrer"
              target="_blank"
            >
              Qatar Bowling Federation
            </a>
          </div>
        </div>

        {/* Required by PRODUCT.md: this must never be mistakable for the
            official site. It depicts a real state-linked organisation. */}
        <div className="mt-14 border-t border-rule pt-6">
          <p className="max-w-[70ch] text-[13px] leading-relaxed text-bone-dim">
            <span className="text-maple">Concept proposal.</span> This is an
            independent redesign concept for Qatar Bowling Center, not an
            official QBC website and not affiliated with the Qatar Bowling
            Federation. Lane availability shown here is demonstration data and
            no booking made on this site is real. Centre details, opening hours
            and bowling rates are reproduced from qatarbowlingcenter.com. QBC
            publishes 28 regular and 4 bumper lanes but does not say which
            lanes are which, so the bumper positions shown are assumed. Party
            packages are a proposal and are not QBC&rsquo;s published pricing.
          </p>
        </div>
      </div>
    </footer>
  );
}
