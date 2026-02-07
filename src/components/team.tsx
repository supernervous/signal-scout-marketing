import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The Team
          </h2>
          <p className="text-lg text-muted-foreground">
            Four decades of combined experience in data science, AI, and
            engineering.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card key={member.name} className="text-center">
              <CardContent className="pt-6">
                {/* Replace with <Image src="/team/name.jpg" ...> when headshots are available */}
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-3xl font-bold text-primary">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary">
                  {member.name}
                </h3>
                <p className="text-sm font-medium">{member.title}</p>
                <p className="text-sm text-muted-foreground">{member.org}</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add testimonials or advisory board here */}
      </div>
    </section>
  );
}
