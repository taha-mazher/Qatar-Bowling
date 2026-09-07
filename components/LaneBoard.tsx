"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  BUMPER_LANES,
  LANE_COUNT,
  SLOT_COUNT,
  boardFor,
  openLaneCount,
  slotLabel,
} from "@/lib/availability";

gsap.registerPlugin(useGSAP);

type Props = {
  dateISO: string;
  /** Slot index the summary line reports on. */
  focusSlot?: number;
};

/**
 * The board IS the lane. 32 lit maple strips on the dark house floor, time
 * running down each one against a measured rule. A booked stretch is oil laid
 * down the lane. Tapping an open stretch starts the booking with that lane
 * and time already chosen: the proof and the action are the same object.
 */
export default function LaneBoard({ dateISO, focusSlot = 8 }: Props) {
  const router = useRouter();
  const scope = useRef<HTMLDivElement>(null);
  const board = boardFor(dateISO);
  const openNow = openLaneCount(dateISO, focusSlot);

  useGSAP(
    () => {
      // One authored moment: the house turns its lanes on, lane 1 to lane 32.
      // gsap.from() means the lit state is the CSS default, so if this never
      // runs the board is still fully visible. clearProps strips the inline
      // transform afterwards, so a tween interrupted mid-flight can never
      // leave a lane short or dim.
      // A tab that loads in the background has requestAnimationFrame
      // throttled, so a staggered tween can stall part-way and strand later
      // lanes dim. The lit board is the CSS default, so when we cannot
      // animate honestly we simply do not animate.
      if (document.visibilityState !== "visible") return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(scope.current!.querySelectorAll("[data-lane]"), {
          scaleY: 0.86,
          opacity: 0.2,
          transformOrigin: "top center",
          duration: 0.75,
          ease: "expo.out",
          stagger: { each: 0.012, from: "start" },
          clearProps: "transform,opacity",
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  const go = (lane: number, slot: number) => {
    router.push(`/book?date=${dateISO}&lane=${lane}&slot=${slot}`);
  };

  return (
    <div ref={scope} className="w-full">
      <p className="sr-only">
        {openNow} of {LANE_COUNT} lanes are open at {slotLabel(focusSlot)}.
        Select an open time on any lane to start a booking.
      </p>

      <div className="overflow-x-auto overscroll-x-contain pb-2">
        <div className="board-grid">
          {/* the measured rule: distance down the lane is time */}
          <div className="sticky left-0 z-20 bg-ground pe-2">
            <div className="h-9" />
            {Array.from({ length: SLOT_COUNT }).map((_, i) => (
              <div
                key={i}
                className="relative board-cell border-t border-rule first:border-t-0"
              >
                {i % 2 === 0 && (
                  <span className="tnum absolute -top-[7px] end-2 bg-ground ps-1 text-[10px] font-semibold tracking-wider text-bone-dim">
                    {slotLabel(i)}
                  </span>
                )}
              </div>
            ))}
            <div className="relative h-0">
              <span className="tnum absolute -top-[7px] end-2 bg-ground ps-1 text-[10px] font-semibold tracking-wider text-bone-dim">
                00:00
              </span>
            </div>
          </div>

          {board.map((row, laneIdx) => {
            const lane = laneIdx + 1;
            const bumper = BUMPER_LANES.includes(lane);
            return (
              <div key={lane} className="lane-gutter px-[1.5px]">
                {/* lane number, stamped at the head of the approach */}
                <div className="flex h-9 items-center justify-center">
                  <span
                    className={`tnum text-[11px] font-bold ${
                      bumper ? "text-maroon-bright" : "text-rule-bright"
                    }`}
                    title={bumper ? `Lane ${lane}, bumper lane` : undefined}
                  >
                    {lane}
                  </span>
                </div>

                <div data-lane className="lane">
                  {row.map((state, slot) => {
                    if (state === "open") {
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => go(lane, slot)}
                          aria-label={`Book lane ${lane} at ${slotLabel(slot)}${
                            bumper ? ", bumper lane" : ""
                          }`}
                          className="group relative block board-cell w-full border-t border-[#6d4315]/35 transition-colors duration-150 first:border-t-0 hover:bg-maple-lit focus-visible:z-10"
                        >
                          <span className="pointer-events-none absolute inset-x-[3px] inset-y-[3px] border border-transparent transition-colors duration-150 group-hover:border-maroon" />
                        </button>
                      );
                    }
                    if (state === "league") {
                      return (
                        <div
                          key={slot}
                          aria-hidden
                          title="League play"
                          className="board-cell border-t border-[#6d4315]/35 bg-ground-raised first:border-t-0"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(135deg, rgba(178,28,73,.5) 0 1px, transparent 1px 6px)",
                          }}
                        />
                      );
                    }
                    return (
                      <div
                        key={slot}
                        aria-hidden
                        title="Booked"
                        className="oil-fill board-cell border-t border-maroon-sunk first:border-t-0"
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Key className="lane" label="Open" />
        <Key className="oil-fill" label="Booked" />
        <Key
          className="bg-ground-raised"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(178,28,73,.5) 0 1px, transparent 1px 6px)",
          }}
          label="League play"
        />
        <Key className="bg-transparent border border-maroon-bright" label="Lanes 29–32 are bumper lanes" />
      </div>
    </div>
  );
}

function Key({
  className,
  style,
  label,
}: {
  className: string;
  style?: React.CSSProperties;
  label: string;
}) {
  return (
    <span className="flex items-center gap-2 text-[12px] text-bone-dim">
      <span className={`h-3.5 w-6 shrink-0 ${className}`} style={style} />
      {label}
    </span>
  );
}
