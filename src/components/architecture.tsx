interface LayerProps {
  label: string;
  modules: string[];
  tier: "hardware" | "processing" | "intelligence" | "interface";
}

const tierColors = {
  hardware: "border-l-slate-500 bg-slate-500/5",
  processing: "border-l-primary/60 bg-primary/5",
  intelligence: "border-l-primary bg-primary/8",
  interface: "border-l-emerald-500 bg-emerald-500/5",
};

const tierLabels = {
  hardware: "text-slate-400",
  processing: "text-primary/70",
  intelligence: "text-primary",
  interface: "text-emerald-400",
};

const layers: LayerProps[] = [
  {
    label: "RF Front End",
    modules: ["Antenna Array", "GPS Disciplined Oscillator"],
    tier: "hardware",
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
    tier: "hardware",
  },
  {
    label: "Signal Processing",
    modules: ["Spectrum Fingerprint", "Feature Extraction", "Signal Classification"],
    tier: "processing",
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
    tier: "processing",
  },
  {
    label: "AI Fusion & Prediction",
    modules: [
      "Activity Recognition",
      "Predictive Analytics",
      "Device Identification",
      "Spectrum Signature Database",
    ],
    tier: "intelligence",
  },
  {
    label: "Environmental Adaptation",
    modules: [
      "Baselining",
      "Anomaly Detection",
      "Environment Signature Database",
      "Adaptive Thresholding",
    ],
    tier: "intelligence",
  },
  {
    label: "User Interface",
    modules: [
      "Intelligence Reports",
      "Alerting System",
      "Interactive Maps",
      "Dashboards",
    ],
    tier: "interface",
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="section-accent bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            System Architecture
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Building Blocks
          </h2>
          <p className="text-base text-muted-foreground">
            A modular, layered architecture designed for extensibility and
            mission adaptability.
          </p>
        </div>

        <div className="bracket-corners mx-auto max-w-4xl border border-border/40 bg-background/50 p-1">
          {/* Column headers */}
          <div className="mb-1 flex items-center gap-1 px-4 py-2">
            <span className="w-48 shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
              Layer
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
              Modules
            </span>
          </div>

          {/* Layers */}
          <div className="space-y-1">
            {layers.map((layer) => (
              <div
                key={layer.label}
                className={`flex flex-col gap-3 border-l-2 px-4 py-3 sm:flex-row sm:items-center ${tierColors[layer.tier]}`}
              >
                <span
                  className={`shrink-0 font-mono text-xs font-medium sm:w-48 ${tierLabels[layer.tier]}`}
                >
                  {layer.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {layer.modules.map((mod) => (
                    <span
                      key={mod}
                      className="border border-border/40 bg-background/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap gap-4 border-t border-border/20 px-4 py-2.5">
            {[
              { label: "Hardware", color: "bg-slate-500" },
              { label: "Processing", color: "bg-primary/60" },
              { label: "Intelligence", color: "bg-primary" },
              { label: "Interface", color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`block h-2 w-2 ${item.color}`} />
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/50">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
