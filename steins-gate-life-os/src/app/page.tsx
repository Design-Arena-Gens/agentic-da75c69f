'use client';

import { useMemo } from "react";
import { useLabState } from "@/context/lab-state";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DataPanel } from "@/components/dashboard/data-panel";
import { XPDial } from "@/components/dashboard/xp-orb";
import { WorldlineMeter } from "@/components/dashboard/worldline-meter";
import { CriticalEvents } from "@/components/dashboard/critical-events";
import { DailyLogStream } from "@/components/dashboard/daily-log-stream";
import { HabitPulse } from "@/components/dashboard/habit-pulse";
import { TaskBeacons } from "@/components/dashboard/task-beacons";
import { StudyTelemetryPanel } from "@/components/dashboard/study-telemetry";
import { SkillVectors } from "@/components/dashboard/skill-vectors";
import { TransmissionFeed } from "@/components/dashboard/transmission-feed";
import { RandomEventsPanel } from "@/components/dashboard/random-events";
import { countdownTo } from "@/lib/time";

export default function Home() {
  const {
    state: { dashboard },
    xpState,
  } = useLabState();

  const nextResetLabel = useMemo(() => countdownTo(dashboard.nextReset), [dashboard.nextReset]);

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[1300px] flex-col gap-10 px-6 py-12 lg:px-12">
      <div className="grid-overlay pointer-events-none absolute inset-12 -z-10 opacity-50" />
      <header className="rounded-3xl border border-white/10 bg-white/5 p-8 text-zinc-100 shadow-[0_0_60px_-20px_rgba(56,189,248,0.7)] backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-sky-300">Steins;Gate Life OS</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
              DASHBOARD · Central Control Room
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-300">
              Okabe Rintarou presiding. Every data point below is a temporal vector. Stabilise the
              worldline before 05:00 IST reset.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono text-sm">
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-5 py-3 text-emerald-100 shadow-[0_0_30px_rgba(52,211,153,0.25)]">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Next reset</p>
              <p className="mt-1 text-lg font-semibold">{nextResetLabel}</p>
            </div>
            <div className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-5 py-3 text-rose-100 shadow-[0_0_30px_rgba(244,114,182,0.25)]">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-200">Daily Penalty</p>
              <p className="mt-1 text-lg font-semibold">
                {dashboard.xp.dailyPenalty}
                XP
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <DashboardShell title="Temporal Engines" subtitle="XP · Divergence · Critical narrative">
          <div className="grid gap-6 lg:grid-cols-2">
            <DataPanel title="XP Core" accent="sky" icon="⚡">
              <XPDial xp={xpState} />
            </DataPanel>
            <DataPanel
              title="Worldline Meter"
              accent="emerald"
              icon="🛰️"
              footer="Daily calibration enforced at 05:00 IST."
            >
              <WorldlineMeter reading={dashboard.divergence} />
            </DataPanel>
          </div>
          <DataPanel
            title="Critical Events Feed"
            accent="violet"
            icon="🗒️"
            footer="Kurisu monitors these spikes; deviation beyond ±0.00050 flags SERN surveillance."
          >
            <CriticalEvents events={dashboard.criticalEvents} />
          </DataPanel>
        </DashboardShell>

        <DashboardShell
          title="Agent Signals"
          subtitle="Lab members push transmissions and random injections."
        >
          <DataPanel
            title="Incoming Transmissions"
            accent="zinc"
            icon="📡"
            footer="Agent router selects persona based on divergence trajectory."
          >
            <TransmissionFeed transmissions={dashboard.transmissions} />
          </DataPanel>
          <DataPanel
            title="Random Event Queue"
            accent="amber"
            icon="🎲"
            footer="Mayuri can trigger chaos; clear events to stabilise loops."
          >
            <RandomEventsPanel events={dashboard.randomEvents} />
          </DataPanel>
        </DashboardShell>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <DashboardShell
          title="Daily Memory Stack"
          subtitle="Logs recorded straight into the worldline archive."
        >
          <DataPanel
            title="Daily Logs"
            accent="zinc"
            icon="🗃️"
            footer="Okabe demands at least one meaningful entry per worldline."
          >
            <DailyLogStream logs={dashboard.dailyLogs} />
          </DataPanel>
        </DashboardShell>

        <DashboardShell title="Habit Pulse" subtitle="Recurring causality loops and streaks.">
          <DataPanel
            title="Streak Monitor"
            accent="emerald"
            icon="🔁"
            footer="Loss aversion applies. Missed loops leak XP into divergence."
          >
            <HabitPulse habits={dashboard.habits} />
          </DataPanel>
          <DataPanel
            title="Temporal Tasks"
            accent="rose"
            icon="⌛"
            footer="Harsh logic checks will auto-penalise overdue ALPHA missions."
          >
            <TaskBeacons tasks={dashboard.tasks} />
          </DataPanel>
        </DashboardShell>

        <DashboardShell title="IISER Telemetry" subtitle="Study + Skill growth vectors.">
          <DataPanel
            title="Study Sessions"
            accent="violet"
            icon="📚"
            footer="Kurisu audits focus balance: theory vs. problem sets."
          >
            <StudyTelemetryPanel sessions={dashboard.studyTelemetry} />
          </DataPanel>
          <DataPanel
            title="Skill Vectors"
            accent="emerald"
            icon="🛡️"
            footer="Shield strength reduces divergence bleed during chaotic cycles."
          >
            <SkillVectors skills={dashboard.skillVectors} />
          </DataPanel>
        </DashboardShell>
      </section>
    </main>
  );
}
