import { Target } from "lucide-react";

export function Mission() {
  return (
    <section id="mission" className="bg-foreground py-24 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Target className="mx-auto mb-6 h-10 w-10 text-primary" />
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Our Mission
          </h2>
          <p className="text-2xl leading-relaxed font-light sm:text-3xl lg:text-4xl">
            To transform electronic spectral patterns into actionable
            intelligence through advanced monitoring, collection, and analysis
            technology.
          </p>
        </div>
      </div>
    </section>
  );
}
