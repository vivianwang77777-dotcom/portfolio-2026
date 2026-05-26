import type { Metadata } from "next";
import Script from "next/script";
import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="preload" href="/lib/unicornStudio.umd.js" as="script" />
        <link
          rel="preconnect"
          href="https://assets.unicorn.studio"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://assets.unicorn.studio" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Script
          id="unicorn-studio-sdk"
          src="/lib/unicornStudio.umd.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
