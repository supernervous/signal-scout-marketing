import { ShieldAlert, Zap } from "lucide-react";

export function ProvocationResponse() {
  return (
    <section className="section-accent bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Provocation */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 text-amber-500" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Threat Assessment
              </p>
            </div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl">
              The Threat Landscape
            </h2>
            <div className="border-l border-amber-500/30 pl-5">
              <p className="text-base leading-relaxed text-muted-foreground">
                Criminal organizations and persons of interest increasingly rely
                on consumer wireless devices to coordinate activity — burner
                phones, encrypted messaging apps, Bluetooth dead drops, WiFi
                hotspots, and IoT-connected vehicles. Yet most agencies still
                monitor these signals one protocol at a time, creating blind spots
                that sophisticated targets exploit daily. As the electronic
                footprint of criminal activity grows exponentially, the
                intelligence gap between what suspects transmit and what law
                enforcement can see continues to widen.
              </p>
            </div>
          </div>

          {/* Response */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary" />
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Capability Response
              </p>
            </div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl">
              The Signal Scout Advantage
            </h2>
            <div className="border-l border-primary/30 pl-5">
              <p className="text-base leading-relaxed text-muted-foreground">
                Signal Scout closes this intelligence gap by passively monitoring
                the full consumer wireless spectrum — cellular, WiFi, Bluetooth,
                and IoT — and correlating signals across protocols to build a
                unified picture of electronic activity. The result is actionable
                intelligence delivered to investigators and analysts in real time,
                without requiring dedicated RF expertise to operate or any
                electronic emissions that could compromise an operation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
