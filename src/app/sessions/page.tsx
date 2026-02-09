import { getSessions } from "@/lib/content";
import { SessionSummaryCard } from "@/components/sessions/SessionSummaryCard";

export const metadata = {
  title: "Sessions · DG-STEAM Scratch Hub",
};

export default function SessionsPage() {
  const sessions = getSessions().filter((s) =>
    ["project-discovery", "sustainable-business-to-scratch"].includes(s.id)
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4">
        <span className="tag self-start">Learning Arc</span>
        <h1 className="font-display text-4xl font-black text-[var(--ink)]">
          Session Guide
        </h1>
        <p className="max-w-3xl text-lg font-semibold text-[var(--ink)]">
          From onboarding sparks to showcase polish—each meeting has a singular
          goal, Scratch focus, and artifact. Dive into the sessions to pull
          student-ready directions and teacher notes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {sessions.map((session) => (
          <SessionSummaryCard
            key={session.id}
            session={session}
            actionHref={`/sessions/${session.id}`}
          />
        ))}
      </div>
    </section>
  );
}
