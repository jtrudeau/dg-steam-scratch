import Link from "next/link";
import { getResourceById, getResources } from "@/lib/content";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";

export async function generateStaticParams() {
  return getResources().map((resource) => ({ resourceId: resource.id }));
}

type ResourcePageProps = {
  params: Promise<{ resourceId: string }>;
};

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { resourceId } = await params;
  const resource = getResourceById(resourceId);

  if (!resource) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <span className="tag">Resources</span>
        <h1 className="mt-4 text-3xl font-black text-[var(--ink)]">
          Resource not found
        </h1>
        <Link
          href="/resources"
          className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
        >
          Back to resources
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/resources"
        className="text-sm font-black uppercase tracking-[0.2em] text-[var(--scratch-blue)]"
      >
        ← Back to resources
      </Link>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.25em]">
        {resource.type} · {resource.length}
      </p>
      <h1 className="mt-2 font-display text-4xl font-black text-[var(--ink)]">
        {resource.title}
      </h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {resource.scratchTags.map((tag) => (
          <span
            key={tag}
            className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-base font-semibold text-[var(--ink)]">
        {resource.summary}
      </p>

      <div className="panel mt-6 p-6">
        <h2 className="text-xs font-black uppercase tracking-[0.25em]">
          Steps
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
          {resource.steps.map((step) => (
            <li key={step.title}>
              <span className="font-black">{step.title}:</span>{" "}
              {step.description}
            </li>
          ))}
        </ol>
      </div>

      {resource.relatedSessions?.length ? (
        <div className="panel mt-6 p-6">
          <h2 className="text-xs font-black uppercase tracking-[0.25em]">
            Related sessions
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {resource.relatedSessions.map((sessionId) => (
              <Link
                key={sessionId}
                href={`/sessions/${sessionId}`}
                className="btn btn-secondary"
              >
                {sessionId}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {resource.body ? (
        <div className="panel mt-6 p-6">
          <p className="text-xs font-black uppercase tracking-[0.25em]">
            Guide
          </p>
          <MdxRenderer source={resource.body} />
        </div>
      ) : null}
    </section>
  );
}
