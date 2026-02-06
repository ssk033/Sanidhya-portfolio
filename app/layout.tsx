import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("portfolio-theme");if(t)t=t.trim();var v=["purple-gold","ironMan","captainAmerica","spiderMan","thor"];var theme=v.indexOf(t)!==-1?t:"purple-gold";document.documentElement.setAttribute("data-theme",theme);})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
