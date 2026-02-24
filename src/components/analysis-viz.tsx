/* ─────────────────────────────────────────────────────────
   Device Ownership Network Graph + Registry Table

   Interactive force-directed graph (d3-force) with draggable
   nodes. Shows attributed devices clustered around person
   nodes with probability-labeled edges. The table below
   maps short designators to descriptions and attributions.
   ───────────────────────────────────────────────────────── */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
  forceX,
  forceY,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";

const SVG_W = 960;
const SVG_H = 750;
const ATTRIB_THRESHOLD = 0.55;

// ── Type metadata ────────────────────────────────────────
const typeColors: Record<string, string> = {
  bt: "#38bdf8",
  wifi: "#2dd4bf",
  tpms: "#f59e0b",
  cell: "#a78bfa",
};
const typeLabels: Record<string, string> = {
  bt: "BT",
  wifi: "WiFi",
  tpms: "TPMS",
  cell: "IMSI",
};

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
}

const deviceSpecs: DeviceSpec[] = [
  // P0
  { designator: "B01", description: "Unknown BT Device", type: "bt",
    lastSeen: "Portland, OR",
    edges: [{ personId: 0, probability: 0.62 }] },
  // P1
  { designator: "W01", description: "Apple iPhone 15 Pro", type: "wifi",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 1, probability: 0.87 }] },
  { designator: "T01", description: "2022 Toyota Camry", type: "tpms",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 1, probability: 0.82 }] },
  // P2
  { designator: "B02", description: "Apple AirPods Pro (2nd Gen)", type: "bt",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 2, probability: 0.91 }] },
  { designator: "W02", description: "Samsung Galaxy S24", type: "wifi",
    lastSeen: "Seattle, WA",
    edges: [{ personId: 2, probability: 0.78 }, { personId: 3, probability: 0.22 }] },
  { designator: "I01", description: "T-Mobile Prepaid SIM", type: "cell",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 2, probability: 0.85 }] },
  // P3
  { designator: "W03", description: "Apple MacBook Pro", type: "wifi",
    lastSeen: "Denver, CO",
    edges: [{ personId: 3, probability: 0.89 }] },
  { designator: "B03", description: "Garmin Forerunner 255", type: "bt",
    lastSeen: "Seattle, WA",
    edges: [{ personId: 3, probability: 0.76 }, { personId: 1, probability: 0.21 }] },
  { designator: "T02", description: "2023 Ford F-150", type: "tpms",
    lastSeen: "Denver, CO",
    edges: [{ personId: 3, probability: 0.92 }] },
  // P4
  { designator: "W04", description: "Google Pixel 8 Pro", type: "wifi",
    lastSeen: "Seattle, WA",
    edges: [{ personId: 4, probability: 0.88 }] },
  { designator: "B04", description: "Apple Watch Ultra 2", type: "bt",
    lastSeen: "Seattle, WA",
    edges: [{ personId: 4, probability: 0.83 }] },
  { designator: "T03", description: "2021 Honda Civic", type: "tpms",
    lastSeen: "Seattle, WA",
    edges: [{ personId: 4, probability: 0.79 }] },
  // P5
  { designator: "I02", description: "AT&T Postpaid SIM", type: "cell",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 5, probability: 0.86 }] },
  { designator: "B05", description: "Samsung Galaxy Buds2 Pro", type: "bt",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 5, probability: 0.74 }, { personId: 0, probability: 0.23 }] },
  // P6
  { designator: "W05", description: "Apple iPad Air M2", type: "wifi",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 6, probability: 0.90 }] },
  { designator: "T04", description: "2024 Tesla Model 3", type: "tpms",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 6, probability: 0.77 }, { personId: 4, probability: 0.20 }] },
  { designator: "I03", description: "Verizon Prepaid SIM", type: "cell",
    lastSeen: "Minneapolis, MN",
    edges: [{ personId: 6, probability: 0.85 }] },
  // Unattributed
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

// ── Build simulation data ────────────────────────────────
type NodeKind = "person" | "device";

