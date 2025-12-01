export const metadata = {
  title: "About · DG-STEAM Scratch Hub",
};

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <span className="tag">Program context</span>
      <h1 className="mt-4 font-display text-4xl font-black text-[var(--ink)]">
        Why this hub exists
      </h1>
      <div className="panel mt-6 p-6">
        <div className="prose text-lg">
          <p>
            DG-STEAM Scratch Hub is the working space for the 2025–26 cohort of
            sixth graders exploring the Sustainable Development Goals through
            Scratch storytelling, simulation, and game design. The site gathers
            every artifact—session outlines, worksheets, micro-tutorials, and
            team dashboards—so the learning arc stays coherent for students,
            teachers, and families.
          </p>
          <p>
            Behind the scenes, the hub is managed from the Global Knowledge
            Base, which keeps all context, research, and long-term planning in
            sync. As the program evolves, this site will grow into a publishable
            record of the work, ready for public outputs, portfolios, and future
            cohorts.
          </p>
        </div>
      </div>
    </section>
  );
}

