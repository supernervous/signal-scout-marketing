import { Badge } from "@/components/ui/badge";
import { FlaskConical, Rocket } from "lucide-react";

export function Readiness() {
  return (
    <section id="readiness" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Current Readiness & Future Opportunities
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Current State */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <FlaskConical className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Current State</h3>
              <Badge variant="outline">TRL 3-4</Badge>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Signal Scout is currently at Technology Readiness Level (TRL)
                3-4, with fundamental concepts validated and key components
                demonstrated in laboratory conditions. Our proof-of-concept
                implementation utilizes an array of Commercial Off-The-Shelf
                (COTS) Software-Defined Radio platforms including multiple
                HackRF units and general-purpose SDRs.
              </p>
              <p>
                This configuration has successfully demonstrated passive signal
                detection across multiple frequency bands and protocol types,
                validating our core technical approach of multi-protocol
                monitoring and correlation.
              </p>
              <p>
                Development roadmap will initially focus on passive signal
                collection and analysis capabilities to provide immediate
                intelligence value while minimizing operational signatures.
              </p>
            </div>
          </div>

          {/* Future Opportunities */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Rocket className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Path to TRL 5-6</h3>
              <Badge>DIU Accelerator</Badge>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Participation in the Defense Innovation Unit Accelerator program
                will enable critical advancement to TRL 5-6 through acquisition
                of laboratory-grade test equipment necessary for precise signal
                characterization and environmental adaptation refinement.
              </p>
              <p>
                This includes USRP SDRs and spectrum analyzers with GPSDO timing
                synchronization essential for accurate signal fingerprinting.
              </p>
              <p>
                DIU support will accelerate development of our cloud-native
                software services for signal correlation and artificial
                intelligence components, transforming our current hardware
                prototype into a deployable Minimum Viable Product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
