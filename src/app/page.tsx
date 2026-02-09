import { heroCopy } from "@/lib/siteConfig";
import { getSessions } from "@/lib/content";
import { SessionSummaryCard } from "@/components/sessions/SessionSummaryCard";

export default function HomePage() {
  const sessions = getSessions();
  const displayedSessions = sessions.filter((s) =>
    ["project-discovery", "sustainable-business-to-scratch"].includes(s.id)
  );

  return (
    <div className="relative isolate">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="tag">DG Sixth Grade · Scratch PBL</span>
        <h1 className="font-display text-5xl font-black leading-tight text-[var(--ink)] sm:text-6xl">
          {heroCopy.title}
        </h1>
        <p className="max-w-3xl text-xl font-medium text-[var(--ink)]">
          {heroCopy.subtitle}
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="panel p-8">
          <div className="grid gap-4 md:grid-cols-1">
            {displayedSessions.map((session) => (
              <SessionSummaryCard
                key={session.id}
                session={session}
                actionHref={`/sessions/${session.id}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
