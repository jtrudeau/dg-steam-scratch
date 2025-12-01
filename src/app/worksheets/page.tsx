import Link from "next/link";
import { getWorksheets } from "@/lib/content";

export const metadata = {
  title: "Worksheets · DG-STEAM Scratch Hub",
};

export default function WorksheetsPage() {
  const worksheets = getWorksheets();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4">
        <span className="tag">Printable templates</span>
        <h1 className="font-display text-4xl font-black text-[var(--ink)]">
          Worksheets & Checklists
        </h1>
        <p className="max-w-3xl text-lg font-semibold text-[var(--ink)]">
          Student-facing planners, sprint logs, and playtest forms. Open any
          worksheet to view, print, or export to PDF.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {worksheets.map((sheet) => (
          <article key={sheet.id} className="panel p-6">
            <p className="text-xs font-black uppercase tracking-[0.25em]">
              {sheet.audience}
            </p>
            <h2 className="mt-2 text-2xl font-black text-[var(--ink)]">
              {sheet.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
              Sessions: {sheet.sessionRefs.join(", ")}
            </p>
            <Link
              href={`/worksheets/${sheet.id}`}
              className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
            >
              Open worksheet →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

