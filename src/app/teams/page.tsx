import Link from "next/link";
import { getTeams } from "@/lib/content";

export const metadata = {
  title: "Teams · DG-STEAM Scratch Hub",
};

const statusLabel: Record<string, string> = {
  brainstorming: "Brainstorming",
  building: "Building",
  showcasing: "Showcasing",
};

export default function TeamsPage() {
  const teams = getTeams().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4">
        <span className="tag">Squad view</span>
        <h1 className="font-display text-4xl font-black text-[var(--ink)]">
          Team Dashboards
        </h1>
        <p className="max-w-3xl text-lg font-semibold text-[var(--ink)]">
          Find your team, check your project, and jump into your Scratch studio.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {teams.map((team) => (
          <article key={team.teamId} className="panel p-6">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-xl font-black text-[var(--ink)]">
                {team.name || `Team ${team.teamId.replace("team-", "")}`}
              </h2>
              <span className="shrink-0 border-2 border-[var(--ink)] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.2em]">
                {statusLabel[team.status] ?? team.status}
              </span>
            </div>
            {team.businessIdea && (
              <p className="mt-2 text-sm font-semibold text-[var(--ink)]/70">
                {team.businessIdea}
              </p>
            )}
            {team.members.length > 0 && (
              <p className="mt-2 text-xs font-semibold text-[var(--ink)]/50">
                {team.members.join(" · ")}
              </p>
            )}
            <Link
              href={`/teams/${team.teamId}`}
              className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
            >
              Open dashboard →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
