"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BOOKING_RULES, CENTER } from "@/lib/data";
import {
  BUMPER_LANES,
  DEMO_TODAY,
  SLOT_COUNT,
  dayHours,
  isLeagueBlocked,
  lanesFreeAcross,
  nextDays,
  prettyDate,
  slotLabel,
} from "@/lib/availability";

gsap.registerPlugin(useGSAP);

const DURATIONS = [
  { slots: 2, label: "1 hour", games: 2 },
  { slots: 4, label: "2 hours", games: 4 },
  { slots: 6, label: "3 hours", games: 6 },
];

type Step = 0 | 1 | 2 | 3;

export default function BookingFlow() {
  const params = useSearchParams();
  const scope = useRef<HTMLDivElement>(null);

  const [date, setDate] = useState(params.get("date") ?? DEMO_TODAY);
  const [startSlot, setStartSlot] = useState(Number(params.get("slot") ?? 8));
  const [duration, setDuration] = useState(2);
  const [lanes, setLanes] = useState(2);
  const [players, setPlayers] = useState(10);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<Step>(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const days = useMemo(() => nextDays(DEMO_TODAY, 7), []);
  const free = useMemo(
    () => lanesFreeAcross(date, startSlot, duration),
    [date, startSlot, duration],
  );

  // Their two published rules disagree: reservations open at 2 lanes and 10
  // players, but the 100 QR lane-hire rate needs 4 lanes and 20 people. So
  // small bookings are priced per game instead, which is what the counter
  // actually does.
  const hours = duration / 2;
  const games = DURATIONS.find((d) => d.slots === duration)!.games;
  const laneHireEligible = lanes >= 4 && players >= 20;
  const total = laneHireEligible ? lanes * hours * 100 : players * games * 12;
  const deposit = Math.round((total * BOOKING_RULES.depositPct) / 100);

  const walkInOnly = players < BOOKING_RULES.minPlayers;
  const enoughLanes = lanes >= BOOKING_RULES.minLanes;
  const enoughFree = free.length >= lanes;

  useGSAP(
    () => {
      gsap.from(scope.current!.querySelectorAll("[data-fill]"), {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 0.5,
        ease: "expo.out",
        stagger: 0.03,
      });
    },
    { scope, dependencies: [lanes, startSlot, duration, date, step] },
  );

  if (done) {
    return (
      <Confirmation
        date={date}
        startSlot={startSlot}
        duration={duration}
        lanes={lanes}
        players={players}
        name={name}
        total={total}
        deposit={deposit}
        laneHire={laneHireEligible}
      />
    );
  }

  const next = () => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (walkInOnly)
        e.players = `Bookings start at ${BOOKING_RULES.minPlayers} players.`;
      if (!enoughLanes)
        e.lanes = `Bookings start at ${BOOKING_RULES.minLanes} lanes.`;
      if (!enoughFree)
        e.lanes = `Only ${free.length} lanes are free for that whole stretch.`;
    }
    if (step === 2) {
      if (name.trim().length < 2) e.name = "Please give us a name for the booking.";
      if (phone.trim().length < 6) e.phone = "We need a number to confirm on.";
    }
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (step === 2) setDone(true);
      else setStep((step + 1) as Step);
    }
  };

  return (
    <div ref={scope}>
      <Rule step={step} />

      {step === 0 && (
        <Panel title="When would you like to bowl?">
          <fieldset>
            <legend className="label mb-3">Date</legend>
            <div className="flex flex-wrap gap-2">
              {days.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDate(d)}
                  aria-pressed={d === date}
                  className={`min-h-12 border px-4 text-[14px] transition-colors duration-150 ${
                    d === date
                      ? "border-maple bg-maple text-ground font-bold"
                      : "border-rule text-bone hover:border-maple"
                  }`}
                >
                  {prettyDate(d).replace(/,.*/, "")}
                  <span className="tnum ms-2 opacity-70">
                    {d.slice(8)}/{d.slice(5, 7)}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          {dayHours(date).leagueOnly && (
            <Note>
              Friday mornings belong to the leagues. All 32 lanes are held from{" "}
              {dayHours(date).leagueOnly!.open} until{" "}
              {dayHours(date).leagueOnly!.close}, so the board below starts in
              the evening.
            </Note>
          )}

          <fieldset className="mt-9">
            <legend className="label mb-3">Start time</legend>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: SLOT_COUNT }).map((_, i) => {
                const blocked = isLeagueBlocked(date, i);
                const tooLate = i + duration > SLOT_COUNT;
                const disabled = blocked || tooLate;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={disabled}
                    onClick={() => setStartSlot(i)}
                    aria-pressed={i === startSlot}
                    className={`tnum min-h-12 w-[74px] border text-[14px] transition-colors duration-150 ${
                      disabled
                        ? "cursor-not-allowed border-rule/50 text-bone-dim/40"
                        : i === startSlot
                          ? "border-maple bg-maple font-bold text-ground"
                          : "border-rule text-bone hover:border-maple"
                    }`}
                  >
                    {slotLabel(i)}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-9">
            <legend className="label mb-3">How long</legend>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.slots}
                  type="button"
                  onClick={() => setDuration(d.slots)}
                  aria-pressed={d.slots === duration}
                  className={`min-h-12 border px-5 text-[14px] transition-colors duration-150 ${
                    d.slots === duration
                      ? "border-maple bg-maple font-bold text-ground"
                      : "border-rule text-bone hover:border-maple"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </fieldset>
        </Panel>
      )}

      {step === 1 && (
        <Panel title="How many of you?">
          <div className="grid gap-9 sm:grid-cols-2">
            <Counter
              label="Players"
              value={players}
              min={1}
              max={200}
              step={1}
              onChange={setPlayers}
              error={errors.players}
            />
            <Counter
              label="Lanes"
              value={lanes}
              min={1}
              max={Math.max(1, free.length)}
              step={1}
              onChange={setLanes}
              error={errors.lanes}
              hint={`${free.length} lanes free for that whole stretch`}
            />
          </div>

          {/* The zine raise: the rule is taught where it binds, in plain
              words, never as fine print at the bottom. */}
          {walkInOnly && (
            <Note tone="warn">
              Under {BOOKING_RULES.minPlayers} players you do not need to book
              at all. Just come in and take a lane, first come first served. If
              you would rather have lanes held for you, add a few more players.
            </Note>
          )}

          {!laneHireEligible && !walkInOnly && (
            <Note>
              You are being priced per game at 12 QR a head, which works out
              cheaper for a group this size. Hiring whole lanes at 100 QR an
              hour needs 4 lanes and 20 people.
            </Note>
          )}

          <div className="mt-9">
            <h3 className="label mb-3">Your lanes</h3>
            <LaneStrip lanes={free.slice(0, lanes)} />
          </div>
        </Panel>
      )}

      {step === 2 && (
        <Panel title="Who is the booking for?">
          <div className="grid max-w-[560px] gap-6">
            <Field
              id="name"
              label="Name"
              value={name}
              onChange={setName}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              id="phone"
              label="Mobile number"
              value={phone}
              onChange={setPhone}
              error={errors.phone}
              type="tel"
              autoComplete="tel"
              hint="We send the confirmation here."
            />
          </div>
          <Note>
            We hold the lanes for {BOOKING_RULES.holdHours} hours. The booking
            is confirmed once the {BOOKING_RULES.depositPct}% deposit is paid,
            and the balance is settled at the counter on the day.
          </Note>
        </Panel>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-rule pt-6">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((step - 1) as Step)}
            className="min-h-12 border border-rule-bright px-5 text-[15px] font-semibold text-bone hover:border-maple hover:text-maple"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={next}
          className="lane min-h-12 px-7 text-[15px] font-bold uppercase tracking-[0.1em] text-ground transition-[filter] duration-200 hover:brightness-110"
        >
          {step === 2 ? "Confirm booking" : "Continue"}
        </button>

        {step > 0 && (
          <div className="ms-auto text-end">
            <div className="tnum text-[22px] font-bold text-maple">
              {total} QR
            </div>
            <div className="text-[13px] text-bone-dim">
              {deposit} QR deposit today
            </div>
          </div>
        )}
      </div>

      <p className="mt-8 max-w-[62ch] text-[14px] leading-relaxed text-bone-dim">
        Prefer to speak to someone? Call{" "}
        {CENTER.phones.office.map((p, i) => (
          <span key={p}>
            {i > 0 && " or "}
            <a
              href={`tel:${p.replace(/\s/g, "")}`}
              className="text-maple hover:text-maple-lit"
            >
              {p}
            </a>
          </span>
        ))}
        .
      </p>
    </div>
  );
}

/* ---------------- pieces, all drawn in the survey's own grammar ---------------- */

function Rule({ step }: { step: Step }) {
  const marks = ["When", "How many", "Details"];
  return (
    <ol className="mb-10 grid grid-cols-3 border-t border-rule-bright">
      {marks.map((m, i) => (
        <li key={m} className="relative pt-4">
          <span
            className={`absolute -top-px left-0 h-[3px] w-full transition-colors duration-300 ${
              i <= step ? "bg-maple" : "bg-transparent"
            }`}
          />
          <span className="tnum text-[11px] font-bold tracking-widest text-rule-bright">
            0{i + 1}
          </span>
          <span
            className={`ms-2 text-[13px] font-semibold ${
              i <= step ? "text-bone" : "text-bone-dim"
            }`}
          >
            {m}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="display text-[clamp(1.7rem,3.2vw,2.3rem)] text-bone">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Note({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "warn";
}) {
  return (
    <p
      className={`mt-6 max-w-[64ch] border-s-2 ps-4 text-[15px] leading-relaxed ${
        tone === "warn"
          ? "border-maroon-bright text-bone"
          : "border-rule-bright text-bone-dim"
      }`}
    >
      {children}
    </p>
  );
}

function Counter({
  label,
  value,
  min,
  max,
  step,
  onChange,
  error,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  error?: string;
  hint?: string;
}) {
  const id = label.toLowerCase();
  return (
    <div>
      <label htmlFor={id} className="label block">
        {label}
      </label>
      <div className="mt-3 flex items-stretch border border-rule">
        <button
          type="button"
          aria-label={`One fewer ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - step))}
          className="min-h-12 w-12 text-[20px] text-bone hover:bg-ground-raised hover:text-maple"
        >
          &minus;
        </button>
        <input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value) || min)}
          className="tnum w-full min-w-0 border-x border-rule bg-transparent px-3 text-center text-[20px] font-bold text-maple outline-none"
        />
        <button
          type="button"
          aria-label={`One more ${label.toLowerCase()}`}
          onClick={() => onChange(Math.min(max, value + step))}
          className="min-h-12 w-12 text-[20px] text-bone hover:bg-ground-raised hover:text-maple"
        >
          +
        </button>
      </div>
      {hint && !error && (
        <p className="mt-2 text-[13px] text-bone-dim">{hint}</p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-[13px] font-semibold text-maroon-bright">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (s: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-3 min-h-12 w-full border bg-ground-raised px-4 text-[16px] text-bone outline-none transition-colors duration-150 ${
          error ? "border-maroon-bright" : "border-rule focus:border-maple"
        }`}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-[13px] text-bone-dim">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-err`}
          role="alert"
          className="mt-2 text-[13px] font-semibold text-maroon-bright"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function LaneStrip({ lanes }: { lanes: number[] }) {
  if (lanes.length === 0) {
    return (
      <p className="text-[15px] text-bone-dim">
        Nothing free for that stretch. Try a shorter session or another time.
      </p>
    );
  }
  return (
    <div className="flex gap-[3px] overflow-x-auto pb-2">
      {lanes.map((l) => (
        <div key={l} className="lane-gutter w-[46px] shrink-0 px-[2px]">
          <div className="flex h-7 items-center justify-center">
            <span
              className={`tnum text-[11px] font-bold ${
                BUMPER_LANES.includes(l) ? "text-maroon-bright" : "text-rule-bright"
              }`}
            >
              {l}
            </span>
          </div>
          <div data-fill className="oil h-24" />
        </div>
      ))}
    </div>
  );
}

