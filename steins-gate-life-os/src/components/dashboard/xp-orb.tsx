import type { XPEngineState } from "@/lib/types";

interface XPDialProps {
  xp: XPEngineState;
}

export function XPDial({ xp }: XPDialProps) {
  const circumference = 2 * Math.PI * 42;
  const progress = Math.max(0, Math.min(1, xp.progressToNext || 0));
  const offset = circumference * (1 - progress);
  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r="42"
          stroke="rgba(148, 163, 184, 0.25)"
          strokeWidth="14"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r="42"
          stroke="url(#xpGradient)"
          strokeWidth="14"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <g className="font-mono" textAnchor="middle">
          <text x="60" y="60" dy="-4" className="text-emerald-200 text-xl font-semibold">
            Lv.{xp.level}
          </text>
          <text x="60" y="80" className="fill-sky-100 text-sm opacity-80">
            {xp.totalXP.toLocaleString()} XP
          </text>
        </g>
      </svg>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">XP telemetry</p>
        <p className="text-sm text-zinc-300">
          <span className="text-sky-200 font-semibold">+{xp.dailyGain}</span> today ·{" "}
          <span className="text-rose-200 font-semibold">
            {xp.dailyPenalty}
            XP decay
          </span>
        </p>
        <p className="text-xs text-zinc-400">
          Streak integrity: <span className="text-emerald-300">{xp.streakDays} days</span>
        </p>
      </div>
    </div>
  );
}
