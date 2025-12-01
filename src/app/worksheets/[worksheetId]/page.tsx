import { WorksheetViewer } from "@/components/worksheets/WorksheetViewer";
import { getWorksheets } from "@/lib/content";
import Link from "next/link";

export async function generateStaticParams() {
  return getWorksheets().map((sheet) => ({ worksheetId: sheet.id }));
}

type WorksheetPageProps = {
  params: Promise<{ worksheetId: string }>;
};

export default async function WorksheetPage({ params }: WorksheetPageProps) {
  const { worksheetId } = await params;
  const worksheet = getWorksheets().find((sheet) => sheet.id === worksheetId);

  if (!worksheet) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <span className="tag">Worksheets</span>
        <h1 className="mt-4 text-3xl font-black text-[var(--ink)]">
          Worksheet not found
        </h1>
        <Link
          href="/worksheets"
          className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
        >
          Back to worksheets
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/worksheets"
        className="text-sm font-black uppercase tracking-[0.2em] text-[var(--scratch-blue)]"
      >
        ← Back to worksheets
      </Link>
      <WorksheetViewer
        title={worksheet.title}
        audience={worksheet.audience}
        blocks={worksheet.blocks}
      />
    </section>
  );
}

