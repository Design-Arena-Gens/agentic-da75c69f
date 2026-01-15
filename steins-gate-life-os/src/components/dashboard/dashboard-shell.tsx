import type { PropsWithChildren } from "react";

interface DashboardShellProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export function DashboardShell({ title, subtitle, children }: DashboardShellProps) {
  return (
    <section className="space-y-6 rounded-3xl border border-zinc-800/40 bg-zinc-950/80 p-8 shadow-[0_0_80px_-40px_rgba(59,130,246,0.6)] backdrop-blur">
      <header className="border-b border-zinc-800/60 pb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-sky-100">{title}</h2>
        <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
      </header>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
