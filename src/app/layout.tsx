import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "DG-STEAM Scratch Hub",
  description:
    "Project-based learning hub for DG 6th grade Scratch teams exploring SDGs.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t-4 border-[var(--ink)] bg-transparent py-6">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div>
                <p className="font-display text-sm font-black uppercase tracking-wide text-[var(--ink)]">
                  STEAM Sustainable Engineering Hub
                </p>
                <p className="text-xs font-semibold text-[var(--ink)] opacity-70">
                  Levelling up with Scratch
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={(process.env.BASE_PATH ?? "/dg-steam-scratch") + "/images/IRV-logo-small.png"}
                alt="Made with IRV"
                className="h-7 w-auto"
              />
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

