type ScratchEmbedProps = {
  projectId: number;
  title: string;
  authorSummary: string;
  externalUrl?: string;
};

export function ScratchEmbed({
  projectId,
  title,
  authorSummary,
  externalUrl,
}: ScratchEmbedProps) {
  const normalizedProjectId = Math.trunc(projectId);
  const fallbackUrl = `https://scratch.mit.edu/projects/${normalizedProjectId}/`;
  const embedUrl = `https://scratch.mit.edu/projects/${normalizedProjectId}/embed`;
  const projectUrl = externalUrl ?? fallbackUrl;

  return (
    <article className="panel p-5">
      <h3 className="text-lg font-black text-[var(--ink)]">{title}</h3>
      <div className="relative mt-4 overflow-hidden rounded-lg border-2 border-[var(--ink)] bg-white pt-[56.25%]">
        <iframe
          src={embedUrl}
          title={title}
          allowFullScreen
          scrolling="no"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <p className="mt-4 text-sm font-semibold text-[var(--ink)]">
        {authorSummary}
      </p>
      <a
        href={projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-black text-[var(--scratch-blue)]"
      >
        Open on Scratch →
      </a>
    </article>
  );
}
