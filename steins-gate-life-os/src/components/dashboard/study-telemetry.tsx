import type { StudyTelemetry } from "@/lib/types";

interface StudyTelemetryProps {
  sessions: StudyTelemetry[];
}

export function StudyTelemetryPanel({ sessions }: StudyTelemetryProps) {
  return (
    <div className="grid gap-3">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="rounded-xl border border-violet-400/50 bg-violet-500/10 px-4 py-3 text-sm text-violet-100 backdrop-blur"
        >
          <header className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-violet-200">
            <span>{session.focus}</span>
            <span>{session.durationMinutes}m</span>
          </header>
          <p className="mt-2 text-sm font-medium text-white">{session.topic}</p>
          <p className="mt-1 text-xs text-violet-200/80">+{session.xpAwarded} XP</p>
        </div>
      ))}
    </div>
  );
}
