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
  {
    text: (
      <>
        Network topology is consistent with a compartmented cell structure.{" "}
        <span className="text-primary">P3</span> is the only subject with
        confirmed ties to both groupings, suggesting a coordinator or
        liaison role. No direct{" "}
        <span className="text-amber-400">P0</span>–
        <span className="text-amber-400">P4</span> contact has been
        observed, which may indicate deliberate operational separation.
      </>
    ),
  },
];

const recommendations = [
  "Elevate P3 to Priority Collection Target — expand TPMS corridor monitoring on I-5, I-90, I-94",
  "Cross-reference P0 device signature (B01) against Portland-area field intelligence",
  "Task additional collection assets at anticipated June protest/event sites in both Cell Alpha (Upper Midwest) and Cell Bravo (Pacific NW) areas of operation",
  "Request interstate TPMS corridor analysis for T02 across Pacific NW highway network",
  "Priority: Determine whether P0 and P4 have independent contact — this would confirm Cell Bravo as an established grouping rather than a provisional designation",
  "Coordinate with field offices in Minneapolis, Portland, Seattle, and Denver for ground truth validation of cell membership",
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

          {/* ── Network Analysis ────────────────────────── */}
          <div className="border-b border-border/30 px-6 py-4">
            <h4 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Network Analysis — Probable Cell Structure
            </h4>
            <p className="mb-4 font-mono text-xs leading-relaxed text-foreground/80">
              Co-location frequency, device proximity duration, and coordinated
              movement patterns indicate two overlapping operational groupings
              linked by{" "}
              <span className="font-bold text-primary">P3</span> as a
              bridge node.
            </p>

            {/* Cell diagram */}
            <div className="overflow-x-auto">
              <svg
                viewBox="0 0 900 200"
                className="min-w-[500px]"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Cell A background */}
                <rect
                  x={55}
                  y={20}
                  width={340}
                  height={160}
                  rx={4}
                  fill="hsl(187 78% 46%)"
                  opacity={0.04}
                  stroke="hsl(187 78% 46%)"
                  strokeWidth={1}
                  strokeDasharray="6 4"
                  strokeOpacity={0.2}
                />
                <text
                  x={225}
                  y={42}
                  textAnchor="middle"
                  fill="hsl(187 78% 56%)"
                  fontSize="9"
                  fontFamily="var(--font-geist-mono)"
                  fontWeight="bold"
                  letterSpacing="0.15em"
                >
                  CELL ALPHA — UPPER MIDWEST
                </text>

                {/* Cell B background */}
                <rect
                  x={505}
                  y={20}
                  width={340}
                  height={160}
                  rx={4}
                  fill="hsl(40 70% 50%)"
                  opacity={0.04}
                  stroke="hsl(40 70% 50%)"
                  strokeWidth={1}
                  strokeDasharray="6 4"
                  strokeOpacity={0.2}
                />
                <text
                  x={675}
                  y={42}
                  textAnchor="middle"
                  fill="hsl(40 70% 60%)"
                  fontSize="9"
                  fontFamily="var(--font-geist-mono)"
                  fontWeight="bold"
                  letterSpacing="0.15em"
                >
                  CELL BRAVO — PACIFIC NW
                </text>

                {/* ── Edges ─── */}
                {/* P1–P3: HIGH */}
                <line x1={225} y1={100} x2={395} y2={100} stroke="hsl(187 78% 46%)" strokeWidth={2} opacity={0.6} />
                {/* P6–P3: HIGH */}
                <line x1={225} y1={155} x2={395} y2={100} stroke="hsl(187 78% 46%)" strokeWidth={2} opacity={0.6} />
                {/* P1–P6: MODERATE (both at Minneapolis, indirect) */}
                <line x1={225} y1={100} x2={225} y2={155} stroke="hsl(187 78% 46%)" strokeWidth={1} strokeDasharray="4 4" opacity={0.35} />

                {/* P3–P0: MODERATE */}
                <line x1={505} y1={100} x2={675} y2={100} stroke="hsl(40 70% 50%)" strokeWidth={1.5} strokeDasharray="6 4" opacity={0.5} />
                {/* P3–P4: MODERATE */}
                <line x1={505} y1={100} x2={675} y2={155} stroke="hsl(40 70% 50%)" strokeWidth={1.5} strokeDasharray="6 4" opacity={0.5} />

                {/* P3 bridge connector */}
                <line x1={395} y1={100} x2={505} y2={100} stroke="hsl(215 20% 50%)" strokeWidth={1.5} strokeDasharray="3 6" opacity={0.4} />
                <text
                  x={450}
                  y={90}
                  textAnchor="middle"
                  fill="hsl(215 20% 55%)"
                  fontSize="8"
                  fontFamily="var(--font-geist-mono)"
                >
                  BRIDGE
                </text>

                {/* Edge confidence labels */}
                {/* P1–P3 */}
                <text x={310} y={93} textAnchor="middle" fill="hsl(187 78% 56%)" fontSize="8" fontFamily="var(--font-geist-mono)" fontWeight="bold">HIGH</text>
                {/* P6–P3 */}
                <text x={320} y={140} textAnchor="middle" fill="hsl(187 78% 56%)" fontSize="8" fontFamily="var(--font-geist-mono)" fontWeight="bold">HIGH</text>
                {/* P1–P6 */}
                <text x={200} y={130} textAnchor="middle" fill="hsl(215 20% 55%)" fontSize="7" fontFamily="var(--font-geist-mono)">MOD</text>
                {/* P3–P0 */}
                <text x={590} y={93} textAnchor="middle" fill="hsl(40 70% 60%)" fontSize="8" fontFamily="var(--font-geist-mono)">MODERATE</text>
                {/* P3–P4 */}
                <text x={580} y={140} textAnchor="middle" fill="hsl(40 70% 60%)" fontSize="8" fontFamily="var(--font-geist-mono)">MODERATE</text>

                {/* ── Person nodes ─── */}
                {[
                  { id: "P1", x: 225, y: 100, primary: true },
                  { id: "P6", x: 225, y: 155, primary: true },
                  { id: "P3", x: 450, y: 100, primary: true },
                  { id: "P0", x: 675, y: 100, primary: false },
                  { id: "P4", x: 675, y: 155, primary: false },
                ].map((node) => (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.id === "P3" ? 22 : 18}
                      fill="hsl(225 30% 8%)"
                      stroke={node.primary ? "hsl(187 78% 46%)" : "hsl(40 70% 50%)"}
                      strokeWidth={node.id === "P3" ? 2.5 : 1.5}
                      opacity={node.id === "P0" ? 0.7 : 0.95}
                    />
                    <text
                      x={node.x}
                      y={node.y + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={node.primary ? "hsl(187 78% 60%)" : "hsl(40 70% 60%)"}
                      fontSize={node.id === "P3" ? "14" : "12"}
                      fontFamily="var(--font-geist-mono)"
                      fontWeight="bold"
                    >
                      {node.id}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Cell descriptions */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="border-l-2 border-primary/40 pl-3">
                <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                  Cell Alpha — Upper Midwest
                </p>
                <p className="font-mono text-[11px] leading-relaxed text-foreground/80">
                  <span className="font-bold text-primary">P1</span>,{" "}
                  <span className="font-bold text-primary">P3</span>,{" "}
                  <span className="font-bold text-primary">P6</span> —{" "}
                  <span className="text-emerald-400">HIGH</span> association
                  confidence. All three co-located at Minneapolis May Day Rally
                  with 4+ hours of overlapping device presence. P1 and P6
                  demonstrate coordinated arrival/departure timing consistent
                  with pre-arranged meeting. P3 serves as the only member with
                  confirmed out-of-region travel.
                </p>
              </div>
              <div className="border-l-2 border-amber-500/40 pl-3">
                <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Cell Bravo — Pacific NW
                </p>
                <p className="font-mono text-[11px] leading-relaxed text-foreground/80">
                  <span className="font-bold text-primary">P3</span>,{" "}
                  <span className="font-bold text-amber-400">P0</span>,{" "}
                  <span className="font-bold text-amber-400">P4</span> —{" "}
                  <span className="text-amber-400">MODERATE</span> association
                  confidence. P0 and P4 each share a single co-location event
                  with P3 but have no confirmed direct contact with each other.
                  Classification as a cell is provisional — further collection
                  required to confirm P0–P4 linkage. P0&apos;s low device
                  attribution (62%) adds uncertainty.
                </p>
              </div>
            </div>
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
              as a mobile coordinator bridging two distinct operational
              groupings across the Pacific Northwest and Upper Midwest. The
              consistent device carry pattern, combined with absence of
              cellular/IMSI attribution, suggests a subject with awareness of
              digital surveillance capabilities. P3&apos;s role as the sole link
              between Cell Alpha (P1, P6) and Cell Bravo (P0, P4) is consistent
              with a compartmented organizational structure designed to limit
              exposure — a hallmark of distributed activist networks.
            </p>
            <p className="mb-3 font-mono text-xs leading-relaxed text-foreground/80">
              Cell Alpha (P1, P3, P6) is assessed as the more cohesive grouping.
              The Minneapolis co-location demonstrated coordinated behavior patterns
              including synchronized arrival timing and shared proximity duration
              exceeding 4 hours. Cell Bravo remains provisional — P0 and P4
              have no confirmed direct contact, and their association is inferred
              solely through P3 as an intermediary.
            </p>
            <p className="font-mono text-xs leading-relaxed text-foreground/80">
              P0 remains the most significant intelligence gap.
              Single-device attribution at 62% confidence is insufficient for
              positive identification, yet co-location with P3 at a sensitive
              government facility warrants elevated collection priority.
              Establishing whether P0 has independent contact with P4 would
              significantly strengthen the Cell Bravo designation.
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
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
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
