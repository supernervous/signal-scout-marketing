import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bracket-corners mx-auto max-w-2xl border border-primary/20 bg-card/50 p-10 text-center sm:p-14">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Begin Assessment
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to See the Full Spectrum?
          </h2>
          <p className="mb-8 text-base text-muted-foreground">
            Schedule a capability briefing to see how Signal Scout can give
            your agency an intelligence edge.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gap-2 font-mono text-xs uppercase tracking-wider"
            >
              <a href="mailto:contact@nervousenergy.com">
                <Mail className="h-3.5 w-3.5" />
                Request a Briefing
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 font-mono text-xs uppercase tracking-wider"
            >
              <a href="#solution">
                Learn More
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
