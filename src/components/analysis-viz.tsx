/* ─────────────────────────────────────────────────────────
   Device Ownership Network Graph + Registry Table

   Graph shows attributed devices clustered around person
   nodes with probability-labeled edges. The table below
   maps short designators to product descriptions and shows
   all attribution probabilities (including unresolved).
   ───────────────────────────────────────────────────────── */

const DEG = Math.PI / 180;
const SVG_W = 960;
const SVG_H = 560;
const ATTRIB_THRESHOLD = 0.55;

// ── Type metadata ────────────────────────────────────────
const typeColors: Record<string, string> = {
  bt: "#38bdf8",
  wifi: "#2dd4bf",
  tpms: "#f59e0b",
  cell: "#a78bfa",
};
const typeLetters: Record<string, string> = {
  bt: "B",
  wifi: "W",
  tpms: "T",
  cell: "I",
};
const typeLabels: Record<string, string> = {
  bt: "BT",
  wifi: "WiFi",
  tpms: "TPMS",
  cell: "IMSI",
};

// ── Person (subject) nodes ───────────────────────────────
interface Person {
  id: number;
  x: number;
  y: number;
}

const persons: Person[] = [
  { id: 0, x: 480, y: 280 },
  { id: 1, x: 148, y: 155 },
  { id: 2, x: 810, y: 155 },
  { id: 3, x: 155, y: 440 },
  { id: 4, x: 820, y: 430 },
  { id: 5, x: 420, y: 85 },
  { id: 6, x: 550, y: 460 },
];

// ── Device specifications ────────────────────────────────
interface DeviceEdge {
  personId: number;
  probability: number;
}

interface DeviceSpec {
  designator: string;
  description: string;
  type: "bt" | "wifi" | "tpms" | "cell";
  edges: DeviceEdge[];
  lastSeen: string;
  angle?: number;
  dist?: number;
}

