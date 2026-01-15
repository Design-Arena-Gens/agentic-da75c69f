import type { CriticalEvent } from "@/lib/types";

interface CriticalEventsProps {
  events: CriticalEvent[];
}

export function CriticalEvents({ events }: CriticalEventsProps) {
  return (
    <ul className="space-y-3">
      {events.map((event) => (
        <li
          key={event.id}
          className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-sky-400/50 hover:bg-sky-400/10"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-400">
            <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
            <span className="text-emerald-300">
              {event.impact > 0 ? "+" : ""}
              {event.impact.toFixed(5)}
            </span>
          </div>
          <p className="mt-2 text-sm text-zinc-100">{event.description}</p>
        </li>
      ))}
    </ul>
  );
}
