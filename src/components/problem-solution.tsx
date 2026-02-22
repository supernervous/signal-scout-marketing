import {
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Trophy,
} from "lucide-react";

interface QuadrantProps {
  icon: React.ReactNode;
  title: string;
  label: string;
  items: string[];
}

function Quadrant({ icon, title, label, items }: QuadrantProps) {
  return (
    <div className="bracket-corners border border-border/40 bg-card/50 p-6">
      <div className="mb-4 flex items-center gap-3">
        {icon}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            {label}
          </p>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </div>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-2 block h-px w-3 shrink-0 bg-primary/40" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProblemSolution() {
  return (
    <section id="solution" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Intelligence Gap
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The Challenge & Our Answer
          </h2>
          <p className="text-base text-muted-foreground">
            Modern electronic environments demand a new approach to signal
            intelligence.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Quadrant
            icon={<AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />}
            label="01"
            title="Problem Statement"
            items={[
              "Law enforcement and government agencies lack visibility into the electronic activity surrounding their operations and facilities.",
              "Single-protocol tools monitor one signal type at a time, missing critical cross-device patterns that reveal suspect behavior.",
              "Existing solutions require dedicated RF specialists to operate, creating bottlenecks in time-sensitive investigations.",
            ]}
          />

          <Quadrant
            icon={<Lightbulb className="h-5 w-5 shrink-0 text-primary" />}
            label="02"
            title="Solution"
            items={[
              "Multi-protocol passive monitoring platform covering WiFi, Bluetooth, cellular, and IoT.",
              "Environmental adaptation with ML-based pattern recognition and fingerprinting.",
              "Real-time analysis for anomaly detection and predictive intelligence.",
            ]}
          />

          <Quadrant
            icon={<CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />}
            label="03"
            title="Operational Benefits"
            items={[
              "Force-multiplying intelligence that reduces manpower requirements for electronic surveillance operations.",
              "Early detection of unauthorized devices, rogue cell towers, and counter-surveillance equipment.",
              "Fully passive collection — zero electronic emissions that could compromise officer safety or tip off targets.",
              "Court-admissible reporting with chain-of-custody metadata and tamper-evident logging.",
            ]}
          />

          <Quadrant
            icon={<Trophy className="h-5 w-5 shrink-0 text-primary" />}
            label="04"
            title="Why Signal Scout"
            items={[
              "Only platform that correlates WiFi, Bluetooth, cellular, and IoT signals into a unified intelligence picture.",
              "AI-driven environmental baselining eliminates false positives — alerts you to what matters.",
              "Modular architecture allows new protocol modules to be deployed without hardware changes.",
              "Purpose-built for government procurement with GSA Schedule availability and FedRAMP-aligned options.",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
