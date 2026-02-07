import { ShieldAlert, Zap } from "lucide-react";

export function ProvocationResponse() {
  return (
    <section className="bg-foreground py-24 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Provocation */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <ShieldAlert className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Provocation
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-background/80">
              The modern battlefield has become saturated with electronic devices
              transmitting valuable intelligence, yet our ability to passively
              monitor and correlate these diverse signals remains dangerously
              outdated. As non-state actors and near-peer adversaries
              increasingly employ sophisticated electronic warfare tactics using
              consumer-grade technologies, traditional single-protocol monitoring
              systems leave critical blind spots that undermine situational
              awareness and force protection.
            </p>
            {/* Add extra images or illustrations here */}
          </div>

          {/* Response */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Zap className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Response
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-background/80">
              Signal Scout addresses this urgent capability gap by providing
              comprehensive passive signal intelligence across the full spectrum
              of modern communication protocols, transforming invisible
              electronic patterns into actionable intelligence that enhances
              operational security while reducing the personnel and equipment
              footprint required for effective electronic surveillance.
            </p>
            {/* Add extra images or illustrations here */}
          </div>
        </div>
      </div>
    </section>
  );
}
