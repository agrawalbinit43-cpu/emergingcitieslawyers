import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Gate from "@/components/Gate";
import Motion from "@/components/Motion";
import ProBono from "@/components/ProBono";
import { WRAP } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Pro bono | Emerging Cities Lawyers LLP",
  description: "If you urgently need a lawyer and cannot afford one, tell us about your situation. Where we can, we will find you counsel who will act free of charge.",
  alternates: { canonical: "/pro-bono" },
  openGraph: { title: "Pro bono | Emerging Cities Lawyers LLP", url: "/pro-bono", images: ["/assets/og.png"] },
};

export default function ProBonoPage() {
  return (
    <>
      <Gate />
      <a href="#main" className="fixed left-2 top-2 z-[300] -translate-x-[200%] bg-rose px-3 py-2 font-display font-semibold text-maroon focus:translate-x-0">
        Skip to content
      </a>
      <header id="top" className="on-maroon bg-maroon text-rose">
        <nav aria-label="Primary" className={`${WRAP} flex items-start justify-between py-7`}>
          <a className="mark" href="/" aria-label="Emerging Cities Lawyers, home">
            <span>Emerging</span>
            <span>Cities</span>
            <span>Lawyers</span>
          </a>
          <div className="flex items-center gap-7 font-display text-sm font-semibold">
            <a href="/" className="underline-offset-4 hover:underline">
              Home
            </a>
            <a href="/#contact" className="underline-offset-4 hover:underline">
              Contact
            </a>
            <a href="/pro-bono" aria-current="page" className="text-gold underline underline-offset-4">
              Pro bono
            </a>
          </div>
        </nav>
      </header>
      <main id="main">
        <ProBono />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