const deviceSpecs: DeviceSpec[] = [
  // ── P0 — 1 device (borderline attribution) ────────────
  { designator: "B01", description: "Unknown BT Device", type: "bt",
    lastSeen: "Portland, OR",
    angle: 150, dist: 85,
    edges: [{ personId: 0, probability: 0.62 }] },

  // ── P1 — 2 devices ────────────────────────────────────
  { designator: "W01", description: "Apple iPhone 15 Pro", type: "wifi",
    lastSeen: "Minneapolis, MN",
    angle: 330, dist: 88,
    edges: [{ personId: 1, probability: 0.87 }] },
  { designator: "T01", description: "2022 Toyota Camry", type: "tpms",
    lastSeen: "Minneapolis, MN",
    angle: 200, dist: 84,
    edges: [{ personId: 1, probability: 0.82 }] },

  // ── P2 — 3 devices ────────────────────────────────────
  { designator: "B02", description: "Apple AirPods Pro (2nd Gen)", type: "bt",
    lastSeen: "Minneapolis, MN",
    angle: 30, dist: 84,
    edges: [{ personId: 2, probability: 0.91 }] },
  { designator: "W02", description: "Samsung Galaxy S24", type: "wifi",
    lastSeen: "Seattle, WA",
    angle: 160, dist: 88,
    edges: [{ personId: 2, probability: 0.78 }, { personId: 3, probability: 0.22 }] },
  { designator: "I01", description: "T-Mobile Prepaid SIM", type: "cell",
    lastSeen: "Minneapolis, MN",
    angle: 260, dist: 82,
    edges: [{ personId: 2, probability: 0.85 }] },

  // ── P3 — 3 devices ────────────────────────────────────
  { designator: "W03", description: "Apple MacBook Pro", type: "wifi",
    lastSeen: "Denver, CO",
    angle: 20, dist: 88,
    edges: [{ personId: 3, probability: 0.89 }] },
  { designator: "B03", description: "Garmin Forerunner 255", type: "bt",
    lastSeen: "Seattle, WA",
    angle: 110, dist: 84,
    edges: [{ personId: 3, probability: 0.76 }, { personId: 1, probability: 0.21 }] },
  { designator: "T02", description: "2023 Ford F-150", type: "tpms",
    lastSeen: "Denver, CO",
    angle: 220, dist: 88,
    edges: [{ personId: 3, probability: 0.92 }] },

  // ── P4 — 3 devices ────────────────────────────────────
  { designator: "W04", description: "Google Pixel 8 Pro", type: "wifi",
    lastSeen: "Seattle, WA",
    angle: 175, dist: 88,
    edges: [{ personId: 4, probability: 0.88 }] },
  { designator: "B04", description: "Apple Watch Ultra 2", type: "bt",
    lastSeen: "Seattle, WA",
    angle: 80, dist: 84,
    edges: [{ personId: 4, probability: 0.83 }] },
  { designator: "T03", description: "2021 Honda Civic", type: "tpms",
    lastSeen: "Seattle, WA",
    angle: 295, dist: 88,
    edges: [{ personId: 4, probability: 0.79 }] },

  // ── P5 — 2 devices ────────────────────────────────────
  { designator: "I02", description: "AT&T Postpaid SIM", type: "cell",
    lastSeen: "Minneapolis, MN",
    angle: 50, dist: 84,
    edges: [{ personId: 5, probability: 0.86 }] },
  { designator: "B05", description: "Samsung Galaxy Buds2 Pro", type: "bt",
    lastSeen: "Minneapolis, MN",
    angle: 230, dist: 88,
    edges: [{ personId: 5, probability: 0.74 }, { personId: 0, probability: 0.23 }] },

  // ── P6 — 3 devices ────────────────────────────────────
  { designator: "W05", description: "Apple iPad Air M2", type: "wifi",
    lastSeen: "Minneapolis, MN",
    angle: 350, dist: 88,
    edges: [{ personId: 6, probability: 0.90 }] },
  { designator: "T04", description: "2024 Tesla Model 3", type: "tpms",
    lastSeen: "Minneapolis, MN",
    angle: 180, dist: 84,
    edges: [{ personId: 6, probability: 0.77 }, { personId: 4, probability: 0.20 }] },
  { designator: "I03", description: "Verizon Prepaid SIM", type: "cell",
    lastSeen: "Minneapolis, MN",
    angle: 270, dist: 86,
    edges: [{ personId: 6, probability: 0.85 }] },

  // ── UNATTRIBUTED — no single person above threshold ───
  { designator: "W06", description: "Unknown WiFi Device", type: "wifi",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 6, probability: 0.42 }, { personId: 3, probability: 0.31 }] },
  { designator: "B06", description: "Fitbit Charge 6", type: "bt",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 1, probability: 0.38 }, { personId: 5, probability: 0.29 }] },
  { designator: "T05", description: "Unknown Vehicle", type: "tpms",
    lastSeen: "Portland, OR",
    edges: [{ personId: 0, probability: 0.44 }, { personId: 2, probability: 0.26 }] },
];

// ── Compute device positions ─────────────────────────────
interface PositionedDevice {
  designator: string;
  description: string;
  type: "bt" | "wifi" | "tpms" | "cell";
  x: number;
  y: number;
  attributed: boolean;
  edges: DeviceEdge[];
  lastSeen: string;
}

const positionedDevices: PositionedDevice[] = [];

for (const spec of deviceSpecs) {
  const maxEdge = spec.edges.reduce((a, b) =>
    a.probability > b.probability ? a : b
  );
  const attributed =
    maxEdge.probability >= ATTRIB_THRESHOLD && spec.angle != null;

  let x = 0,
    y = 0;
  if (attributed) {
    const p = persons.find((p) => p.id === maxEdge.personId)!;
    x = p.x + Math.cos(spec.angle! * DEG) * spec.dist!;
    y = p.y + Math.sin(spec.angle! * DEG) * spec.dist!;
  }

  positionedDevices.push({
    designator: spec.designator,
    description: spec.description,
    type: spec.type,
    x,
    y,
    attributed,
    edges: spec.edges,
    lastSeen: spec.lastSeen,
  });
}

// ── Build display edges (attributed devices only) ────────
interface DisplayEdge {
  key: string;
  dx: number;
  dy: number;
  px: number;
  py: number;
  probability: number;
  isPrimary: boolean;
  color: string;
}

