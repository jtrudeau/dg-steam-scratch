"use client";

import Link from "next/link";
import { ScratchEmbed } from "@/components/scratch/ScratchEmbed";
import { scratchGameIdeas } from "@/lib/scratchGameIdeas";

const inspirationAreas = [
  "Game",
  "Quest",
  "Story Adventure",
  "Simulation",
  "Quiz Challenge",
  "Arcade",
  "Builder",
  "Maze",
  "Runner",
  "Survival",
  "Puzzle",
  "App-Style Tool",
];
const scratchPlaylistUrl =
  "https://www.youtube.com/playlist?list=PLpfxVARjkP-_f-E9IU6IHmy5ECj0HqiLB";

export default function ScratchGameIdeasPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-4">
        <span className="tag">Scratch Idea Studio</span>
        <h1 className="font-display text-4xl font-black text-[var(--ink)] sm:text-5xl">
          Game Ideas for Grade 6 Teams
        </h1>
        <p className="max-w-3xl text-lg font-semibold text-[var(--ink)]">
          This page helps teams get unstuck fast. Pick a direction, build a
          first playable version, test it, and improve it.
        </p>
        <div className="panel p-5">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--ink)]">
            Inspiration Areas
          </h2>
          <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
            You can remix ideas across these styles:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {inspirationAreas.map((area) => (
              <span
                key={area}
                className="border-2 border-[var(--ink)] bg-white px-2 py-1 text-xs font-black uppercase tracking-[0.2em]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        {/*
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={pickRandomIdea}>
            Pick Random Idea
          </button>
          <button type="button" className="btn btn-secondary" onClick={clearFilters}>
            Clear Filters
          </button>
          <Link href="/" className="btn btn-secondary">
            Back to Hub
          </Link>
        </div>
        */}
      </div>

      {/*
      <div className="panel mb-10 p-6">
        <h2 className="text-xl font-black text-[var(--ink)]">Filter Ideas</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-1">
            <span className="text-xs font-black uppercase tracking-[0.2em]">
              Difficulty
            </span>
            <select
              className="w-full border-2 border-[var(--ink)] bg-white px-3 py-2 text-sm font-semibold"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option value={allValue}>All</option>
              {difficultyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-black uppercase tracking-[0.2em]">
              Build Time
            </span>
            <select
              className="w-full border-2 border-[var(--ink)] bg-white px-3 py-2 text-sm font-semibold"
              value={timebox}
              onChange={(event) => setTimebox(event.target.value)}
            >
              <option value={allValue}>All</option>
              {timeboxOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-black uppercase tracking-[0.2em]">
              Mechanic
            </span>
            <select
              className="w-full border-2 border-[var(--ink)] bg-white px-3 py-2 text-sm font-semibold"
              value={mechanic}
              onChange={(event) => setMechanic(event.target.value)}
            >
              <option value={allValue}>All</option>
              {mechanicOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-black uppercase tracking-[0.2em]">
              Team Size
            </span>
            <select
              className="w-full border-2 border-[var(--ink)] bg-white px-3 py-2 text-sm font-semibold"
              value={teamSize}
              onChange={(event) => setTeamSize(event.target.value)}
            >
              <option value={allValue}>All</option>
              {teamSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-4 text-sm font-semibold text-[var(--ink)]">
          Showing {filteredIdeas.length} of {scratchGameIdeas.length} ideas.
        </p>
      </div>
      */}

      <div className="grid gap-6 lg:grid-cols-2">
        {scratchGameIdeas.map((idea) => (
          <article key={idea.id} className="panel p-6">
            <div className="flex flex-wrap gap-2">
              <span className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]">
                {idea.difficulty}
              </span>
              <span className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]">
                {idea.timebox}
              </span>
              <span className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]">
                {idea.mechanic}
              </span>
              <span className="border-2 border-[var(--ink)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]">
                Team {idea.teamSize}
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-black text-[var(--ink)]">{idea.title}</h2>
            <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
              {idea.pitch}
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <p>
                <span className="font-black">Core Loop:</span> {idea.coreLoop}
              </p>
              <p>
                <span className="font-black">First Build Goal:</span> {idea.mvpScope}
              </p>
              <p>
                <span className="font-black">Skills Needed:</span>{" "}
                {idea.skillsNeeded.join(", ")}
              </p>
              <p>
                <span className="font-black">Starter Tutorial:</span>{" "}
                <Link
                  href={idea.starterTutorialHref}
                  className="text-[var(--scratch-blue)] underline"
                >
                  {idea.starterTutorialTitle}
                </Link>
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ink)]">
                Stretch Ideas
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-semibold">
                {idea.stretchIdeas.map((stretch) => (
                  <li key={stretch}>{stretch}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="panel mt-10 p-6">
        <h2 className="text-2xl font-black text-[var(--ink)]">Pitch Your Idea</h2>
        <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
          Before coding, every team writes these three answers in one minute each.
        </p>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm font-semibold text-[var(--ink)]">
          <li>What does the player do every 5-10 seconds in your game?</li>
          <li>What is the first version you can finish quickly?</li>
          <li>What one stretch feature will you add only after that version works?</li>
        </ol>
      </div>

      <div id="scratch-basics-tutorial" className="mt-10 scroll-mt-24 space-y-4">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--ink)]">
          Tutorial Support
        </p>
        <p className="text-sm font-semibold text-[var(--ink)]">
          Use this Scratch Basics tutorial if your team needs a quick reset on
          events, movement, and first interactions before building your idea.
        </p>
        <p className="text-sm font-semibold text-[var(--ink)]">
          Want the step-by-step intro too? Start here:{" "}
          <Link
            href="/scratch/scratch-start-here"
            className="text-[var(--scratch-blue)] underline"
          >
            Scratch Start Here
          </Link>
          .
        </p>
        <ScratchEmbed
          projectId={31407152}
          title="Scratch Basics Tutorial"
          authorSummary="A guided starter project to review core Scratch actions before you build your own game idea."
        />
        <p className="text-sm font-semibold text-[var(--ink)]">
          More inspiration videos:{" "}
          <a
            href={scratchPlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--scratch-blue)] underline"
          >
            Scratch YouTube Playlist
          </a>
          .
        </p>
      </div>
    </section>
  );
}
