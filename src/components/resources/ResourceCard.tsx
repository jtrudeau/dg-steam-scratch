import type { Resource } from "@/types/content";

type ResourceCardProps = {
  resource: Resource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => (
  <article key={resource.id} className="panel p-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.25em]">
          {resource.type} · {resource.length}
        </p>
        <h2 className="text-2xl font-black text-[var(--ink)]">
          {resource.title}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {resource.scratchTags.map((tag) => (
          <span
            key={tag}
            className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
    <p className="mt-4 text-sm font-semibold text-[var(--ink)]">
      {resource.summary}
    </p>
    <ul className="mt-4 list-decimal space-y-2 pl-5 text-sm">
      {resource.steps.map((step) => (
        <li key={step.title}>
          <span className="font-black">{step.title}:</span>{" "}
          {step.description}
        </li>
      ))}
    </ul>
  </article>
);


