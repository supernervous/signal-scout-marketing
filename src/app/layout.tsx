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
  title: "Signal Scout | Passive Signal Intelligence Platform",
  description:
    "Transform electronic spectral patterns into actionable intelligence through advanced monitoring, collection, and analysis technology. Multi-protocol passive monitoring covering WiFi, Bluetooth, cellular, and IoT.",
  keywords: [
    "signal intelligence",
    "SIGINT",
    "passive monitoring",
    "electronic warfare",
    "spectrum analysis",
    "RF monitoring",
    "anomaly detection",
  ],
  openGraph: {
    title: "Signal Scout | Passive Signal Intelligence Platform",
    description:
      "Transform electronic spectral patterns into actionable intelligence through advanced multi-protocol monitoring and ML-powered analysis.",
    type: "website",
    // Add your URL here when deployed
    // url: "https://signalscout.com",
  },
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
                  if (mode === 'dark' || (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
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
