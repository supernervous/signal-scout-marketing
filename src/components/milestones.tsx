interface Milestone {
  date: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    date: "March 2025",
    title: "Hardware Integration",
    description:
      "Integrate USRP X300, begin POC to MVP design, begin crafting GTM strategy.",
  },
  {
    date: "April 2025",
    title: "Data & AI Foundation",
    description:
      "Create spectrum schema and datastores, begin AI training and integration.",
  },
  {
    date: "May 2025",
    title: "Core Feature Completion",
    description:
      "Feature complete for LTE IMSI, WiFi, Bluetooth analysis. Intel reports, alerting, dashboards completed.",
  },
  {
    date: "June 2025",
    title: "Behavioral Analytics",
    description:
      "Begin signal and human behavioral analyses, improve AI, begin/continue device fingerprinting.",
  },
  {
    date: "July 2025",
    title: "MVP & Field Trials",
    description:
      "MVP feature complete, begin integration testing and field trials.",
  },
];

export function Milestones() {
  return (
    <section id="milestones" className="bg-muted py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Development Milestones
          </h2>
          <p className="text-lg text-muted-foreground">
            Our roadmap from prototype to field-ready MVP.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-primary/30 sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-12">
            {milestones.map((ms, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={ms.date} className="relative flex items-start">
                  {/* Dot */}
                  <div className="absolute left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background sm:left-1/2" />

                  {/* Content — alternates sides on desktop */}
                  <div
                    className={`ml-10 w-full sm:ml-0 sm:w-1/2 ${
                      isLeft
                        ? "sm:pr-12 sm:text-right"
                        : "sm:ml-auto sm:pl-12"
                    }`}
                  >
                    <span className="text-sm font-semibold text-primary">
                      {ms.date}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold">{ms.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {ms.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
