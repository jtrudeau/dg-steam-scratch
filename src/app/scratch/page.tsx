import Link from "next/link";
import { getScratchModules, getScratchTrainingCatalog } from "@/lib/content";

const sectionOrder = ["Start Here", "Scratch Basics", "Intermediate Toolkit"];

export default function ScratchGuidePage() {
  const modules = getScratchModules();
  const trainingCatalog = getScratchTrainingCatalog();
  const grouped = new Map<string, typeof modules>();
  const moduleById = new Map(modules.map((module) => [module.id, module]));
  const tutorialById = new Map(
    trainingCatalog.tutorials.map((tutorial) => [tutorial.id, tutorial]),
  );

  modules.forEach((module) => {
    const section = module.section ?? "Scratch Guide";
    const existing = grouped.get(section) ?? [];
    existing.push(module);
    grouped.set(section, existing);
  });

  const orderedSections = [
    ...sectionOrder,
    ...Array.from(grouped.keys()).filter(
      (section) => !sectionOrder.includes(section),
    ),
  ].filter((section) => grouped.has(section));

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-4">
        <span className="tag">Scratch Guide</span>
        <h1 className="font-display text-4xl font-black text-[var(--ink)] sm:text-5xl">
          Scratch Basics to Intermediate Toolkit
        </h1>
        <p className="max-w-3xl text-lg font-semibold text-[var(--ink)]">
          A standalone learning path for students who want to build confidently in
          Scratch. Start with the essentials, then level up with reusable patterns
          and mid-level techniques.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/scratch/game-ideas" className="btn btn-primary">
            Open Game Idea Studio
          </Link>
        </div>
      </div>

      {trainingCatalog.playlists.length ? (
        <div className="mb-12 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-black text-[var(--ink)]">
              Training Arrays
            </h2>
            <p className="text-sm font-semibold text-[var(--ink)]">
              {trainingCatalog.playlists.length} playlists
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {trainingCatalog.playlists.map((playlist) => {
              const validModuleIds = playlist.moduleIds.filter((moduleId) =>
                moduleById.has(moduleId),
              );
              const tutorialIds = Array.from(
                new Set(
                  playlist.tutorialIds.filter((tutorialId) =>
                    tutorialById.has(tutorialId),
                  ),
                ),
              );
              const firstModuleId = validModuleIds[0];

              return (
                <article key={playlist.id} className="panel p-6">
                  <h3 className="text-2xl font-black text-[var(--ink)]">
                    {playlist.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-[var(--ink)]">
                    {playlist.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]">
                      {validModuleIds.length} modules
                    </span>
                    <span className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]">
                      {tutorialIds.length} tutorials
                    </span>
                  </div>
                  {firstModuleId ? (
                    <Link
                      href={`/scratch/${firstModuleId}`}
                      className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
                    >
                      Start this array →
                    </Link>
                  ) : (
                    <p className="mt-4 text-sm font-semibold text-[var(--ink)]">
                      No valid modules are currently mapped to this array.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="space-y-12">
        {orderedSections.map((section) => (
          <div key={section} className="space-y-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-black text-[var(--ink)]">
                {section}
              </h2>
              <p className="text-sm font-semibold text-[var(--ink)]">
                {grouped.get(section)?.length ?? 0} modules
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {grouped.get(section)?.map((module) => (
                <article key={module.id} className="panel p-6">
                  <p className="text-xs font-black uppercase tracking-[0.25em]">
                    {module.type} · {module.length}
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-[var(--ink)]">
                    {module.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-[var(--ink)]">
                    {module.summary}
                  </p>
                  <ul className="mt-4 list-decimal space-y-2 pl-5 text-sm">
                    {module.steps.slice(0, 3).map((step) => (
                      <li key={step.title}>
                        <span className="font-black">{step.title}:</span>{" "}
                        {step.description}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/scratch/${module.id}`}
                    className="mt-4 inline-flex text-sm font-black text-[var(--scratch-blue)]"
                  >
                    Open module →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
