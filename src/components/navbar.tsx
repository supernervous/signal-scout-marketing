"use client";

import { useState } from "react";
import { Menu, X, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { label: "Solution", href: "#solution" },
  { label: "Technology", href: "#architecture" },
  { label: "Deployment", href: "#deployment" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 font-mono text-sm uppercase tracking-[0.15em] text-foreground"
        >
          <Radio className="h-4 w-4 text-primary" />
          Signal Scout
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="ml-3 font-mono text-[11px] uppercase tracking-wider"
          >
            <a href="#contact">Get Started</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-2 w-full font-mono text-xs uppercase tracking-wider"
            >
              <a href="#contact" onClick={() => setOpen(false)}>
                Get Started
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
