import { useState } from "react";
import FlyGuide from "./guides/PotomacShenandoah/FlyGuide.jsx";
import MoorefieldFlyGuide from "./guides/Moorefield/MoorefieldFlyGuide.jsx";

const BAR = "#2B3A2E";       // dark forest/gorge — matches guide palette
const ACTIVE = "#C9943A";    // amber active indicator
const TEXT = "#F4EFE4";      // limestone cream text
const BAR_HEIGHT = 52;

const TABS = [
  { key: "moorefield", label: "Moorefield / South Branch", Guide: MoorefieldFlyGuide },
  { key: "potomac", label: "Potomac & Shenandoah", Guide: FlyGuide },
];

export default function App() {
  // Default to the Moorefield guide on load.
  const [active, setActive] = useState("moorefield");

  const ActiveGuide = TABS.find((t) => t.key === active).Guide;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: BAR_HEIGHT,
          display: "flex",
          background: BAR,
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        {TABS.map(({ key, label }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              style={{
                flex: 1,
                height: "100%",
                border: "none",
                background: "transparent",
                color: TEXT,
                fontSize: 14,
                fontWeight: isActive ? 700 : 500,
                letterSpacing: 0.2,
                cursor: "pointer",
                padding: "0 8px",
                opacity: isActive ? 1 : 0.7,
                borderBottom: isActive
                  ? `3px solid ${ACTIVE}`
                  : "3px solid transparent",
                transition: "opacity 0.15s ease",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {/* Spacer so fixed nav doesn't cover the guide content */}
      <div style={{ paddingTop: BAR_HEIGHT }}>
        <ActiveGuide />
      </div>

      <footer
        style={{
          textAlign: "center",
          fontSize: 11,
          fontFamily: "monospace",
          color: "#5C6B50",
          padding: 8,
          background: BAR,
        }}
      >
        Last deployed:{" "}
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </footer>
    </>
  );
}
