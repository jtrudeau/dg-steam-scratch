import Link from "next/link";
import { getSessions, getTeamById, getTeams } from "@/lib/content";
import { ScratchEmbed } from "@/components/scratch/ScratchEmbed";

export async function generateStaticParams() {
  return getTeams().map((team) => ({ teamId: team.teamId }));
}

type TeamPageProps = {
  params: Promise<{ teamId: string }>;
};

const statusLabel: Record<string, string> = {
  brainstorming: "Brainstorming",
  building: "Building",
  showcasing: "Showcasing",
};

/** Extract numeric project ID from a scratch.mit.edu/projects/123 URL */
function extractProjectId(url: string): number | null {
  const match = url.match(/scratch\.mit\.edu\/projects\/(\d+)/);
  return match ? Number(match[1]) : null;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { teamId } = await params;
  const team = getTeamById(teamId);
  const sessions = getSessions();
  const nextSession = sessions[sessions.length - 1];
  const projectId = team?.scratchProject
    ? extractProjectId(team.scratchProject)
    : null;

  if (!team) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <span className="tag">Teams</span>
        <h1 className="mt-4 text-3xl font-black text-[var(--ink)]">
          Team not found
        </h1>
        <Link
          href="/teams"
          className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
        >
          Back to teams
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/teams"
        className="text-sm font-black uppercase tracking-[0.2em] text-[var(--scratch-blue)]"
      >
        ← All teams
      </Link>

      <div className="mt-4 flex items-baseline gap-3">
        <h1 className="font-display text-4xl font-black text-[var(--ink)]">
          {team.name || `Team ${teamId.replace("team-", "")}`}
        </h1>
        <span className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]">
          {statusLabel[team.status] ?? team.status}
        </span>
      </div>

      {team.members.length > 0 && (
        <p className="mt-2 text-sm font-semibold text-[var(--ink)]/70">
          {team.members.join(" · ")}
        </p>
      )}

      {team.businessIdea && (
        <div className="panel mt-6 p-6">
          <h2 className="text-xs font-black uppercase tracking-[0.25em]">
            Our Sustainable Business Idea
          </h2>
          <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
            {team.businessIdea}
          </p>
          {team.sdg && (
            <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--ink)]/60">
              SDG: {team.sdg}
            </p>
          )}
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {team.scratchProject && (
          <div className="panel p-6">
            <h2 className="text-xs font-black uppercase tracking-[0.25em]">
              Our Scratch Project
            </h2>
            <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
              Your team&apos;s shared project on Scratch.
            </p>
            <a
              href={team.scratchProject}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
            >
              Open project →
            </a>
          </div>
        )}
        <div className="panel p-6">
          <h2 className="text-xs font-black uppercase tracking-[0.25em]">
            Current Session
          </h2>
          <p className="mt-2 text-sm font-semibold">
            Meeting {nextSession.meetingNumber}: {nextSession.title}
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--ink)]/70">
            Focus on {nextSession.scratchFocus.join(", ")}.
          </p>
          <Link
            href={`/sessions/${nextSession.id}`}
            className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
          >
            See today&apos;s steps →
          </Link>
        </div>
      </div>

      {team.notes && (
        <div className="panel mt-6 p-6">
          <h2 className="text-xs font-black uppercase tracking-[0.25em]">
            Team Notes
          </h2>
          <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
            {team.notes}
          </p>
        </div>
      )}

      {projectId && (
        <div className="mt-6">
          <h2 className="text-xs font-black uppercase tracking-[0.25em]">
            Our Project
          </h2>
          <div className="mt-3">
            <ScratchEmbed
              projectId={projectId}
              title={`${team.name || "Team"} Project`}
              authorSummary={team.businessIdea || ""}
            />
          </div>
        </div>
      )}
    </section>
  );
}
