import Link from "next/link";
import { MainNav } from "@/components/navigation/MainNav";
import { siteNav } from "@/lib/siteConfig"; // Import siteNav

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-[var(--ink)] bg-[var(--paper)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-black uppercase text-[var(--ink)]">
          DG Scratch Hub
        </Link>
        <MainNav items={siteNav} /> {/* Pass siteNav as items prop */}
        <Link
          href="/teacher"
          className="hidden border-2 border-[var(--ink)] bg-[var(--scratch-orange)] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#1d1200] sm:inline-flex"
        >
          Teacher Hub
        </Link>
      </div>
    </header>
  );
};

