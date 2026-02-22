import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

/* ── Spectrum analyzer bar data ──────────────────────────
   60 bars with deterministic variation simulating a live
   RF spectrum display. Distribution peaks left-of-center
   with secondary harmonics — like a real band scan.       */
const TOTAL_BARS = 60;
const BAR_W = 9;
const GAP = 3.8;
const SVG_W = TOTAL_BARS * (BAR_W + GAP);
const SVG_H = 220;

function barData(i: number) {
  const t = i / TOTAL_BARS;
  // primary bell curve at 35%
  const g1 = Math.exp(-0.5 * ((t - 0.35) / 0.28) ** 2);
  // secondary peak at 72%
  const g2 = 0.55 * Math.exp(-0.5 * ((t - 0.72) / 0.09) ** 2);
  // tertiary bump at 15%
  const g3 = 0.35 * Math.exp(-0.5 * ((t - 0.15) / 0.07) ** 2);
  const envelope = Math.max(g1, g2, g3);

  // per-bar hash for variation
  const h = ((i * 137 + 43) % 100) / 100;
  const variation = 0.45 + h * 0.55;

  const maxH = Math.max(envelope * variation * 0.92, 0.06);
  const minH = maxH * (0.12 + h * 0.28);
  const dur = (1.6 + h * 2.8).toFixed(2);
  const delay = ((i * 0.065) % 1.8).toFixed(2);

  return { maxH, minH, dur, delay, x: i * (BAR_W + GAP) };
}

const bars = Array.from({ length: TOTAL_BARS }, (_, i) => barData(i));

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-16"
    >
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04)_0%,transparent_60%)]" />

      {/* Subtle grid — oscilloscope style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      {/* Radar sweep — very subtle background motion */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <div
          className="h-[700px] w-[700px] rounded-full opacity-[0.025]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, hsl(187 78% 46%) 25deg, transparent 50deg)",
            animation: "radar-sweep 10s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 border border-border/60 bg-card/50 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground backdrop-blur-sm">
            <Shield className="h-3 w-3 text-primary" />
            Nervous Energy, LLC
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">
            <span className="glow-cyan text-primary">Signal</span>{" "}
            <span className="text-foreground">Scout</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Transform electronic spectral patterns into actionable intelligence
            through advanced monitoring, collection, and analysis technology.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2 font-mono text-xs uppercase tracking-wider">
              <a href="#solution">
                Explore the Platform
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-mono text-xs uppercase tracking-wider">
              <a href="#contact">Request a Demo</a>
            </Button>
          </div>

          {/* ── Spectrum Analyzer Display ────────────────── */}
          <div className="bracket-corners mx-auto mt-20 max-w-4xl border border-border/40 bg-card/60 backdrop-blur-sm">
            {/* Display header bar */}
            <div className="flex items-center justify-between border-b border-border/30 px-4 py-2">
              <div className="flex items-center gap-3">
                <div
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  style={{ animation: "signal-pulse 2s ease-in-out infinite" }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Spectrum Analysis
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  100 MHz — 6 GHz
                </span>
                <span className="font-mono text-[10px] text-primary/70">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Spectrum visualization */}
            <div className="relative overflow-hidden px-4 py-6">
              {/* dBm scale — left side */}
              <div className="absolute left-2 top-6 bottom-6 flex flex-col justify-between">
                {["-20", "-40", "-60", "-80", "-100"].map((v) => (
                  <span
                    key={v}
                    className="font-mono text-[8px] text-muted-foreground/30"
                  >
                    {v}
                  </span>
                ))}
              </div>

              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className="mx-auto w-full max-w-3xl"
                preserveAspectRatio="xMidYMax meet"
              >
                <defs>
                  <linearGradient
                    id="barGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(187 78% 56%)"
                      stopOpacity="1"
                    />
                    <stop
                      offset="60%"
                      stopColor="hsl(200 70% 35%)"
                      stopOpacity="0.7"
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(220 50% 18%)"
                      stopOpacity="0.3"
                    />
                  </linearGradient>
                  <filter id="barGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Horizontal grid lines */}
                {[0.2, 0.4, 0.6, 0.8].map((pct) => (
                  <line
                    key={pct}
                    x1="0"
                    y1={SVG_H * pct}
                    x2={SVG_W}
                    y2={SVG_H * pct}
                    stroke="hsl(215 20% 20%)"
                    strokeWidth="0.5"
                    strokeDasharray="4 8"
                  />
                ))}

                {/* Spectrum bars */}
                {bars.map((bar, i) => (
                  <g key={i} transform={`translate(${bar.x}, ${SVG_H})`}>
                    <rect
                      x="0"
                      y={-SVG_H}
                      width={BAR_W}
                      height={SVG_H}
                      rx="1"
                      fill="url(#barGrad)"
                      filter="url(#barGlow)"
                      className="spectrum-bar"
                      style={
                        {
                          "--min": bar.minH.toFixed(3),
                          "--max": bar.maxH.toFixed(3),
                          "--dur": `${bar.dur}s`,
                          "--delay": `${bar.delay}s`,
                        } as React.CSSProperties
                      }
                    />
                  </g>
                ))}
              </svg>

              {/* Frequency labels */}
              <div className="mx-auto flex max-w-3xl justify-between px-2 pt-2">
                {["100M", "900M", "2.4G", "3.5G", "5.0G", "6.0G"].map(
                  (freq) => (
                    <span
                      key={freq}
                      className="font-mono text-[8px] text-muted-foreground/30"
                    >
                      {freq}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between border-t border-border/30 px-4 py-2">
              <span className="font-mono text-[10px] text-muted-foreground/50">
                PROTOCOLS: WiFi / BT / LTE / IoT
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/50">
                RBW: 10 kHz &middot; VBW: 30 kHz
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
