interface TeamMember {
  name: string;
  title: string;
  org: string;
  description: string;
  initials: string;
}

const team: TeamMember[] = [
  {
    name: "Richard Puckett",
    title: "Principal Data Scientist",
    org: "Nervous Energy",
    description:
      "Dedicated to creating innovative solutions to hard problems.",
    initials: "RP",
  },
  {
    name: "Lance Hughes",
    title: "Principal Data Scientist",
    org: "SAP Concur",
    description:
      "Focused on natural language processing using transformers.",
    initials: "LH",
  },
  {
    name: "Kalin Ovtcharov",
    title: "Principal Member of Technical Staff",
    org: "AMD",
    description: "Working on AI PC applications.",
    initials: "KO",
  },
];

export function Team() {
  return (
    <section id="team" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Personnel
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The Team
          </h2>
          <p className="text-base text-muted-foreground">
            Four decades of combined experience in data science, AI, and
            engineering.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="bracket-corners border border-border/40 bg-card/50 p-6"
            >
              <div className="mb-4 flex items-center gap-4">
                {/* Initials badge */}
                <div className="flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/5">
                  <span className="font-mono text-sm font-bold text-primary">
                    {member.initials}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-primary/70">
                    {member.org}
                  </p>
                </div>
              </div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                {member.title}
              </p>
              <p className="text-sm text-muted-foreground/70">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
