import { Scan, Brain, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Scan className="h-6 w-6 text-primary" />,
    title: "Comprehensive Spectrum Monitoring",
    description:
      "Build a comprehensive signal analysis platform that monitors across the entire consumer wireless spectrum — from Bluetooth and WiFi to cellular and emerging IoT protocols. Unlike single-protocol solutions, our technology creates a complete picture of electronic activity in any environment.",
  },
  {
    number: "02",
    icon: <Brain className="h-6 w-6 text-primary" />,
    title: "Environmental Adaptation",
    description:
      "Enhance raw signal detection with environmental adaptation capabilities. Our system learns the normal patterns of each unique deployment location, automatically adjusting its sensitivity and analysis parameters to maximize detection accuracy while minimizing false positives.",
  },
  {
    number: "03",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: "ML-Powered Insights",
    description:
      "Leverage advanced machine learning to transform signal data into meaningful insights. By recognizing complex temporal patterns and correlations across multiple protocols, our platform doesn't just detect devices — it understands behaviors, identifies anomalies, and predicts future activity patterns.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Signal Processing Chain
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="text-base text-muted-foreground">
            Three layers of intelligence working together to deliver unmatched
            situational awareness.
          </p>
        </div>

        <div className="grid gap-0 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={step.number} className="relative flex">
              <div className="bracket-corners flex-1 border border-border/40 bg-card/50 p-6 lg:p-8">
                {/* Step number */}
                <span className="mb-4 block font-mono text-[40px] font-bold leading-none text-primary/10">
                  {step.number}
                </span>
                <div className="mb-3">{step.icon}</div>
                <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {/* Connector arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden items-center lg:flex">
                  <ArrowRight className="h-4 w-4 -mx-2 text-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
