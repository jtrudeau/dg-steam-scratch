import Link from "next/link";
import { getSessionById, getSessions } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";

export async function generateStaticParams() {
  return getSessions().map((session) => ({ sessionId: session.id }));
}

type SessionPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function SessionPage({ params }: SessionPageProps) {
  const { sessionId } = await params;
  const session = getSessionById(sessionId);

  if (!session) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <span className="tag">Sessions</span>
        <h1 className="mt-4 text-3xl font-black text-[var(--ink)]">
          Session not found
        </h1>
        <Link
          href="/sessions"
          className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
        >
          Back to sessions
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/sessions"
        className="text-sm font-black uppercase tracking-[0.2em] text-[var(--scratch-blue)]"
      >
        ← Back to sessions
      </Link>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.25em]">
        Meeting {session.meetingNumber} · {session.phase}
      </p>
      <h1 className="mt-2 font-display text-4xl font-black text-[var(--ink)]">
        {session.title}
      </h1>
      {session.id === "session-01" ? (
        <div className="panel mt-4 border-2 border-[var(--ink)] bg-[var(--butter-light)] p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[var(--ink)]">
            Quick links
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href="/resources/setup" className="btn btn-primary">
              Scratch setup walkthrough
            </Link>
            <Link
              href="/worksheets/scratch-setup-checklist"
              className="btn btn-secondary"
            >
              Setup checklist (printable)
            </Link>
          </div>
          <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
            Use these during the account-creation sprint to keep everyone verified
            and building their first “Hello DG” animation.
          </p>
        </div>
      ) : null}
      <div className="panel mt-4 p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.25em]">
              Student Objective
            </h2>
            <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
              {session.studentObjective}
            </p>
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.25em]">
              Teacher Goal
            </h2>
            <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
              {session.teacherGoal}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xs font-black uppercase tracking-[0.25em]">
            Scratch Focus
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {session.scratchFocus.map((focus) => (
              <span
                key={focus}
                className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xs font-black uppercase tracking-[0.25em]">
            Artifacts
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-semibold text-[var(--ink)]">
            {session.artifacts.map((artifact) => (
              <li key={artifact}>{artifact}</li>
            ))}
          </ul>
        </div>
      </div>
      {session.flow?.length || session.teacherMoves?.length ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {session.flow?.length ? (
            <div className="panel p-5">
              <h3 className="text-xs font-black uppercase tracking-[0.25em]">
                Flow
              </h3>
              <ol className="mt-4 space-y-3">
                {session.flow.map((block) => (
                  <li key={block.title}>
                    <p className="text-sm font-black">
                      {block.title}
                      {block.duration ? ` (${block.duration})` : null}
                    </p>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {block.description}
                    </ReactMarkdown>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          {session.teacherMoves?.length ? (
            <div className="panel p-5">
              <h3 className="text-xs font-black uppercase tracking-[0.25em]">
                Teacher Moves
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
                {session.teacherMoves.map((move) => (
                  <li key={move}>{move}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
      {session.body ? (
        <div className="panel mt-8 p-6">
          <p className="text-xs font-black uppercase tracking-[0.25em]">
            Session Guide
          </p>
          <MdxRenderer source={session.body} />
        </div>
      ) : null}
    </section>
  );
}
