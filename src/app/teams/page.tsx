import Link from "next/link";
import { getTeams } from "@/lib/content";

export const metadata = {
  title: "Teams · DG-STEAM Scratch Hub",
};

export default function TeamsPage() {
  const teams = getTeams();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4">
        <span className="tag">Squad view</span>
        <h1 className="font-display text-4xl font-black text-[var(--ink)]">
          Team Dashboards
        </h1>
        <p className="max-w-3xl text-lg font-semibold text-[var(--ink)]">
          Jump to your squad’s workspace: sprint goals, Scratch studio, and
          reflection prompts without hunting through the KB.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {teams.map((team) => (
          <article key={team.teamId} className="panel p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em]">
              {team.teamId.toUpperCase()}
            </p>
            <h2 className="mt-2 text-2xl font-black text-[var(--ink)]">
              {team.name}
            </h2>
            {team.notes && (
              <p className="mt-3 text-sm font-semibold text-[var(--ink)]">
                {team.notes}
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

