import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Great_Vibes,
  Outfit,
  Noto_Sans_Devanagari,
} from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const cursive = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cursive",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const deva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-deva",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aashish & Amisha — 21st November 2026",
  description:
    "You are cordially invited to the wedding of Aashish Jain and Amisha Jain at Bandhan Resort, Bundi — Saturday, 21st November 2026.",
  authors: [{ name: "Aashish & Amisha" }],
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Aashish & Amisha — A Wedding Invitation",
    description: "Saturday, 21st November 2026 · Bandhan Resort, Bundi.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}`,
          }}
        />
        <meta name="theme-color" content="#C41E3A" />
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`${display.variable} ${cursive.variable} ${body.variable} ${deva.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
