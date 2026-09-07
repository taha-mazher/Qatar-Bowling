import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Qatar Bowling Center",
    template: "%s · Qatar Bowling Center",
  },
  description:
    "32 lanes in Al Bidda, Doha. See which lanes are open tonight and book them without picking up the phone.",
  robots: { index: false, follow: false, nocache: true },
};

const DIRECTION_CONTRACT = `<!--
IMPECCABLE DIRECTION CONTRACT

THESIS: The centre drawn as the measured object it is. Refuses the page every
bowling site ships: a stock lane photo, a neon glow, a floating BOOK NOW.

OWN-WORLD: Near-black lacquer ground as the house floor. Lanes are lit maple
strips with hairline boards and gutters. Qatar maroon is the marking system
and the booked fill. Archivo expanded for drafting labels, tabular figures
everywhere, linework in negative. No cards, no stock chrome.

STORY: The visitor sees whether they can bowl tonight and books in the same
gesture, instead of being told to phone between 2pm and 10pm.

FIRST VIEWPORT: 32 vertical lit strips from the top of the viewport past the
fold. Time runs down each against a measured rule at the left in tabular
figures. Booked stretches fill maroon, open stretches stay lit. Headline in
the dark gutter margin. The primary action is the strips themselves.

FORM: Lane Survey, candidate 3 of 7, seed ea18b543.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.
-->`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-ground text-bone antialiased">
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
