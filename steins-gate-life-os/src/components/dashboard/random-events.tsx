import type { RandomEvent } from "@/lib/types";
import { useLabState } from "@/context/lab-state";
import clsx from "clsx";
import { useState } from "react";

interface RandomEventsProps {
  events: RandomEvent[];
}

const effectColors: Record<RandomEvent["effect"], string> = {
  xp_gain: "border-emerald-400/50 bg-emerald-500/15 text-emerald-50",
  xp_loss: "border-rose-400/50 bg-rose-500/15 text-rose-50",
  divergence_shift: "border-sky-400/50 bg-sky-500/15 text-sky-50",
};

export function RandomEventsPanel({ events }: RandomEventsProps) {
  const { triggerEvent } = useLabState();
  const [dispatching, setDispatching] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div
          key={event.id}
          className={clsx(
            "rounded-xl border px-4 py-3 backdrop-blur transition hover:-translate-y-1",
            effectColors[event.effect]
          )}
        >
          <header className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
            <span>{event.label}</span>
            <span className="font-mono">
              {event.effect === "divergence_shift" ? event.magnitude.toFixed(5) : event.magnitude}
            </span>
          </header>
          <p className="mt-2 text-sm">{event.narrative}</p>
          <button
            onClick={() => {
              setDispatching(event.id);
              window.setTimeout(() => {
                triggerEvent(event);
                setDispatching(null);
              }, 400);
            }}
            className="mt-3 inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white hover:bg-white/10 disabled:opacity-60"
            disabled={dispatching === event.id}
          >
            {dispatching === event.id ? "Processing..." : "Execute"}
          </button>
        </div>
      ))}
    </div>
  );
}
