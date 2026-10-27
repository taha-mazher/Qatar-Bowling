/**
 * Demo availability. Deterministic on purpose: the same date always produces
 * the same board, so server and client render identically and the meeting
 * never shows a lane flickering between free and booked.
 *
 * When QBC signs, this file is the only thing that gets replaced: swap these
 * functions for their real lane inventory and the whole UI keeps working.
 */

import { HOURS } from "./data";

export const LANE_COUNT = 32;
/**
 * ASSUMPTION, NOT SOURCED. Their reservation page says "28 regular lanes
 * available for adults and 4 bumper lanes for kids only, a total of 32
 * lanes", but it never says WHICH lanes are the bumper ones. The board has
 * to place them somewhere to be drawn, so they sit at the end. Confirm the
 * real numbering with QBC and change this line; nothing else depends on it.
 */
export const BUMPER_LANES = [29, 30, 31, 32];

/** The board shows the evening, in half hours. */
export const BOARD_START_MIN = 16 * 60;
export const BOARD_END_MIN = 24 * 60;
export const SLOT_MIN = 30;
export const SLOT_COUNT = (BOARD_END_MIN - BOARD_START_MIN) / SLOT_MIN;

export function slotLabel(index: number): string {
  const mins = BOARD_START_MIN + index * SLOT_MIN;
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rand(seed: string): number {
  let t = hash(seed) + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** ISO weekday for a yyyy-mm-dd string, 0 = Sunday, matching HOURS order. */
export function weekdayIndex(dateISO: string): number {
  const [y, m, d] = dateISO.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function dayHours(dateISO: string) {
  return HOURS[weekdayIndex(dateISO)];
}

/**
 * Friday 08:00 to 19:00 belongs to the three resident clubs. All 32 lanes.
 * This is a real rule from their timings page, and the UI has to honour it.
 */
export function isLeagueBlocked(dateISO: string, slotIndex: number): boolean {
  const day = dayHours(dateISO);
  if (!day.leagueOnly) return false;
  const mins = BOARD_START_MIN + slotIndex * SLOT_MIN;
  const [oh, om] = day.leagueOnly.open.split(":").map(Number);
  const [ch, cm] = day.leagueOnly.close.split(":").map(Number);
  return mins >= oh * 60 + om && mins < ch * 60 + cm;
}

export type SlotState = "open" | "booked" | "league";

export function slotState(
  dateISO: string,
  lane: number,
  slotIndex: number,
): SlotState {
  if (isLeagueBlocked(dateISO, slotIndex)) return "league";
  // Busier as the evening goes on, and the bumper lanes fill fastest
  // because that is who books them.
  const peak = slotIndex / SLOT_COUNT;
  const bumper = BUMPER_LANES.includes(lane) ? 0.18 : 0;
  const threshold = 0.16 + peak * 0.42 + bumper;
  return rand(`${dateISO}:${lane}:${slotIndex}`) < threshold ? "booked" : "open";
}

export function laneRow(dateISO: string, lane: number): SlotState[] {
  return Array.from({ length: SLOT_COUNT }, (_, i) =>
    slotState(dateISO, lane, i),
  );
}

export function boardFor(dateISO: string): SlotState[][] {
  return Array.from({ length: LANE_COUNT }, (_, i) => laneRow(dateISO, i + 1));
}

export function openLaneCount(dateISO: string, slotIndex: number): number {
  let n = 0;
  for (let lane = 1; lane <= LANE_COUNT; lane++) {
    if (slotState(dateISO, lane, slotIndex) === "open") n++;
  }
  return n;
}

/** Lanes free for every slot in [startIndex, startIndex + duration). */
export function lanesFreeAcross(
  dateISO: string,
  startIndex: number,
  slots: number,
): number[] {
  const free: number[] = [];
  for (let lane = 1; lane <= LANE_COUNT; lane++) {
    let ok = true;
    for (let i = startIndex; i < startIndex + slots; i++) {
      if (i >= SLOT_COUNT || slotState(dateISO, lane, i) !== "open") {
        ok = false;
        break;
      }
    }
    if (ok) free.push(lane);
  }
  return free;
}

/** yyyy-mm-dd for a Date, in local terms, no timezone surprises. */
export function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

/** The demo's fixed "tonight", so SSR and the client never disagree. */
export const DEMO_TODAY = "2026-08-27";

export function nextDays(fromISO: string, count: number): string[] {
  const [y, m, d] = fromISO.split("-").map(Number);
  return Array.from({ length: count }, (_, i) => {
    const dt = new Date(y, m - 1, d + i);
    return toISO(dt);
  });
}

export function prettyDate(dateISO: string): string {
  const [y, m, d] = dateISO.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
