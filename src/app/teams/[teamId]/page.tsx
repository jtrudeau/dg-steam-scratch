import Link from "next/link";
import { getSessions, getTeamById, getTeams } from "@/lib/content";

export async function generateStaticParams() {
  return getTeams().map((team) => ({ teamId: team.teamId }));
}

type TeamPageProps = {
  params: Promise<{ teamId: string }>;
};

export default async function TeamPage({ params }: TeamPageProps) {
  const { teamId } = await params;
  const team = getTeamById(teamId);
  const sessions = getSessions();
  const nextSession = sessions[0];

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
        ← Back to teams
      </Link>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.25em]">
        {team.teamId.toUpperCase()}
      </p>
      <h1 className="font-display text-4xl font-black text-[var(--ink)]">
        {team.name}
      </h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="panel p-6">
          <h2 className="text-xs font-black uppercase tracking-[0.25em]">
            Scratch Studio
          </h2>
          <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
            Share this link with your teammates to collaborate.
          </p>
          <a
            href={team.scratchStudio}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
          >
            Open studio →
          </a>
        </div>
        <div className="panel p-6">
          <h2 className="text-xs font-black uppercase tracking-[0.25em]">
            Next Session
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
            Review checklist →
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
    </section>
  );
}

