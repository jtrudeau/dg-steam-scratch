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
          <footer className="border-t-2 border-[var(--ink)] bg-transparent py-8 text-center text-sm font-semibold">
            © {new Date().getFullYear()} DG-STEAM Scratch Hub · Built for the
            DG STEAM Collective.
          </footer>
        </div>
      </body>
    </html>
  );
}

