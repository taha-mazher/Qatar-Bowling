"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/data";

/**
 * The header is a lane board, not a navbar: every item carries its board
 * number above its label, divided by the same hairlines that draw a lane.
 * A maroon foul line closes the bar, the way it closes an approach.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ground/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1240px] items-stretch gap-6 px-5 md:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 py-4"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/qbc-logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="display text-[15px] leading-[1.05] text-bone">
            Qatar
            <br />
            Bowling Center
          </span>
        </Link>

        <nav className="ms-auto hidden items-stretch lg:flex" aria-label="Main">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative flex w-[124px] flex-col justify-end border-s border-rule px-3 pb-3 pt-5 transition-colors duration-200 last:border-e ${
                  active ? "bg-ground-raised" : "hover:bg-ground-raised"
                }`}
              >
                <span className="label !text-[10px] !tracking-[0.18em] text-rule-bright">
                  {item.board}
                </span>
                <span
                  className={`mt-1 text-[13px] font-semibold leading-tight ${
                    active ? "text-maple-lit" : "text-bone group-hover:text-maple"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`absolute inset-x-0 bottom-0 h-[3px] transition-transform duration-200 ${
                    active
                      ? "scale-x-100 bg-maple"
                      : "scale-x-0 bg-maroon-bright group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="ms-auto flex min-h-11 min-w-11 items-center gap-2 self-center border border-rule px-3 py-2 text-bone lg:hidden"
        >
          <span className="label !text-[10px] text-bone">
            {open ? "Close" : "Menu"}
          </span>
          <span className="flex h-3 w-4 flex-col justify-between" aria-hidden>
            <span
              className={`h-[1.5px] w-full bg-maple transition-transform duration-200 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-full bg-maple transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-full bg-maple transition-transform duration-200 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* the foul line */}
      <div className="h-[2px] w-full bg-maroon" />

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-b border-rule bg-ground-raised lg:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-rule px-5 py-4 last:border-b-0"
            >
              <span className="label !text-[10px] w-6 text-rule-bright">
                {item.board}
              </span>
              <span className="text-[17px] font-semibold text-bone">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
