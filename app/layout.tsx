import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Royal serif headings for Rajputana theme (wired via globals.css under `html[data-theme="rajputana"]`). */
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanidhya Singh | Web Developer & Figma Designer",
  description:
    "Portfolio of Sanidhya Singh - Web Developer & Figma Designer, Bengaluru. React, TypeScript, Next.js, Node.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme allowlist must match VALID_THEME_IDS in lib/theme.ts (SSR before paint). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("portfolio-theme");if(t)t=t.trim();var v=["purple-gold","ironMan","spiderMan","rajputana"];var theme=v.indexOf(t)!==-1?t:"purple-gold";document.documentElement.setAttribute("data-theme",theme);})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
