import { FileCheck, Presentation, Settings, Handshake } from "lucide-react";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <Presentation className="h-5 w-5 text-primary" />,
    title: "Capability Briefing",
    description:
      "Schedule a classified or unclassified briefing tailored to your agency's mission. We demonstrate Signal Scout's detection capabilities against real-world scenarios relevant to your operational environment.",
  },
  {
    icon: <Settings className="h-5 w-5 text-primary" />,
    title: "Pilot Program",
    description:
      "Deploy a purpose-configured unit at your facility or within your operational area. Our team provides on-site support during a 30-to-90-day evaluation period to validate performance against your requirements.",
  },
  {
    icon: <FileCheck className="h-5 w-5 text-primary" />,
    title: "Procurement & Integration",
    description:
      "Signal Scout is available through GSA Schedule, direct procurement, and cooperative purchasing agreements. We support FedRAMP-aligned cloud deployments and air-gapped on-premises configurations.",
  },
  {
    icon: <Handshake className="h-5 w-5 text-primary" />,
    title: "Ongoing Partnership",
    description:
      "Receive continuous platform updates, new protocol modules, and dedicated technical support. Our team works with your analysts to refine detection models for your specific threat landscape.",
  },
];

export function Milestones() {
  return (
    <section id="engagement" className="section-accent bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Engagement Process
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            How to Get Started
          </h2>
          <p className="text-base text-muted-foreground">
            From first briefing to full deployment — a clear path to enhanced
            signal intelligence capability.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-primary/20 sm:left-1/2" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={step.title} className="relative flex items-start">
                  {/* Node */}
                  <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center border border-primary/40 bg-background sm:left-1/2">
                    <span className="font-mono text-[10px] font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-10 w-full sm:ml-0 sm:w-1/2 ${
                      isLeft
                        ? "sm:pr-12 sm:text-right"
                        : "sm:ml-auto sm:pl-12"
                    }`}
                  >
                    <div
                      className={`mb-2 flex items-center gap-2.5 ${
                        isLeft ? "sm:justify-end" : ""
                      }`}
                    >
                      {step.icon}
                      <h3 className="text-base font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
