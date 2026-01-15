import type { HabitPulse } from "@/lib/types";
import clsx from "clsx";

interface HabitPulseProps {
  habits: HabitPulse[];
}

const statusStyles: Record<HabitPulse["status"], string> = {
  completed: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
  missed: "border-rose-400/40 bg-rose-500/10 text-rose-50",
  pending: "border-sky-400/40 bg-sky-500/10 text-sky-50",
};

export function HabitPulse({ habits }: HabitPulseProps) {
  return (
    <div className="grid gap-3">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className={clsx(
            "flex items-center justify-between rounded-xl border px-4 py-3 backdrop-blur",
            statusStyles[habit.status]
          )}
        >
          <div>
            <p className="text-sm font-semibold">{habit.name}</p>
            <p className="text-xs text-white/70">
              Streak: <span className="font-mono">{habit.streak}d</span>
            </p>
          </div>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
            +{habit.xpValue} XP
          </span>
        </div>
      ))}
    </div>
  );
}
