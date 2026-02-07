import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function CTA() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-primary to-primary/80 py-24 text-primary-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to See the Full Spectrum?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/80">
            Contact us to learn how Signal Scout can enhance your operational
            security and situational awareness.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Integrate email service or contact form here */}
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2"
            >
              <a href="mailto:contact@nervousenergy.com">
                <Mail className="h-4 w-4" />
                Contact Us
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="#solution">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Integrate Stripe for pricing tiers here */}
        </div>
      </div>
    </section>
  );
}
