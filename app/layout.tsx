import type { Metadata, Viewport } from "next";
import { Archivo, Libre_Caslon_Text } from "next/font/google";
import "./globals.css";

// Archivo's width axis condenses the headline and the graph's labels; Caslon is the face of legal print.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const caslon = Libre_Caslon_Text({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-caslon" });

const DESCRIPTION =
  "Emerging Cities Lawyers LLP is an Indian law firm for start-ups, growing companies, funds and foreign businesses, in the cities beyond the metros. Corporate, disputes, tax, trade marks and India entry.";

export const metadata: Metadata = {
  metadataBase: new URL("https://emergingcitieslawyers.com"),
  title: "Emerging Cities Lawyers LLP | Law for emerging India",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: "Emerging Cities Lawyers LLP", description: "Law for emerging India.", type: "website", url: "/", images: ["/assets/og.png"] },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/assets/favicon.svg", type: "image/svg+xml" }], apple: "/assets/apple-touch-icon.png" },
};

export const viewport: Viewport = { themeColor: "#551C27" };

// Marks the page as scripted before it paints, so what GSAP reveals starts hidden.
// If the animation code never runs, the timer shows everything after 3.5 s.
const BOOT = `document.documentElement.classList.add('js');window.__eclFallback=setTimeout(function(){document.documentElement.classList.add('no-motion')},3500);`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${caslon.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
