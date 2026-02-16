import Link from "next/link";
import { heroCopy } from "@/lib/siteConfig";
import { getSessions } from "@/lib/content";
import { SessionSummaryCard } from "@/components/sessions/SessionSummaryCard";

const quickLinks = [
  { href: "/scratch/game-ideas", label: "Game Ideas", description: "10 project templates to get unstuck" },
  { href: "/sdgs", label: "SDGs", description: "Explore the 17 UN goals" },
  { href: "/scratch", label: "Scratch Guide", description: "Learn blocks, step by step" },
];

export default function HomePage() {
  const sessions = getSessions();
  const currentSession = sessions[sessions.length - 1];

  return (
    <div className="relative isolate">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 pt-16 pb-10 text-center sm:px-6 lg:px-8">
        <span className="tag">Grade 6 · Scratch · Sustainable Engineering</span>
        <h1 className="font-display text-5xl font-black leading-tight text-[var(--ink)] sm:text-6xl">
          {heroCopy.title}
        </h1>
        <p className="max-w-2xl text-xl font-medium text-[var(--ink)]">
          {heroCopy.subtitle}
        </p>
        <Link
          href="/teams"
          className="btn btn-primary mt-2 text-base tracking-wide"
        >
          Find Your Team →
        </Link>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[var(--ink)]/50">
          Current Session
        </p>
        <div className="mt-3">
          <SessionSummaryCard
            session={currentSession}
            actionHref={`/sessions/${currentSession.id}`}
            actionLabel="See today's steps →"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[var(--ink)]/50">
          Quick Links
        </p>
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as never}
              className="panel block p-5 transition-shadow hover:shadow-none"
            >
              <h3 className="text-sm font-black text-[var(--ink)]">
                {link.label}
              </h3>
              <p className="mt-1 text-xs font-semibold text-[var(--ink)]/60">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
