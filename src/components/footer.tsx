import { Radio } from "lucide-react";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Solution", href: "#solution" },
      { label: "Technology", href: "#architecture" },
      { label: "Deployment", href: "#deployment" },
      { label: "Get Started", href: "#engagement" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Team", href: "#team" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="section-accent border-t border-border/40 bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a
              href="#hero"
              className="flex items-center gap-2.5 font-mono text-sm uppercase tracking-[0.15em] text-foreground"
            >
              <Radio className="h-4 w-4 text-primary" />
              Signal Scout
            </a>
            <p className="mt-3 text-sm text-muted-foreground/60">
              Passive signal intelligence for law enforcement and government
              agencies. By Nervous Energy, LLC.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
                {group.heading}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground/60 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border/20 pt-6">
          <p className="text-center font-mono text-[10px] tracking-wider text-muted-foreground/30">
            &copy; {new Date().getFullYear()} Nervous Energy, LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
