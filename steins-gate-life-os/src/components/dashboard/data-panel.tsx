import type { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";

interface DataPanelProps extends PropsWithChildren {
  title: string;
  accent?: "sky" | "emerald" | "violet" | "amber" | "rose" | "zinc";
  icon?: ReactNode;
  footer?: ReactNode;
  wrap?: boolean;
}

const accentMap: Record<NonNullable<DataPanelProps["accent"]>, string> = {
  sky: "border-sky-400/60 bg-sky-400/10 shadow-[inset_0_0_40px_rgba(56,189,248,0.25)]",
  emerald:
    "border-emerald-400/60 bg-emerald-400/10 shadow-[inset_0_0_40px_rgba(52,211,153,0.25)]",
  violet:
    "border-violet-400/60 bg-violet-500/10 shadow-[inset_0_0_40px_rgba(167,139,250,0.25)]",
  amber:
    "border-amber-400/60 bg-amber-400/10 shadow-[inset_0_0_40px_rgba(250,204,21,0.25)]",
  rose: "border-rose-400/60 bg-rose-500/10 shadow-[inset_0_0_40px_rgba(244,114,182,0.25)]",
  zinc: "border-zinc-700/60 bg-zinc-600/10 shadow-[inset_0_0_40px_rgba(161,161,170,0.2)]",
};

export function DataPanel({
  title,
  accent = "zinc",
  icon,
  footer,
  wrap = true,
  children,
}: DataPanelProps) {
  return (
    <article
      className={clsx(
        "group rounded-2xl border text-sm text-zinc-200 transition-all duration-300",
        accentMap[accent]
      )}
    >
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-3">
          {icon ? <span className="text-xl opacity-80">{icon}</span> : null}
          <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          worldline.log
        </span>
      </div>
      <div className={clsx(wrap ? "px-5 py-4" : "")}>
        <div className={clsx(wrap ? "space-y-3" : "h-full")}>{children}</div>
      </div>
      {footer ? (
        <footer className="border-t border-white/5 px-5 py-3 text-xs text-zinc-400">
          {footer}
        </footer>
      ) : null}
    </article>
  );
}
