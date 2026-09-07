import { Suspense } from "react";
import type { Metadata } from "next";
import BookingFlow from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Book a lane",
  description:
    "Pick your date, your time and your lanes. Bookings start at 2 lanes and 10 players.",
};

export default function BookPage() {
  return (
    // A form reads as a form at a form's measure. At the full 1240px the
    // confirmation stranded a narrow column beside a lot of empty floor.
    <div className="mx-auto max-w-[920px] px-5 py-12 md:px-8 md:py-16">
      <h1 className="display text-[clamp(2.4rem,6vw,3.6rem)] text-bone">
        Book a lane.
      </h1>
      <p className="mt-5 max-w-[54ch] text-[17px] leading-relaxed text-bone-dim">
        Three steps and the lanes are yours. Bookings start at 2 lanes and 10
        players; anything smaller than that is walk-in, which costs you nothing
        and needs no arranging.
      </p>

      <div className="mt-12">
        <Suspense
          fallback={
            <p className="text-[15px] text-bone-dim">Loading the board…</p>
          }
        >
          <BookingFlow />
        </Suspense>
      </div>
    </div>
  );
}
