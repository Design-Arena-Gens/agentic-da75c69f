import type { DailyLogSummary } from "@/lib/types";
import clsx from "clsx";

interface DailyLogStreamProps {
  logs: DailyLogSummary[];
}

export function DailyLogStream({ logs }: DailyLogStreamProps) {
  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <article
          key={log.date}
          className={clsx(
            "rounded-xl border px-4 py-3",
            log.status === "stabilized" && "border-emerald-400/40 bg-emerald-500/10",
            log.status === "volatile" && "border-amber-400/40 bg-amber-400/10",
            log.status === "critical" && "border-rose-400/40 bg-rose-500/10"
          )}
        >
          <header className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-mono uppercase tracking-[0.2em]">
              {new Date(log.date).toLocaleDateString(undefined, {
                weekday: "short",
                day: "2-digit",
                month: "short",
              })}
            </span>
            <div className="flex items-center gap-3 font-mono">
              <span className={log.xpDelta >= 0 ? "text-emerald-200" : "text-rose-200"}>
                {log.xpDelta >= 0 ? "+" : ""}
                {log.xpDelta} XP
              </span>
              <span className="text-sky-200">
                {log.divergenceDelta >= 0 ? "+" : ""}
                {log.divergenceDelta.toFixed(5)}
              </span>
            </div>
          </header>
          <p className="mt-2 text-sm text-zinc-100">{log.headline}</p>
        </article>
      ))}
    </div>
  );
}
