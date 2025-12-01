import Link from "next/link";
import type { Session } from "@/types/content";

type SessionSummaryCardProps = {
  session: Session;
  actionHref: string;
  actionLabel?: string;
};

export const SessionSummaryCard = ({
  session,
  actionHref,
  actionLabel = "View session →",
}: SessionSummaryCardProps) => (
  <div className="panel p-5 text-left">
    <p className="text-xs font-black uppercase tracking-widest">
      Meeting {session.meetingNumber}
    </p>
    <h4 className="mt-2 text-xl font-black">{session.title}</h4>
    <p className="mt-2 text-sm font-semibold">{session.studentObjective}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {session.scratchFocus.map((focus) => (
        <span
          key={focus}
          className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-widest"
        >
          {focus}
        </span>
      ))}
    </div>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <Link href={actionHref as any} className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]">
      {actionLabel}
    </Link>
  </div>
);


