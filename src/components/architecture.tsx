import { Badge } from "@/components/ui/badge";

interface LayerProps {
  label: string;
  modules: string[];
  color: string;
}

function ArchLayer({ label, modules, color }: LayerProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div
        className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold text-white sm:w-48 sm:text-right ${color}`}
      >
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {modules.map((mod) => (
          <Badge key={mod} variant="secondary" className="text-xs">
            {mod}
          </Badge>
        ))}
      </div>
    </div>
  );
}

const layers: LayerProps[] = [
  {
    label: "RF Front End",
    modules: ["Antenna Array", "GPS Disciplined Oscillator"],
    color: "bg-slate-700",
  },
  {
    label: "Component Modules",
    modules: [
      "Jammer Detection",
      "Drone Detection",
      "WiFi Detection",
      "Bluetooth Detection",
      "IMSI Catcher",
      "Additional Modules",
    ],
    color: "bg-slate-600",
  },
  {
    label: "Signal Processing",
    modules: ["Spectrum Fingerprint", "Feature Extraction", "Signal Classification"],
    color: "bg-primary/80",
  },
  {
    label: "Pattern Analysis",
    modules: [
      "Patterns of Life",
      "Spatial Analysis",
      "Behavioral Analytics",
      "Temporal Pattern Analysis",
      "Cross-Protocol Correlation",
    ],
    color: "bg-primary/70",
  },
  {
    label: "AI Fusion & Prediction",
    modules: [
      "Activity Recognition",
      "Predictive Analytics",
      "Device Identification",
      "Spectrum Signature Database",
    ],
    color: "bg-primary",
  },
  {
    label: "Environmental Adaptation",
    modules: [
      "Baselining",
      "Anomaly Detection",
      "Environment Signature Database",
      "Adaptive Thresholding",
    ],
    color: "bg-emerald-600",
  },
  {
    label: "User Interface",
    modules: [
      "Intelligence Reports",
      "Alerting System",
      "Interactive Maps",
      "Dashboards",
    ],
    color: "bg-emerald-700",
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Building Blocks
          </h2>
          <p className="text-lg text-muted-foreground">
            A modular, layered architecture designed for extensibility and
            mission adaptability.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
          {layers.map((layer) => (
            <ArchLayer key={layer.label} {...layer} />
          ))}
        </div>

        {/* Add interactive architecture diagram or expandable details here */}
      </div>
    </section>
  );
}