interface GraphNode extends SimulationNodeDatum {
  id: string;
  kind: NodeKind;
  // Person fields
  personId?: number;
  // Device fields
  designator?: string;
  description?: string;
  deviceType?: "bt" | "wifi" | "tpms" | "cell";
  attributed?: boolean;
  lastSeen?: string;
  edges?: DeviceEdge[];
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  probability: number;
  isPrimary: boolean;
  color: string;
  sourceId: string;
  targetId: string;
}

// Initial person positions (spread around the SVG)
const personPositions: [number, number][] = [
  [480, 280], // P0
  [148, 155], // P1
  [810, 155], // P2
  [155, 440], // P3
  [820, 430], // P4
  [420, 85],  // P5
  [550, 460], // P6
];

function buildGraphData() {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // Person nodes
  for (let i = 0; i < 7; i++) {
    nodes.push({
      id: `P${i}`,
      kind: "person",
      personId: i,
      x: personPositions[i][0],
      y: personPositions[i][1],
    });
  }

  // Device nodes + links
  for (const spec of deviceSpecs) {
    const maxEdge = spec.edges.reduce((a, b) =>
      a.probability > b.probability ? a : b
    );
    const attributed = maxEdge.probability >= ATTRIB_THRESHOLD;

    // Position device near its primary person
    const primaryPerson = personPositions[maxEdge.personId];
    const angle = Math.random() * Math.PI * 2;
    const dist = 130 + Math.random() * 50;

    nodes.push({
      id: spec.designator,
      kind: "device",
      designator: spec.designator,
      description: spec.description,
      deviceType: spec.type,
      attributed,
      lastSeen: spec.lastSeen,
      edges: spec.edges,
      x: primaryPerson[0] + Math.cos(angle) * dist,
      y: primaryPerson[1] + Math.sin(angle) * dist,
    });

    // Only create links for attributed devices
    if (attributed) {
      const maxProb = Math.max(...spec.edges.map((e) => e.probability));
      for (const edge of spec.edges) {
        links.push({
          source: spec.designator,
          sourceId: spec.designator,
          target: `P${edge.personId}`,
          targetId: `P${edge.personId}`,
          probability: edge.probability,
          isPrimary: edge.probability === maxProb,
          color: typeColors[spec.type],
        });
      }
    }
  }

  return { nodes, links };
}

// ── Table data (sorted) ─────────────────────────────────
const tableDevices = [...deviceSpecs]
  .map((spec) => {
    const maxEdge = spec.edges.reduce((a, b) =>
      a.probability > b.probability ? a : b
    );
    return {
      ...spec,
      attributed: maxEdge.probability >= ATTRIB_THRESHOLD,
      primaryPersonId: maxEdge.personId,
    };
  })
  .sort((a, b) => {
    if (a.attributed !== b.attributed) return a.attributed ? -1 : 1;
    if (a.primaryPersonId !== b.primaryPersonId)
      return a.primaryPersonId - b.primaryPersonId;
    return a.designator.localeCompare(b.designator);
  });

const attributedCount = tableDevices.filter((d) => d.attributed).length;

