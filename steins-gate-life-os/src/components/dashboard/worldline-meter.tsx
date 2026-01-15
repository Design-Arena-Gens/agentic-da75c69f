import type { DivergenceReading } from "@/lib/types";

interface WorldlineMeterProps {
  reading: DivergenceReading;
}

export function WorldlineMeter({ reading }: WorldlineMeterProps) {
  const decimals = reading.divergence.toFixed(6).split(".");
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="rounded-2xl border border-emerald-400/50 bg-emerald-500/10 px-6 py-4 text-emerald-100 shadow-[0_0_30px_rgba(52,211,153,0.25)]">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Worldline</p>
        <p className="mt-2 font-mono text-4xl font-semibold leading-none">
          {reading.worldlineId}
        </p>
      </div>
      <div className="space-y-2 text-sm text-zinc-300">
        <p>
          Divergence:{" "}
          <span className="font-mono text-lg text-emerald-200">
            {decimals[0]}.{decimals[1]}
          </span>
        </p>
        <p className="text-xs text-zinc-500">
          Latest temporal calibration:{" "}
          {new Date(reading.lastUpdate).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="relative h-2 w-56 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="absolute inset-y-0 left-0 bg-emerald-400/70"
            style={{ width: `${Math.min(100, Math.max(0, reading.divergence * 90))}%` }}
          />
          <div className="absolute inset-0 animate-pulse bg-emerald-400/10" />
        </div>
      </div>
    </div>
  );
}
