import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Signal Scout — Passive Signal Intelligence Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(145deg, #060b14 0%, #0a1220 50%, #0d1a2a 100%)",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(34,184,207,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,184,207,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: 2,
            display: "flex",
            background: "linear-gradient(90deg, transparent, #22b8cf, transparent)",
          }}
        />

        {/* Signal icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 32 32">
            <g transform="translate(16,16)">
              <path
                d="M-4,-10 A11,11 0 0,1 4,-10"
                fill="none"
                stroke="#22b8cf"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M-6,-13 A15,15 0 0,1 6,-13"
                fill="none"
                stroke="#22b8cf"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.4"
              />
              <path
                d="M-8,-15.5 A19,19 0 0,1 8,-15.5"
                fill="none"
                stroke="#22b8cf"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.25"
              />
              <circle r="3.5" fill="#22b8cf" />
            </g>
          </svg>
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.25em",
              color: "rgba(34,184,207,0.6)",
              textTransform: "uppercase",
            }}
          >
            Nervous Energy, LLC
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#d4dae4",
            margin: 0,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Signal Scout
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: 22,
            color: "rgba(34,184,207,0.8)",
            margin: "20px 0 0 0",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Passive Signal Intelligence Platform
        </p>

        {/* Protocol badges */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          {["WiFi", "Bluetooth", "Cellular", "TPMS", "IoT"].map(
            (protocol) => (
              <div
                key={protocol}
                style={{
                  padding: "6px 16px",
                  border: "1px solid rgba(34,184,207,0.25)",
                  borderRadius: 4,
                  fontSize: 13,
                  color: "rgba(34,184,207,0.7)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                {protocol}
              </div>
            ),
          )}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22b8cf",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: "rgba(212,218,228,0.4)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            scout.nervous-energy.com
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
