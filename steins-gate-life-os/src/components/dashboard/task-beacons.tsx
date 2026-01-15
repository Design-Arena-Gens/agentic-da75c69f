import type { TaskBeacon } from "@/lib/types";
import clsx from "clsx";

interface TaskBeaconsProps {
  tasks: TaskBeacon[];
}

const priorityLabels: Record<TaskBeacon["priority"], string> = {
  alpha: "ALPHA",
  beta: "BETA",
  gamma: "GAMMA",
};

const priorityStyles: Record<TaskBeacon["priority"], string> = {
  alpha: "border-rose-400/50 bg-rose-500/15 text-rose-50",
  beta: "border-amber-400/50 bg-amber-500/15 text-amber-50",
  gamma: "border-sky-400/50 bg-sky-500/15 text-sky-50",
};

export function TaskBeacons({ tasks }: TaskBeaconsProps) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={clsx(
            "rounded-xl border px-4 py-3 backdrop-blur transition",
            priorityStyles[task.priority]
          )}
        >
          <header className="flex items-center justify-between text-xs">
            <span className="font-mono uppercase tracking-[0.3em]">
              {priorityLabels[task.priority]}
            </span>
            <span className="text-white/60">
              {new Date(task.due).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </header>
          <p className="mt-2 text-sm font-medium text-white">{task.label}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
            {task.status === "completed"
              ? "Secure"
              : task.status === "overdue"
                ? "Temporal Debt"
                : "Active Window"}
          </p>
        </li>
      ))}
    </ul>
  );
}
