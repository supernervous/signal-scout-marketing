/* ─────────────────────────────────────────────────────────
   Intel Briefing — "Next Steps" from device attribution.
   Shows how Signal Scout analysis translates into
   actionable intelligence through movement analysis
   and subject correlation across real-world events.
   ───────────────────────────────────────────────────────── */

const events = [
  {
    id: "01",
    date: "01 MAY 2025",
    time: "14:22–18:47 CDT",
    location: "May Day Rally, Hennepin County Government Center",
    city: "Minneapolis, MN",
    subjects: [
      { id: "P1", devices: ["W01", "T01"] },
      { id: "P3", devices: ["W02", "B03", "T02", "W03"] },
      { id: "P6", devices: ["W05", "I03"] },
    ],
    note: "First confirmed co-location of P1, P3, and P6. Vehicle T02 (2023 Ford F-150) detected in parking structure 2 blocks from rally site.",
  },
  {
    id: "02",
    date: "08 MAY 2025",
    time: "09:15–11:33 PDT",
    location: "ICE Field Office, SW Macadam Ave",
    city: "Portland, OR",
    subjects: [
      { id: "P0", devices: ["B01"] },
      { id: "P3", devices: ["B03", "T02", "W03"] },
    ],
    note: "First confirmed co-location of P0 and P3. Despite low attribution confidence for P0, BT proximity data places B01 within 15m of B03 for 2+ hours.",
  },
  {
    id: "03",
    date: "15 MAY 2025",
    time: "10:08–14:22 PDT",
    location: "U.S. District Courthouse, Stewart St",
    city: "Seattle, WA",
    subjects: [
      { id: "P3", devices: ["W02", "B03", "T02"] },
      { id: "P4", devices: ["W04", "T03", "B04"] },
    ],
    note: "First confirmed co-location of P3 and P4. Both vehicles (T02, T03) detected in adjacent spaces in courthouse parking structure.",
  },
  {
    id: "04",
    date: "22 MAY 2025",
    time: "06:44–07:12 MDT",
    location: "I-70 Corridor, Fuel Stop",
    city: "Denver, CO",
    subjects: [{ id: "P3", devices: ["T02", "W03"] }],
    note: "Brief TPMS detection consistent with east-bound transit. WiFi probe from W03 captured by nearby commercial AP.",
  },
];

const findings = [
  {
    text: (
      <>
        <span className="text-primary">P3</span> is the common thread across
        all four locations, spanning 1,900+ miles over 22 days. Vehicle{" "}
        <span className="text-amber-400">T02</span> (2023 Ford F-150,
        attributed at 92%) provides persistent tracking continuity at all 4
        sites.
      </>
    ),
  },
  {
    text: (
      <>
        <span className="text-primary">P0</span> co-located with P3 at
        Portland ICE facility despite only 62% attribution confidence on a
        single BT device — indicates P0 is more operationally significant
        than device profile suggests.
      </>
    ),
  },
  {
    text: (
      <>
        Co-location of <span className="text-primary">P1</span>/
        <span className="text-primary">P6</span> with P3 at Minneapolis, and{" "}
        <span className="text-primary">P4</span> with P3 at Seattle, reveals
        a network spanning at least 5 subjects across the Pacific Northwest
        and Upper Midwest.
      </>
    ),
  },
  {
    text: (
      <>
        P3&apos;s device cluster shows consistent carry pattern (B03 + W03 +
        W02 + T02) but notably absent IMSI/cell signature — possible
        deliberate countermeasure against cellular intercept.
      </>
    ),
  },
];

const recommendations = [
  "Elevate P3 to Priority Collection Target — expand TPMS corridor monitoring on I-5, I-90, I-94",
  "Cross-reference P0 device signature (B01) against Portland-area field intelligence",
  "Task additional collection assets at anticipated June protest/event sites",
  "Request interstate TPMS corridor analysis for T02 across Pacific NW highway network",
  "Coordinate with field offices in Minneapolis, Portland, Seattle, and Denver for ground truth validation",
];

