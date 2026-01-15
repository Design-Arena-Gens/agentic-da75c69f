import type { SkillVector } from "@/lib/types";

interface SkillVectorsProps {
  skills: SkillVector[];
}

export function SkillVectors({ skills }: SkillVectorsProps) {
  return (
    <div className="grid gap-3">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100 backdrop-blur"
        >
          <header className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-emerald-200">
            <span>{skill.rank}</span>
            <span>Shield {skill.divergenceShield.toFixed(4)}</span>
          </header>
          <p className="mt-2 text-sm font-medium text-white">{skill.name}</p>
          <p className="mt-1 text-xs text-emerald-200/80">
            {skill.xpAccumulated.toLocaleString()} XP routed
          </p>
        </div>
      ))}
    </div>
  );
}
