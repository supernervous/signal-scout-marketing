import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  CalendarClock,
} from "lucide-react";

interface QuadrantItem {
  text: string;
}

interface QuadrantProps {
  icon: React.ReactNode;
  title: string;
  items: QuadrantItem[];
}

function Quadrant({ icon, title, items }: QuadrantProps) {
  return (
    <Card className="h-full border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item.text}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function ProblemSolution() {
  return (
    <section id="solution" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The Challenge & Our Answer
          </h2>
          <p className="text-lg text-muted-foreground">
            Modern electronic environments demand a new approach to signal
            intelligence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Quadrant
            icon={
              <AlertTriangle className="h-5 w-5 shrink-0 text-orange-500" />
            }
            title="Problem Statement"
            items={[
              {
                text: "Organizations lack visibility into electronic activity in their operational environments.",
              },
              {
                text: "Single-protocol monitoring solutions miss critical patterns across device types.",
              },
              {
                text: "Current systems require extensive manual configuration and lack adaptive capabilities.",
              },
            ]}
          />

          <Quadrant
            icon={<Lightbulb className="h-5 w-5 shrink-0 text-primary" />}
            title="Solution"
            items={[
              {
                text: "Multi-protocol passive monitoring platform covering WiFi, Bluetooth, cellular, and IoT.",
              },
              {
                text: "Environmental adaptation with ML-based pattern recognition and fingerprinting.",
              },
              {
                text: "Real-time analysis for anomaly detection and predictive intelligence.",
              },
            ]}
          />

          <Quadrant
            icon={
              <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
            }
            title="Benefits"
            items={[
              {
                text: "Enhanced situational awareness in complex electronic environments.",
              },
              {
                text: "Early detection of potential security threats.",
              },
              {
                text: "Non-intrusive monitoring with no disruption to existing networks or systems.",
              },
              {
                text: "Dual-use applications across security, commercial, and research sectors.",
              },
            ]}
          />

          <Quadrant
            icon={
              <CalendarClock className="h-5 w-5 shrink-0 text-primary" />
            }
            title="Development Timeline"
            items={[
              {
                text: "Initial prototype with IMSI capture, DJI drone, vehicle telematics, WiFi, Bluetooth correlation.",
              },
              {
                text: "Signal/spectrum fingerprinting.",
              },
              {
                text: "Broad spectrum jammer detection.",
              },
              {
                text: "Implement ML-based pattern recognition.",
              },
              {
                text: "Field testing and environmental adaptation refinement.",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