const displayEdges: DisplayEdge[] = [];

for (const device of positionedDevices) {
  if (!device.attributed) continue;
  const maxProb = Math.max(...device.edges.map((e) => e.probability));
  for (const edge of device.edges) {
    const person = persons.find((p) => p.id === edge.personId)!;
    const isPrimary = edge.probability === maxProb;
    displayEdges.push({
      key: `${device.designator}-${edge.personId}`,
      dx: device.x,
      dy: device.y,
      px: person.x,
      py: person.y,
      probability: edge.probability,
      isPrimary,
      color: typeColors[device.type],
    });
  }
}

// ── Partition + sort for table ───────────────────────────
const attributed = positionedDevices.filter((d) => d.attributed);
const tableDevices = [...positionedDevices].sort((a, b) => {
  // Attributed first, then unattributed
  if (a.attributed !== b.attributed) return a.attributed ? -1 : 1;
  // Within attributed: sort by primary person, then designator
  const aMax = a.edges.reduce((x, y) =>
    x.probability > y.probability ? x : y
  );
  const bMax = b.edges.reduce((x, y) =>
    x.probability > y.probability ? x : y
  );
  if (aMax.personId !== bMax.personId) return aMax.personId - bMax.personId;
  return a.designator.localeCompare(b.designator);
});

// ── Float animation (deterministic per device) ───────────
function floatStyle(i: number): React.CSSProperties {
  const h = ((i * 137 + 43) % 100) / 100;
  return {
    "--dx1": `${(h * 6 - 3).toFixed(1)}px`,
    "--dy1": `${(h * -8 + 4).toFixed(1)}px`,
    "--dx2": `${(h * -4 + 2).toFixed(1)}px`,
    "--dy2": `${(h * 5 - 2.5).toFixed(1)}px`,
    "--dx3": `${(h * 7 - 3.5).toFixed(1)}px`,
    "--dy3": `${(h * -3 + 1.5).toFixed(1)}px`,
    animation: `device-float ${(4 + h * 5).toFixed(1)}s ${(h * 3).toFixed(1)}s ease-in-out infinite`,
  } as React.CSSProperties;
}

