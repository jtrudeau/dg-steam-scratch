import Link from "next/link";
import {
  getScratchModuleById,
  getScratchModules,
} from "@/lib/content";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";

export async function generateStaticParams() {
  return getScratchModules().map((module) => ({ moduleId: module.id }));
}

type ScratchModulePageProps = {
  params: Promise<{ moduleId: string }>;
};

export default async function ScratchModulePage({
  params,
}: ScratchModulePageProps) {
  const { moduleId } = await params;
  const scratchModule = getScratchModuleById(moduleId);

  if (!scratchModule) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <span className="tag">Scratch Guide</span>
        <h1 className="mt-4 text-3xl font-black text-[var(--ink)]">
          Module not found
        </h1>
        <Link
          href="/game-ideas"
          className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
        >
          Back to Game Ideas
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/game-ideas"
        className="text-sm font-black uppercase tracking-[0.2em] text-[var(--scratch-blue)]"
      >
        ← Back to Game Ideas
      </Link>
      <p className="mt-4 text-xs font-black uppercase tracking-[0.25em]">
        {scratchModule.type} · {scratchModule.length}
      </p>
      <h1 className="mt-2 font-display text-4xl font-black text-[var(--ink)]">
        {scratchModule.title}
      </h1>
      {scratchModule.scratchTags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {scratchModule.scratchTags.map((tag) => (
            <span
              key={tag}
              className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <p className="mt-4 text-base font-semibold text-[var(--ink)]">
        {scratchModule.summary}
      </p>

      {scratchModule.steps?.length ? (
        <div className="panel mt-6 p-6">
          <h2 className="text-xs font-black uppercase tracking-[0.25em]">
            Milestones
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
            {scratchModule.steps.map((step) => (
              <li key={step.title}>
                <span className="font-black">{step.title}:</span> {step.description}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {scratchModule.body ? (
        <div className="panel mt-6 p-6">
          <p className="text-xs font-black uppercase tracking-[0.25em]">
            Guide
          </p>
          <MdxRenderer source={scratchModule.body} />
        </div>
      ) : null}
    </section>
  );
}
