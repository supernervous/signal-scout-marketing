import { Radio } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Solution", href: "#solution" },
      { label: "Technology", href: "#architecture" },
      { label: "Timeline", href: "#milestones" },
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
      // Add privacy policy and terms pages here
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground py-12 text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="#hero" className="flex items-center gap-2 font-semibold">
              <Radio className="h-5 w-5 text-primary" />
              <span>Signal Scout</span>
            </a>
            <p className="mt-3 text-sm text-background/60">
              Passive signal intelligence for the modern electronic battlefield.
              By Nervous Energy, LLC.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-background/60">
                {group.heading}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-background"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-background/10" />

        <p className="text-center text-sm text-background/50">
          &copy; {new Date().getFullYear()} Nervous Energy, LLC. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