function Confirmation(props: {
  date: string;
  startSlot: number;
  duration: number;
  lanes: number;
  players: number;
  name: string;
  total: number;
  deposit: number;
  laneHire: boolean;
}) {
  const end = slotLabel(props.startSlot + props.duration);
  return (
    <div>
      <h2 className="display text-[clamp(2rem,4.5vw,3rem)] text-maple">
        Lanes held for {props.name.trim().split(" ")[0]}.
      </h2>
      <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-bone-dim">
        We are holding them for {BOOKING_RULES.holdHours} hours. Pay the deposit
        to lock it in and you are set.
      </p>

      <dl className="mt-10 max-w-[620px] border-t border-rule-bright">
        <Row k="Date" v={prettyDate(props.date)} />
        <Row k="Time" v={`${slotLabel(props.startSlot)} to ${end}`} />
        <Row k="Lanes" v={String(props.lanes)} />
        <Row k="Players" v={String(props.players)} />
        <Row
          k="Priced"
          v={props.laneHire ? "Lane hire, 100 QR per lane per hour" : "12 QR per game, per person"}
        />
        <Row k="Total" v={`${props.total} QR`} big />
        <Row k="Deposit now" v={`${props.deposit} QR`} big />
      </dl>

      <p className="mt-8 max-w-[64ch] border-s-2 border-maroon-bright ps-4 text-[15px] leading-relaxed text-bone">
        This is a concept demonstration. No lane has actually been reserved and
        nothing was sent to Qatar Bowling Center. To book a real lane, call{" "}
        <a
          href={`tel:${CENTER.phones.office[0].replace(/\s/g, "")}`}
          className="text-maple hover:text-maple-lit"
        >
          {CENTER.phones.office[0]}
        </a>
        .
      </p>
    </div>
  );
}

function Row({ k, v, big }: { k: string; v: string; big?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
      <dt className="text-[15px] text-bone-dim">{k}</dt>
      <dd
        className={`tnum text-end ${
          big ? "text-[22px] font-bold text-maple" : "text-[16px] text-bone"
        }`}
      >
        {v}
      </dd>
    </div>
  );
}
