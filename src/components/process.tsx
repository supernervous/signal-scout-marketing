import { Scan, Brain, BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    number: "01",
    icon: <Scan className="h-8 w-8 text-primary" />,
    title: "Comprehensive Spectrum Monitoring",
    description:
      "Build a comprehensive signal analysis platform that monitors across the entire consumer wireless spectrum — from Bluetooth and WiFi to cellular and emerging IoT protocols. Unlike single-protocol solutions, our technology creates a complete picture of electronic activity in any environment.",
  },
  {
    number: "02",
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "Environmental Adaptation",
    description:
      "Enhance raw signal detection with environmental adaptation capabilities. Our system learns the normal patterns of each unique deployment location, automatically adjusting its sensitivity and analysis parameters to maximize detection accuracy while minimizing false positives.",
  },
  {
    number: "03",
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
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
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three layers of intelligence working together to deliver unmatched
            situational awareness.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.number} className="relative overflow-hidden">
              <div className="absolute right-4 top-4 text-6xl font-bold text-primary/10">
                {step.number}
              </div>
              <CardHeader>
                <div className="mb-2">{step.icon}</div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add interactive demo or video walkthrough here */}
      </div>
    </section>
  );
}
