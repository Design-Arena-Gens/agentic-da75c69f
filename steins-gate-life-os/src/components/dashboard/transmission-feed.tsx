import type { AgentTransmission } from "@/lib/types";
import clsx from "clsx";

interface TransmissionFeedProps {
  transmissions: AgentTransmission[];
}

const toneStyles: Record<AgentTransmission["tone"], string> = {
  command: "border-sky-500/60 bg-sky-500/15",
  analysis: "border-violet-500/60 bg-violet-500/15",
  support: "border-emerald-500/60 bg-emerald-500/15",
  chaos: "border-amber-500/60 bg-amber-500/15",
};

const agentLabel: Record<AgentTransmission["agent"], { name: string; emoji: string }> = {
  okabe: { name: "Okabe Rintarou", emoji: "🧪" },
  kurisu: { name: "Makise Kurisu", emoji: "🧠" },
  daru: { name: "Super Hacker Daru", emoji: "💻" },
  mayuri: { name: "Shiina Mayuri", emoji: "🎀" },
};

export function TransmissionFeed({ transmissions }: TransmissionFeedProps) {
  return (
    <div className="space-y-3">
      {transmissions.map((tx) => (
        <article
          key={tx.id}
          className={clsx(
            "rounded-xl border px-4 py-3 text-sm text-white backdrop-blur transition hover:translate-x-1 hover:border-white/70",
            toneStyles[tx.tone]
          )}
        >
          <header className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/70">
            <span>
              {agentLabel[tx.agent].emoji} {agentLabel[tx.agent].name}
            </span>
            <span>{tx.worldlineImpact >= 0 ? "+" : ""}
              {tx.worldlineImpact.toFixed(5)}
            </span>
          </header>
          <p className="mt-2 text-sm leading-snug text-white/90">{tx.message}</p>
        </article>
      ))}
    </div>
  );
}
