import { Building2, Truck, Zap } from "lucide-react";

const deploymentModels = [
  {
    icon: <Building2 className="h-5 w-5 text-primary" />,
    title: "Fixed-Site Monitoring",
    status: "PERSISTENT",
    description:
      "Persistent coverage for government buildings, critical infrastructure, correctional facilities, and high-value installations. Continuous 24/7 signal collection with automated alerting and long-term pattern analysis.",
    features: [
      "24/7 autonomous operation",
      "Historical pattern-of-life analysis",
      "Automated threat alerting",
    ],
  },
  {
    icon: <Truck className="h-5 w-5 text-primary" />,
    title: "Mobile Surveillance",
    status: "MOBILE",
    description:
      "Vehicle-mounted configurations for patrol units, investigative teams, and task forces. Real-time signal intelligence during operations with secure data uplink to command centers.",
    features: [
      "Vehicle-integrated form factor",
      "Live operational feeds",
      "Secure command center uplink",
    ],
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Rapid Deployment",
    status: "TACTICAL",
    description:
      "Portable, field-ready kits for special events, VIP protection details, and tactical operations. Quick setup with immediate situational awareness across all monitored protocols.",
    features: [
      "Sub-15-minute setup",
      "Battery-operated capability",
      "Compact, covert form factor",
    ],
  },
];

export function Readiness() {
  return (
    <section id="deployment" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Operational Readiness
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Deployment Models
          </h2>
          <p className="text-base text-muted-foreground">
            Flexible configurations designed to meet the operational demands of
            law enforcement and government agencies.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {deploymentModels.map((model) => (
            <div
              key={model.title}
              className="bracket-corners flex h-full flex-col border border-border/40 bg-card/50"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/30 px-5 py-3">
                <div className="flex items-center gap-2.5">
                  {model.icon}
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {model.status}
                  </span>
                </div>
                <div
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  style={{ animation: "signal-pulse 3s ease-in-out infinite" }}
                />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-3 text-lg font-semibold">{model.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {model.description}
                </p>
                <ul className="mt-auto space-y-2">
                  {model.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <span className="block h-px w-3 shrink-0 bg-primary/40" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
