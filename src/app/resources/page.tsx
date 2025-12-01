import { getResources } from "@/lib/content";
import { ResourceCard } from "@/components/resources/ResourceCard";

export const metadata = {
  title: "Resources · DG-STEAM Scratch Hub",
};

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4">
        <span className="tag">Micro-tutorials</span>
        <h1 className="font-display text-4xl font-black text-[var(--ink)]">
          Quick Learning Bursts
        </h1>
        <p className="max-w-3xl text-lg font-semibold text-[var(--ink)]">
          Reusable Scratch mini-lessons for warmups, extensions, and playtest
          feedback loops. Link them straight from your session plans.
        </p>
      </div>

      <div className="space-y-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}

