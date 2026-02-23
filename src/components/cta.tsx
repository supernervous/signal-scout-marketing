"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";

const initialState: ContactFormState = { success: false, error: null };

const inputClass =
  "w-full border border-border/40 bg-background/60 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors";

export function CTA() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Begin Assessment
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to See the Full Spectrum?
          </h2>
          <p className="mb-12 text-base text-muted-foreground">
            Schedule a capability briefing to see how Signal Scout can give your
            agency an intelligence edge.
          </p>
        </div>

        {state.success ? (
          <div className="bracket-corners mx-auto max-w-xl border border-emerald-500/30 bg-emerald-500/5 p-10 text-center">
            <CheckCircle className="mx-auto mb-4 h-8 w-8 text-emerald-500" />
            <h3 className="mb-2 text-lg font-semibold">Message Received</h3>
            <p className="text-sm text-muted-foreground">
              We&apos;ll review your inquiry and respond within one business day.
            </p>
          </div>
        ) : (
          <form
            action={formAction}
            className="bracket-corners mx-auto max-w-xl border border-border/40 bg-card/50 p-8 sm:p-10"
          >
            {/* Name + Org row */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70"
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label
                  htmlFor="org"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70"
                >
                  Organization
                </label>
                <input
                  id="org"
                  name="org"
                  type="text"
                  className={inputClass}
                  placeholder="Agency / Department"
                />
              </div>
            </div>

            {/* Email + Phone row */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="jane@agency.gov"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={inputClass}
                  placeholder="(555) 000-0000"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about your operational requirements..."
              />
            </div>

            {/* Error */}
            {state.error && (
              <div className="mt-4 flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {state.error}
              </div>
            )}

            {/* Submit */}
            <div className="mt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="w-full gap-2 font-mono text-xs uppercase tracking-wider"
              >
                {isPending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Request a Briefing
                  </>
                )}
              </Button>
            </div>

            <p className="mt-4 text-center font-mono text-[10px] text-muted-foreground">
              Or email us directly at{" "}
              <a
                href="mailto:contact@nervousenergy.com"
                className="text-primary/60 hover:text-primary"
              >
                contact@nervousenergy.com
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
