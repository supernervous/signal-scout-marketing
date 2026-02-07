import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Radio } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background pt-16"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            <Shield className="mr-1 h-3 w-3" />
            By Nervous Energy, LLC
          </Badge>

          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-primary">Signal</span> Scout
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Transform electronic spectral patterns into actionable intelligence
            through advanced monitoring, collection, and analysis technology.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <a href="#solution">
                Explore the Platform
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Request a Demo</a>
            </Button>
          </div>

          {/* Hero visual placeholder */}
          <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-xl border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-muted-foreground">
                Signal Scout Dashboard
              </span>
            </div>
            {/* Replace with actual dashboard screenshot */}
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20 p-8">
              <div className="text-center">
                <Radio className="mx-auto mb-4 h-16 w-16 text-primary/40" />
                <p className="text-sm text-muted-foreground">
                  Dashboard screenshot placeholder — replace with
                  /images/dashboard.png
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
