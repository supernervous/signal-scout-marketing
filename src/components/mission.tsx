import { Target } from "lucide-react";

export function Mission() {
  return (
    <section
      id="mission"
      className="section-accent bg-card py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Target className="mx-auto mb-6 h-8 w-8 text-primary" />
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Our Mission
          </p>
          <p className="text-2xl font-light leading-relaxed text-foreground/90 sm:text-3xl lg:text-4xl">
            To transform electronic spectral patterns into actionable
            intelligence through advanced monitoring, collection, and analysis
            technology.
          </p>
        </div>
      </div>
    </section>
  );
}