// ── Component ────────────────────────────────────────────
export function AnalysisViz() {
  const svgRef = useRef<SVGSVGElement>(null);
  const simRef = useRef<ReturnType<typeof forceSimulation<GraphNode>> | null>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const dragOffset = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });

  // Initialize simulation
  useEffect(() => {
    const { nodes: initNodes, links: initLinks } = buildGraphData();

    const sim = forceSimulation<GraphNode>(initNodes)
      .force(
        "link",
        forceLink<GraphNode, GraphLink>(initLinks)
          .id((d) => d.id)
          .distance((d) => {
            // Shorter links for higher probability = tighter clustering
            const base = d.isPrimary ? 180 : 300;
            return base * (1.5 - d.probability);
          })
          .strength((d) => (d.isPrimary ? 0.8 : 0.15))
      )
      .force("charge", forceManyBody<GraphNode>().strength((d) => (d.kind === "person" ? -400 : -60)))
      .force("collide", forceCollide<GraphNode>().radius((d) => (d.kind === "person" ? 34 : 26)).strength(0.8))
      .force("x", forceX<GraphNode>(SVG_W / 2).strength(0.03))
      .force("y", forceY<GraphNode>(SVG_H / 2).strength(0.03))
      .alphaDecay(0.02)
      .velocityDecay(0.35)
      .on("tick", () => {
        // Clamp nodes within SVG bounds
        for (const n of initNodes) {
          const r = n.kind === "person" ? 24 : 20;
          n.x = Math.max(r, Math.min(SVG_W - r, n.x!));
          n.y = Math.max(r, Math.min(SVG_H - r, n.y!));
        }
        setNodes([...initNodes]);
        setLinks([...initLinks]);
      });

    // Warm-start: run simulation silently for a bit to stabilize
    for (let i = 0; i < 150; i++) sim.tick();

    simRef.current = sim;

    return () => {
      sim.stop();
    };
  }, []);

  // SVG coordinate conversion
  const svgPoint = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const transformed = pt.matrixTransform(svg.getScreenCTM()!.inverse());
      return { x: transformed.x, y: transformed.y };
    },
    []
  );

  const handlePointerDown = useCallback(
    (nodeId: string, e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as Element).setPointerCapture(e.pointerId);
      const sim = simRef.current;
      if (!sim) return;
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;
      const svgP = svgPoint(e.clientX, e.clientY);
      dragOffset.current = { dx: node.x! - svgP.x, dy: node.y! - svgP.y };
      node.fx = node.x;
      node.fy = node.y;
      sim.alphaTarget(0.3).restart();
      setDragging(nodeId);
    },
    [nodes, svgPoint]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const sim = simRef.current;
      if (!sim) return;
      const node = sim.nodes().find((n) => n.id === dragging);
      if (!node) return;
      const svgP = svgPoint(e.clientX, e.clientY);
      node.fx = svgP.x + dragOffset.current.dx;
      node.fy = svgP.y + dragOffset.current.dy;
    },
    [dragging, svgPoint]
  );

  const handlePointerUp = useCallback(() => {
    if (!dragging) return;
    const sim = simRef.current;
    if (!sim) return;
    const node = sim.nodes().find((n) => n.id === dragging);
    if (node) {
      node.fx = null;
      node.fy = null;
    }
    sim.alphaTarget(0);
    setDragging(null);
  }, [dragging]);

  // Helpers to extract link source/target positions
  const linkX = (end: string | number | GraphNode) =>
    typeof end === "object" ? end.x! : 0;
  const linkY = (end: string | number | GraphNode) =>
    typeof end === "object" ? end.y! : 0;

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

          {/* ── SVG Force-Directed Graph ──────────────── */}
          <div className="relative overflow-hidden px-2 py-4 sm:px-4 sm:py-6">
            <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
              Drag nodes to explore relationships
            </p>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full select-none"
              preserveAspectRatio="xMidYMid meet"
              style={{ cursor: dragging ? "grabbing" : "default" }}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <defs>
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Secondary / cross-attribution edges */}
              {links
                .filter((l) => !l.isPrimary)
                .map((link) => (
                  <line
                    key={`${link.sourceId}-${link.targetId}`}
                    x1={linkX(link.source)}
                    y1={linkY(link.source)}
                    x2={linkX(link.target)}
                    y2={linkY(link.target)}
                    stroke="hsl(215 20% 50%)"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    opacity={0.5}
                  />
                ))}

              {/* Primary attribution edges */}
              {links
                .filter((l) => l.isPrimary)
                .map((link) => (
                  <line
                    key={`${link.sourceId}-${link.targetId}`}
                    x1={linkX(link.source)}
                    y1={linkY(link.source)}
                    x2={linkX(link.target)}
                    y2={linkY(link.target)}
                    stroke={link.color}
                    strokeWidth={2.5}
                    opacity={0.4 + link.probability * 0.5}
                    filter="url(#lineGlow)"
                  />
                ))}

              {/* Edge probability labels */}
              {links.map((link) => {
                const sx = linkX(link.source);
                const sy = linkY(link.source);
                const tx = linkX(link.target);
                const ty = linkY(link.target);
                const mx = (sx + tx) / 2;
                const my = (sy + ty) / 2;
                const pct = `${Math.round(link.probability * 100)}%`;
                const w = pct.length * 7.5 + 10;
                return (
                  <g key={`lbl-${link.sourceId}-${link.targetId}`}>
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
                      fill={link.isPrimary ? link.color : "hsl(215 20% 50%)"}
                      fontSize={link.isPrimary ? "11" : "9"}
                      fontFamily="var(--font-geist-mono)"
                      fontWeight={link.isPrimary ? "bold" : "normal"}
                    >
                      {pct}
                    </text>
                  </g>
                );
              })}

              {/* Person glow rings */}
              {nodes
                .filter((n) => n.kind === "person")
                .map((node) => (
                  <circle
                    key={`glow-${node.id}`}
                    cx={node.x}
                    cy={node.y}
                    r="28"
                    fill="none"
                    stroke="hsl(187 78% 46%)"
                    strokeWidth="1"
                    opacity="0.2"
                  />
                ))}

              {/* Person nodes */}
              {nodes
                .filter((n) => n.kind === "person")
                .map((node) => (
                  <g
                    key={node.id}
                    style={{ cursor: "grab" }}
                    onPointerDown={(e) => handlePointerDown(node.id, e)}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="22"
                      fill="hsl(225 30% 10%)"
                      stroke="hsl(187 78% 46%)"
                      strokeWidth={node.personId === 0 ? 1.5 : 2}
                      opacity={node.personId === 0 ? 0.7 : 0.95}
                      filter="url(#nodeGlow)"
                    />
                    <text
                      x={node.x}
                      y={(node.y ?? 0) + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="hsl(187 78% 56%)"
                      fontSize="15"
                      fontFamily="var(--font-geist-mono)"
                      fontWeight="bold"
                      pointerEvents="none"
                    >
                      {node.id}
                    </text>
                  </g>
                ))}

              {/* Attributed device nodes */}
              {nodes
                .filter((n) => n.kind === "device" && n.attributed)
                .map((node) => {
                  const color = typeColors[node.deviceType!];
                  return (
                    <g
                      key={node.id}
                      style={{ cursor: "grab" }}
                      onPointerDown={(e) => handlePointerDown(node.id, e)}
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="18"
                        fill="hsl(225 30% 8%)"
                        stroke={color}
                        strokeWidth="1.5"
                        opacity={0.9}
                      />
                      <text
                        x={node.x}
                        y={(node.y ?? 0) + 1}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={color}
                        fontSize="11"
                        fontFamily="var(--font-geist-mono)"
                        fontWeight="bold"
                        pointerEvents="none"
                      >
                        {node.designator}
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
                {deviceSpecs.length} DEVICES CATALOGED
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
                        <td className="whitespace-nowrap px-5 py-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className="block h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: typeColors[device.type] }}
                            />
                            <span
                              className="font-mono text-xs font-bold"
                              style={{ color: typeColors[device.type] }}
                            >
                              {device.designator}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-1.5 font-mono text-[11px] text-muted-foreground/80">
                          {typeLabels[device.type]}
                        </td>
                        <td className="px-3 py-1.5 font-mono text-xs text-foreground/80">
                          {device.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-1.5 font-mono text-[11px] text-foreground/70">
                          {device.lastSeen}
                        </td>
                        <td className="px-3 py-1.5">
                          <div className="flex flex-wrap items-center gap-x-1">
                            {sortedEdges.map((edge, i) => (
                              <span key={edge.personId} className="flex items-center">
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
                { label: "Subjects", value: "7", color: "text-primary" },
                { label: "Devices", value: String(deviceSpecs.length), color: "text-primary" },
                { label: "Attributed", value: String(attributedCount), color: "text-primary" },
                { label: "Unresolved", value: String(deviceSpecs.length - attributedCount), color: "text-amber-400" },
                { label: "Threshold", value: `${Math.round(ATTRIB_THRESHOLD * 100)}%`, color: "text-primary" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </span>
                  <span className={`font-mono text-xs font-medium ${stat.color}`}>
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