export function AnalysisViz() {
  return (
    <section id="analysis" className="section-accent bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Analysis Output
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Device Attribution in Action
          </h2>
          <p className="text-base text-muted-foreground">
            Signal Scout correlates multi-protocol signals to identify device
            ownership through spatiotemporal clustering analysis.
          </p>
        </div>

        <div className="bracket-corners mx-auto max-w-5xl border border-border/40 bg-background/50">
          {/* ── Top status bar ──────────────────────────── */}
          <div className="flex items-center justify-between border-b border-border/30 px-5 py-2.5">
            <div className="flex items-center gap-3">
              <div
                className="h-2 w-2 rounded-full bg-emerald-500"
                style={{ animation: "signal-pulse 2s ease-in-out infinite" }}
              />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Ownership Analysis
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-mono text-[11px] text-muted-foreground">
                THRESHOLD: {Math.round(ATTRIB_THRESHOLD * 100)}%
              </span>
              <span className="font-mono text-xs text-primary">
                CLUSTERING COMPLETE
              </span>
            </div>
          </div>

          {/* ── SVG Network Graph ──────────────────────── */}
          <div className="relative overflow-hidden px-2 py-4 sm:px-4 sm:py-6">
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter
                  id="nodeGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter
                  id="lineGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Secondary / cross-attribution edges */}
              {displayEdges
                .filter((e) => !e.isPrimary)
                .map((edge, i) => (
                  <line
                    key={edge.key}
                    x1={edge.dx}
                    y1={edge.dy}
                    x2={edge.px}
                    y2={edge.py}
                    stroke="hsl(215 20% 35%)"
                    strokeWidth="1"
                    strokeDasharray="6 8"
                    opacity={0.35}
                    style={{
                      animation: `connection-pulse ${3 + (i % 3)}s ${i * 0.3}s ease-in-out infinite`,
                      "--base-opacity": "0.2",
                      "--peak-opacity": "0.4",
                    } as React.CSSProperties}
                  />
                ))}

              {/* Primary attribution edges */}
              {displayEdges
                .filter((e) => e.isPrimary)
                .map((edge, i) => (
                  <line
                    key={edge.key}
                    x1={edge.dx}
                    y1={edge.dy}
                    x2={edge.px}
                    y2={edge.py}
                    stroke={edge.color}
                    strokeWidth={2}
                    opacity={edge.probability * 0.7}
                    filter="url(#lineGlow)"
                    style={{
                      animation: `connection-pulse ${2.5 + (i % 4) * 0.5}s ${i * 0.15}s ease-in-out infinite`,
                      "--base-opacity": `${edge.probability * 0.5}`,
                      "--peak-opacity": `${edge.probability * 0.8}`,
                    } as React.CSSProperties}
                  />
                ))}

              {/* Edge probability labels */}
              {displayEdges.map((edge) => {
                const mx = (edge.dx + edge.px) / 2;
                const my = (edge.dy + edge.py) / 2;
                const pct = `${Math.round(edge.probability * 100)}%`;
                const w = pct.length * 7.5 + 10;
                return (
                  <g key={`lbl-${edge.key}`}>
                    <rect
                      x={mx - w / 2}
                      y={my - 16}
                      width={w}
                      height={17}
                      rx={2}
                      fill="hsl(225 30% 5%)"
                      opacity={0.9}
                    />
                    <text
                      x={mx}
                      y={my - 4}
                      textAnchor="middle"
                      fill={
                        edge.isPrimary ? edge.color : "hsl(215 20% 50%)"
                      }
                      fontSize={edge.isPrimary ? "11" : "9"}
                      fontFamily="var(--font-geist-mono)"
                      fontWeight={edge.isPrimary ? "bold" : "normal"}
                    >
                      {pct}
                    </text>
                  </g>
                );
              })}

              {/* Person glow rings */}
              {persons.map((person) => (
                <circle
                  key={`glow-${person.id}`}
                  cx={person.x}
                  cy={person.y}
                  r="28"
                  fill="none"
                  stroke="hsl(187 78% 46%)"
                  strokeWidth="1"
                  opacity="0.2"
                  style={{
                    animation: `node-glow ${3 + person.id * 0.4}s ease-in-out infinite`,
                    "--r-min": 26,
                    "--r-max": 34,
                  } as React.CSSProperties}
                />
              ))}

              {/* Person nodes */}
              {persons.map((person) => (
                <g key={`person-${person.id}`}>
                  <circle
                    cx={person.x}
                    cy={person.y}
                    r="22"
                    fill="hsl(225 30% 10%)"
                    stroke="hsl(187 78% 46%)"
                    strokeWidth={person.id === 0 ? 1.5 : 2}
                    opacity={person.id === 0 ? 0.7 : 0.95}
                    filter="url(#nodeGlow)"
                  />
                  <text
                    x={person.x}
                    y={person.y + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="hsl(187 78% 56%)"
                    fontSize="15"
                    fontFamily="var(--font-geist-mono)"
                    fontWeight="bold"
                  >
                    P{person.id}
                  </text>
                </g>
              ))}

              {/* Attributed device nodes */}
              {attributed.map((device, i) => {
                const color = typeColors[device.type];
                return (
                  <g key={`dev-${device.designator}`} style={floatStyle(i)}>
                    <circle
                      cx={device.x}
                      cy={device.y}
                      r="18"
                      fill="hsl(225 30% 8%)"
                      stroke={color}
                      strokeWidth="1.5"
                      opacity={0.9}
                    />
                    <text
                      x={device.x}
                      y={device.y + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={color}
                      fontSize="11"
                      fontFamily="var(--font-geist-mono)"
                      fontWeight="bold"
                    >
                      {device.designator}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ── Device Registry Table ──────────────────── */}
          <div className="border-t border-border/30">
            <div className="flex items-center justify-between border-b border-border/20 px-5 py-2.5">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Device Registry
              </span>
              <span className="font-mono text-[11px] text-muted-foreground/80">
                {positionedDevices.length} DEVICES CATALOGED
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="whitespace-nowrap px-5 py-2 font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                      ID
                    </th>
                    <th className="whitespace-nowrap px-3 py-2 font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                      Type
                    </th>
                    <th className="px-3 py-2 font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                      Description
                    </th>
                    <th className="px-3 py-2 font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                      Last Seen
                    </th>
                    <th className="px-3 py-2 font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                      Attribution
                    </th>
                    <th className="whitespace-nowrap px-3 py-2 text-right font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableDevices.map((device) => {
                    const sortedEdges = [...device.edges].sort(
                      (a, b) => b.probability - a.probability
                    );
                    return (
                      <tr
                        key={device.designator}
                        className={`border-b border-border/10 transition-colors hover:bg-primary/[0.03] ${
                          !device.attributed
                            ? "border-l-2 border-l-amber-500/40 bg-amber-500/[0.02]"
                            : ""
                        }`}
                      >
                        {/* Designator */}
                        <td className="whitespace-nowrap px-5 py-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className="block h-1.5 w-1.5 rounded-full"
                              style={{
                                backgroundColor: typeColors[device.type],
                              }}
                            />
                            <span
                              className="font-mono text-xs font-bold"
                              style={{ color: typeColors[device.type] }}
                            >
                              {device.designator}
                            </span>
                          </div>
                        </td>

                        {/* Protocol */}
                        <td className="whitespace-nowrap px-3 py-1.5 font-mono text-[11px] text-muted-foreground/80">
                          {typeLabels[device.type]}
                        </td>

                        {/* Description */}
                        <td className="px-3 py-1.5 font-mono text-xs text-foreground/80">
                          {device.description}
                        </td>

                        {/* Last Seen */}
                        <td className="whitespace-nowrap px-3 py-1.5 font-mono text-[11px] text-foreground/70">
                          {device.lastSeen}
                        </td>

                        {/* Attribution */}
                        <td className="px-3 py-1.5">
                          <div className="flex flex-wrap items-center gap-x-1">
                            {sortedEdges.map((edge, i) => (
                              <span
                                key={edge.personId}
                                className="flex items-center"
                              >
                                {i > 0 && (
                                  <span className="mx-1 text-[10px] text-muted-foreground/50">
                                    /
                                  </span>
                                )}
                                <span
                                  className={`font-mono text-xs ${
                                    i === 0 && device.attributed
                                      ? "font-bold text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  P{edge.personId}
                                </span>
                                <span
                                  className={`ml-1 font-mono text-[11px] ${
                                    i === 0 && device.attributed
                                      ? "text-primary/70"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {Math.round(edge.probability * 100)}%
                                </span>
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="whitespace-nowrap px-3 py-1.5 text-right">
                          {device.attributed ? (
                            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-500/70">
                              <span className="block h-1 w-1 rounded-full bg-emerald-500/70" />
                              Attributed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-amber-400/70">
                              <span className="block h-1 w-1 rounded-full bg-amber-400/70" />
                              Unresolved
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Bottom stats bar ───────────────────────── */}
          <div className="flex flex-wrap items-center justify-between gap-y-2 border-t border-border/30 px-5 py-3">
            <div className="flex flex-wrap gap-x-8 gap-y-1">
              {[
                {
                  label: "Subjects",
                  value: String(persons.length),
                  color: "text-primary",
                },
                {
                  label: "Devices",
                  value: String(positionedDevices.length),
                  color: "text-primary",
                },
                {
                  label: "Attributed",
                  value: String(attributed.length),
                  color: "text-primary",
                },
                {
                  label: "Unresolved",
                  value: String(
                    positionedDevices.length - attributed.length
                  ),
                  color: "text-amber-400",
                },
                {
                  label: "Threshold",
                  value: `${Math.round(ATTRIB_THRESHOLD * 100)}%`,
                  color: "text-primary",
                },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </span>
                  <span
                    className={`font-mono text-xs font-medium ${stat.color}`}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {Object.entries(typeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <span
                    className="block h-2 w-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {typeLabels[type]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
