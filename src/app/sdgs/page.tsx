import React from "react";

const sdgs = [
  {
    id: 1,
    title: "No Poverty",
    color: "#E5243B",
    description: "End poverty in all its forms everywhere.",
    link: "https://sdgs.un.org/goals/goal1"
  },
  {
    id: 2,
    title: "Zero Hunger",
    color: "#DDA63A",
    description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
    link: "https://sdgs.un.org/goals/goal2"
  },
  {
    id: 3,
    title: "Good Health and Well-being",
    color: "#4C9F38",
    description: "Ensure healthy lives and promote well-being for all at all ages.",
    link: "https://sdgs.un.org/goals/goal3"
  },
  {
    id: 4,
    title: "Quality Education",
    color: "#C5192D",
    description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    link: "https://sdgs.un.org/goals/goal4"
  },
  {
    id: 5,
    title: "Gender Equality",
    color: "#FF3A21",
    description: "Achieve gender equality and empower all women and girls.",
    link: "https://sdgs.un.org/goals/goal5"
  },
  {
    id: 6,
    title: "Clean Water and Sanitation",
    color: "#26BDE2",
    description: "Ensure availability and sustainable management of water and sanitation for all.",
    link: "https://sdgs.un.org/goals/goal6"
  },
  {
    id: 7,
    title: "Affordable and Clean Energy",
    color: "#FCC30B",
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    link: "https://sdgs.un.org/goals/goal7"
  },
  {
    id: 8,
    title: "Decent Work and Economic Growth",
    color: "#A21942",
    description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
    link: "https://sdgs.un.org/goals/goal8"
  },
  {
    id: 9,
    title: "Industry, Innovation and Infrastructure",
    color: "#FD6925",
    description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
    link: "https://sdgs.un.org/goals/goal9"
  },
  {
    id: 10,
    title: "Reduced Inequalities",
    color: "#DD1367",
    description: "Reduce inequality within and among countries.",
    link: "https://sdgs.un.org/goals/goal10"
  },
  {
    id: 11,
    title: "Sustainable Cities and Communities",
    color: "#FD9D24",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    link: "https://sdgs.un.org/goals/goal11"
  },
  {
    id: 12,
    title: "Responsible Consumption and Production",
    color: "#BF8B2E",
    description: "Ensure sustainable consumption and production patterns.",
    link: "https://sdgs.un.org/goals/goal12"
  },
  {
    id: 13,
    title: "Climate Action",
    color: "#3F7E44",
    description: "Take urgent action to combat climate change and its impacts.",
    link: "https://sdgs.un.org/goals/goal13"
  },
  {
    id: 14,
    title: "Life Below Water",
    color: "#0A97D9",
    description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
    link: "https://sdgs.un.org/goals/goal14"
  },
  {
    id: 15,
    title: "Life on Land",
    color: "#56C02B",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
    link: "https://sdgs.un.org/goals/goal15"
  },
  {
    id: 16,
    title: "Peace, Justice and Strong Institutions",
    color: "#00689D",
    description: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.",
    link: "https://sdgs.un.org/goals/goal16"
  },
  {
    id: 17,
    title: "Partnerships for the Goals",
    color: "#19486A",
    description: "Strengthen the means of implementation and revitalize the global partnership for sustainable development.",
    link: "https://sdgs.un.org/goals/goal17"
  }
];

export default function SDGsPage() {
  return (
    <div className="relative isolate bg-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="tag">Project Discovery</span>
        <h1 className="font-display text-4xl font-black leading-tight text-[var(--ink)] sm:text-5xl">
          UN Sustainable Development Goals
        </h1>
        <p className="max-w-3xl text-lg text-[var(--ink)]">
          The 17 Sustainable Development Goals (SDGs) are the world&apos;s shared plan to end extreme poverty, reduce inequality, and protect the planet by 2030.
        </p>
        <div className="mt-4 rounded-xl bg-blue-50 p-6 text-left text-sm text-blue-900 border border-blue-100 max-w-2xl">
          <h3 className="font-bold mb-2 text-lg">🧠 Think Like an Engineer</h3>
          <p className="mb-2">
            As you explore these goals, consider: <strong>Is there a sustainable business idea or an engineering solution hidden here?</strong>
          </p>
          <p>
            Could a robot help clean the oceans (SDG 14)? Could a new app help reduce food waste (SDG 12)? 
            While your Scratch project can be anything—a game, a story, or art—try to connect it to a real-world problem worth solving.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sdgs.map((sdg) => (
            <a
              key={sdg.id}
              href={sdg.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div
                className="flex h-32 items-center justify-center px-6 text-center"
                style={{ backgroundColor: sdg.color }}
              >
                <h3 className="font-display text-2xl font-black text-white">
                  {sdg.id}. {sdg.title}
                </h3>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <p className="text-sm font-medium text-gray-600">
                  {sdg.description}
                </p>
                <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[var(--scratch-blue)]">
                  View Targets on UN.org →
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
