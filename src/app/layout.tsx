import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://scout.nervous-energy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Signal Scout | Passive Signal Intelligence Platform",
    template: "%s | Signal Scout",
  },
  description:
    "Transform electronic spectral patterns into actionable intelligence through advanced monitoring, collection, and analysis technology. Multi-protocol passive monitoring covering WiFi, Bluetooth, cellular, and IoT.",
  keywords: [
    "signal intelligence",
    "SIGINT",
    "passive monitoring",
    "spectrum analysis",
    "RF monitoring",
    "anomaly detection",
    "device attribution",
    "law enforcement technology",
    "electronic surveillance",
    "multi-protocol monitoring",
    "WiFi monitoring",
    "Bluetooth detection",
    "TPMS tracking",
    "IMSI detection",
  ],
  authors: [{ name: "Nervous Energy, LLC" }],
  creator: "Nervous Energy, LLC",
  publisher: "Nervous Energy, LLC",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Signal Scout | Passive Signal Intelligence Platform",
    description:
      "Transform electronic spectral patterns into actionable intelligence through advanced multi-protocol monitoring and ML-powered analysis.",
    url: siteUrl,
    siteName: "Signal Scout",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Signal Scout | Passive Signal Intelligence Platform",
    description:
      "Passive multi-protocol signal intelligence for law enforcement and government agencies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nervous Energy, LLC",
  url: siteUrl,
  description:
    "Signal Scout — passive multi-protocol signal intelligence platform for law enforcement and government agencies.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@nervousenergy.com",
    contactType: "sales",
  },
  sameAs: [],
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
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme');
                  if (mode === 'light') {
                    // explicit light — don't add dark
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scanlines`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
