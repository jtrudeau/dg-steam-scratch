"use client";

import { useMemo, useState } from "react";
import type { Resource } from "@/types/content";
import { ResourceCard } from "./ResourceCard";

type ResourcesPageClientProps = {
  resources: Resource[];
};

export function ResourcesPageClient({ resources }: ResourcesPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedLength, setSelectedLength] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    resources.forEach((r) => r.scratchTags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [resources]);

  const allLengths = useMemo(() => {
    const lengthSet = new Set(resources.map((r) => r.length));
    return Array.from(lengthSet).sort();
  }, [resources]);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesTag = !selectedTag || resource.scratchTags.includes(selectedTag);
      const matchesLength = !selectedLength || resource.length === selectedLength;
      return matchesTag && matchesLength;
    });
  }, [resources, selectedTag, selectedLength]);

  const clearFilters = () => {
    setSelectedTag(null);
    setSelectedLength(null);
  };

  const hasActiveFilters = selectedTag || selectedLength;

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

      <div className="panel mb-8 p-6">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="mb-3 text-xs font-black uppercase tracking-[0.25em]">
              Filter by concept
            </h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`border-2 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] transition ${
                    selectedTag === tag
                      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                      : "border-[var(--ink)] bg-white text-[var(--ink)] hover:bg-[var(--butter-light)]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-xs font-black uppercase tracking-[0.25em]">
              Filter by length
            </h2>
            <div className="flex flex-wrap gap-2">
              {allLengths.map((length) => (
                <button
                  key={length}
                  type="button"
                  onClick={() =>
                    setSelectedLength(selectedLength === length ? null : length)
                  }
                  className={`border-2 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] transition ${
                    selectedLength === length
                      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                      : "border-[var(--ink)] bg-white text-[var(--ink)] hover:bg-[var(--butter-light)]"
                  }`}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters ? (
            <div className="flex items-center justify-between border-t-2 border-[var(--ink)] pt-4">
              <p className="text-sm font-black">
                Showing {filteredResources.length} of {resources.length} resources
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-black text-[var(--scratch-blue)] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {filteredResources.length === 0 ? (
        <div className="panel p-12 text-center">
          <p className="text-lg font-black text-[var(--ink)]">
            No resources match these filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="btn btn-primary mt-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </section>
  );
}