const mapNodes = [
  { city: "MINNEAPOLIS", state: "MN", x: 100, subjects: "P1 P3 P6" },
  { city: "PORTLAND", state: "OR", x: 340, subjects: "P0 P3" },
  { city: "SEATTLE", state: "WA", x: 570, subjects: "P3 P4" },
  { city: "DENVER", state: "CO", x: 800, subjects: "P3" },
];

export function IntelBriefing() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Intelligence Product
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            From Signals to Actionable Intelligence
          </h2>
          <p className="text-base text-muted-foreground">
            Signal Scout transforms passive device attribution into operational
            insight through automated correlation and movement analysis.
          </p>
        </div>

        <div className="bracket-corners mx-auto max-w-5xl border border-border/40 bg-background/50">
          {/* ── Classification banner ──────────────────── */}
          <div className="border-b border-amber-500/20 bg-amber-500/[0.04] px-5 py-1.5 text-center">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400/80">
              SIGSCOUT // SAMPLE PRODUCT // UNCLASSIFIED
            </span>
          </div>

          {/* ── Document header ────────────────────────── */}
          <div className="border-b border-border/30 px-6 py-4">
            <h3 className="mb-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground">
              Subject Correlation &amp; Movement Analysis
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span className="font-mono text-[11px] text-muted-foreground">
                Report:{" "}
                <span className="text-foreground/80">
                  SIGSCOUT-2025-0517-A
                </span>
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                Period:{" "}
                <span className="text-foreground/80">01–22 MAY 2025</span>
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                Analyst:{" "}
                <span className="text-foreground/80">SIGSCOUT-AI</span>
              </span>
            </div>
          </div>

          {/* ── Executive Summary ──────────────────────── */}
          <div className="border-b border-border/30 px-6 py-4">
            <h4 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Executive Summary
            </h4>
            <p className="font-mono text-xs leading-relaxed text-foreground/80">
              Analysis of Signal Scout device attribution data has identified{" "}
              <span className="font-bold text-primary">SUBJ-03 (P3)</span> as
              a nationally mobile actor with confirmed presence at four
              locations across four states over a 22-day period. Vehicle TPMS
              signature T02 (2023 Ford F-150) provides high-confidence
              tracking continuity between events. Multiple subject
              co-locations suggest a coordinated network operating across the
              Pacific Northwest and Upper Midwest.
            </p>
          </div>

          {/* ── Movement Pattern Diagram ───────────────── */}
          <div className="border-b border-border/30 px-6 py-5">
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Movement Pattern — P3 (22-Day Window)
            </h4>
            <div className="overflow-x-auto">
              <svg
                viewBox="0 0 900 110"
                className="min-w-[600px]"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Connection line */}
                <line
                  x1={mapNodes[0].x}
                  y1={50}
                  x2={mapNodes[3].x}
                  y2={50}
                  stroke="hsl(187 78% 46%)"
                  strokeWidth="1.5"
                  opacity={0.3}
                />
                {/* Animated pulse along the line */}
                <line
                  x1={mapNodes[0].x}
                  y1={50}
                  x2={mapNodes[3].x}
                  y2={50}
                  stroke="hsl(187 78% 46%)"
                  strokeWidth="1.5"
                  strokeDasharray="8 16"
                  opacity={0.5}
                  style={{
                    animation:
                      "connection-pulse 3s ease-in-out infinite",
                    "--base-opacity": "0.3",
                    "--peak-opacity": "0.6",
                  } as React.CSSProperties}
                />

                {mapNodes.map((node, i) => (
                  <g key={node.city}>
                    {/* Node dot */}
                    <circle
                      cx={node.x}
                      cy={50}
                      r="6"
                      fill="hsl(187 78% 46%)"
                      opacity={0.9}
                    />
                    <circle
                      cx={node.x}
                      cy={50}
                      r="10"
                      fill="none"
                      stroke="hsl(187 78% 46%)"
                      strokeWidth="1"
                      opacity={0.3}
                    />

                    {/* City + State */}
                    <text
                      x={node.x}
                      y={18}
                      textAnchor="middle"
                      fill="hsl(210 20% 80%)"
                      fontSize="11"
                      fontFamily="var(--font-geist-mono)"
                      fontWeight="bold"
                    >
                      {node.city}, {node.state}
                    </text>

                    {/* Event number + date */}
                    <text
                      x={node.x}
                      y={33}
                      textAnchor="middle"
                      fill="hsl(215 15% 50%)"
                      fontSize="9"
                      fontFamily="var(--font-geist-mono)"
                    >
                      {events[i].date}
                    </text>

                    {/* Subjects */}
                    <text
                      x={node.x}
                      y={78}
                      textAnchor="middle"
                      fill="hsl(187 78% 56%)"
                      fontSize="10"
                      fontFamily="var(--font-geist-mono)"
                      fontWeight="bold"
                    >
                      {node.subjects}
                    </text>

                    {/* Distance markers between nodes */}
                    {i < mapNodes.length - 1 && (
                      <text
                        x={(node.x + mapNodes[i + 1].x) / 2}
                        y={96}
                        textAnchor="middle"
                        fill="hsl(215 15% 40%)"
                        fontSize="8"
                        fontFamily="var(--font-geist-mono)"
                      >
                        {["→ 1,650 mi", "→ 175 mi", "→ 1,315 mi"][i]}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* ── Event Correlation ──────────────────────── */}
          <div className="border-b border-border/30 px-6 py-4">
            <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Event Correlation
            </h4>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border-l-2 border-primary/30 pl-4"
                >
                  <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[10px] font-bold text-primary">
                      EVENT {event.id}
                    </span>
                    <span className="font-mono text-[11px] text-foreground/80">
                      {event.date}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {event.time}
                    </span>
                  </div>
                  <p className="mb-1.5 font-mono text-xs text-foreground/90">
                    {event.location},{" "}
                    <span className="text-foreground">{event.city}</span>
                  </p>
                  <div className="mb-1.5 flex flex-wrap gap-x-4 gap-y-1">
                    {event.subjects.map((subj) => (
                      <span
                        key={subj.id}
                        className="font-mono text-[11px]"
                      >
                        <span className="font-bold text-primary">
                          {subj.id}
                        </span>
                        <span className="ml-1 text-muted-foreground">
                          ({subj.devices.join(", ")})
                        </span>
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                    {event.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Key Findings ───────────────────────────── */}
          <div className="border-b border-border/30 px-6 py-4">
            <h4 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Key Findings
            </h4>
            <ol className="space-y-2.5">
              {findings.map((finding, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-px font-mono text-[10px] font-bold text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs leading-relaxed text-foreground/80">
                    {finding.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Assessment ─────────────────────────────── */}
          <div className="border-b border-border/30 px-6 py-4">
            <h4 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Assessment
            </h4>
            <p className="mb-3 font-mono text-xs leading-relaxed text-foreground/80">
              P3 is assessed with{" "}
              <span className="font-bold text-amber-400">
                MODERATE CONFIDENCE
              </span>{" "}
              as a mobile coordinator operating across the Pacific Northwest
              and Upper Midwest corridor. The consistent device carry pattern,
              combined with absence of cellular/IMSI attribution, suggests a
              subject with awareness of digital surveillance capabilities. The
              co-location pattern with four separate subjects at
              protest and government facility sites over a 22-day window is
              consistent with an organized operational cadence.
            </p>
            <p className="font-mono text-xs leading-relaxed text-foreground/80">
              P0 remains the most significant intelligence gap.
              Single-device attribution at 62% confidence is insufficient for
              positive identification, yet co-location with P3 at a sensitive
              government facility warrants elevated collection priority.
            </p>
          </div>

          {/* ── Recommended Actions ────────────────────── */}
          <div className="border-b border-border/30 px-6 py-4">
            <h4 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Recommended Actions
            </h4>
            <ul className="space-y-2">
              {recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                  <span className="font-mono text-xs leading-relaxed text-foreground/80">
                    {rec}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Footer ─────────────────────────────────── */}
          <div className="px-5 py-2 text-center">
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              Sample analytical product for demonstration purposes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
