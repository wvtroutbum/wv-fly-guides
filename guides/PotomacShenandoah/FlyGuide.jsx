import { useState } from "react";

const OLIVE = "#4A5240";
const RIVER = "#2C4A3E";
const SAND = "#C8B89A";
const AMBER = "#B5722A";
const CREAM = "#F5F0E8";
const BARK = "#3D2B1F";
const RED = "#8B1A1A";
const MIST = "#E8EDE4";
const STEEL = "#6B7F6E";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@300;400;600&family=Source+Code+Pro:wght@400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .fg-root {
    font-family: 'Source Sans 3', sans-serif;
    background: ${BARK};
    min-height: 100vh;
    color: #222;
  }

  /* CONDITIONS BANNER */
  .fg-conditions {
    background: ${RIVER};
    color: ${CREAM};
    padding: 10px 20px;
    font-size: 12px;
    letter-spacing: 0.04em;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 20px;
    align-items: center;
    border-bottom: 2px solid ${AMBER};
  }
  .fg-conditions-label {
    font-family: 'Source Code Pro', monospace;
    font-weight: 600;
    color: ${SAND};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 10px;
  }
  .fg-cond-item {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .fg-cond-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: ${AMBER};
    flex-shrink: 0;
  }
  .fg-cond-dot.warn { background: ${RED}; }

  /* HERO */
  .fg-hero {
    background: linear-gradient(160deg, ${BARK} 0%, ${RIVER} 60%, ${OLIVE} 100%);
    padding: 48px 24px 36px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .fg-hero::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0; height: 60px;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,30 C200,0 400,60 600,30 C800,0 1000,60 1200,30 L1200,60 L0,60Z' fill='%23F5F0E8'/%3E%3C/svg%3E") bottom/cover no-repeat;
    opacity: 0.08;
  }
  .fg-eyebrow {
    font-family: 'Source Code Pro', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${SAND};
    margin-bottom: 12px;
  }
  .fg-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 7vw, 58px);
    font-weight: 900;
    color: ${CREAM};
    line-height: 1.1;
    margin-bottom: 10px;
  }
  .fg-hero h1 em {
    color: ${SAND};
    font-style: normal;
  }
  .fg-subtitle {
    color: ${MIST};
    font-size: 15px;
    font-weight: 300;
    margin-bottom: 28px;
    opacity: 0.85;
  }
  .fg-stats {
    display: flex;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
  }
  .fg-stat {
    text-align: center;
  }
  .fg-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: ${SAND};
    display: block;
  }
  .fg-stat-lbl {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${MIST};
    opacity: 0.7;
  }

  /* ALERT BOX */
  .fg-alert {
    background: #3D1212;
    border-left: 4px solid ${RED};
    margin: 0 16px 0;
    padding: 12px 16px;
    border-radius: 0 4px 4px 0;
  }
  .fg-alert-title {
    font-family: 'Source Code Pro', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #E57373;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .fg-alert p {
    font-size: 12px;
    color: #FFCDD2;
    line-height: 1.5;
  }
  .fg-alert a { color: #EF9A9A; }

  /* MAIN LAYOUT */
  .fg-body {
    background: ${CREAM};
    margin: 0 16px;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
  }

  /* TABS */
  .fg-tabs {
    display: flex;
    background: ${OLIVE};
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .fg-tabs::-webkit-scrollbar { display: none; }
  .fg-tab {
    padding: 13px 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${SAND};
    cursor: pointer;
    border: none;
    background: none;
    white-space: nowrap;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
    font-family: 'Source Sans 3', sans-serif;
  }
  .fg-tab:hover { color: ${CREAM}; background: rgba(255,255,255,0.06); }
  .fg-tab.active { color: ${CREAM}; border-bottom-color: ${AMBER}; background: rgba(255,255,255,0.08); }

  /* CONTENT */
  .fg-panel { padding: 24px 20px 32px; }

  /* SECTION HEADERS */
  .fg-section-head {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: ${RIVER};
    margin-bottom: 4px;
  }
  .fg-section-sub {
    font-size: 13px;
    color: ${STEEL};
    margin-bottom: 20px;
    font-weight: 300;
  }
  .fg-divider {
    border: none;
    border-top: 1px solid rgba(0,0,0,0.1);
    margin: 24px 0;
  }

  /* SCHEDULE TABLE */
  .fg-schedule { width: 100%; border-collapse: collapse; font-size: 13px; }
  .fg-schedule thead tr { background: ${OLIVE}; color: ${CREAM}; }
  .fg-schedule thead th { padding: 10px 12px; text-align: left; font-weight: 600; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }
  .fg-schedule tbody tr { border-bottom: 1px solid rgba(0,0,0,0.07); }
  .fg-schedule tbody tr:last-child { border: none; }
  .fg-schedule td { padding: 10px 12px; vertical-align: top; line-height: 1.4; }
  .fg-schedule td:first-child { font-family: 'Source Code Pro', monospace; font-size: 11px; color: ${AMBER}; white-space: nowrap; font-weight: 600; }
  .fg-schedule td:nth-child(2) { font-weight: 600; color: ${RIVER}; }
  .fg-highlight { background: rgba(181,114,42,0.08); }
  .fg-tip { font-size: 11px; color: ${STEEL}; font-style: italic; margin-top: 2px; }

  /* HATCH GRID */
  .fg-hatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
  .fg-hatch-card {
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 4px;
    padding: 14px;
    background: white;
  }
  .fg-hatch-name { font-weight: 700; font-size: 14px; color: ${RIVER}; margin-bottom: 2px; }
  .fg-hatch-latin { font-size: 11px; color: ${STEEL}; font-style: italic; margin-bottom: 8px; }
  .fg-hatch-detail { font-size: 12px; color: #444; line-height: 1.5; }
  .fg-hatch-window {
    display: inline-block;
    background: ${MIST};
    color: ${OLIVE};
    font-size: 10px;
    font-family: 'Source Code Pro', monospace;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 2px;
    margin-top: 6px;
    letter-spacing: 0.05em;
  }

  /* LEADER TABLE */
  .fg-leader { width: 100%; border-collapse: collapse; font-size: 13px; }
  .fg-leader thead tr { background: ${RIVER}; color: ${CREAM}; }
  .fg-leader thead th { padding: 9px 12px; text-align: left; font-weight: 600; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }
  .fg-leader tbody tr { border-bottom: 1px solid rgba(0,0,0,0.07); }
  .fg-leader tbody tr:last-child { border: none; }
  .fg-leader td { padding: 10px 12px; vertical-align: top; line-height: 1.4; }
  .fg-leader td:first-child { font-weight: 700; color: ${BARK}; }
  .fg-code { font-family: 'Source Code Pro', monospace; font-size: 11px; color: ${AMBER}; font-weight: 600; }

  /* SPOTS */
  .fg-spot-card {
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 16px;
    background: white;
  }
  .fg-spot-header {
    background: ${RIVER};
    color: ${CREAM};
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .fg-spot-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; }
  .fg-spot-meta { font-size: 11px; color: ${SAND}; margin-top: 3px; }
  .fg-spot-tag {
    font-size: 10px;
    font-family: 'Source Code Pro', monospace;
    font-weight: 600;
    letter-spacing: 0.08em;
    padding: 3px 8px;
    border-radius: 2px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .tag-public { background: rgba(72,160,72,0.25); color: #90EE90; }
  .tag-wade { background: rgba(181,114,42,0.3); color: ${SAND}; }
  .tag-access { background: rgba(100,140,200,0.3); color: #AACCFF; }
  .fg-spot-body { padding: 14px 16px; }
  .fg-spot-body p { font-size: 13px; line-height: 1.6; color: #444; margin-bottom: 10px; }
  .fg-spot-body p:last-child { margin-bottom: 0; }
  .fg-spot-warn {
    background: #FFF3CD;
    border-left: 3px solid #D4A017;
    padding: 8px 12px;
    font-size: 12px;
    color: #7A5200;
    border-radius: 0 3px 3px 0;
    margin-top: 8px;
  }
  .fg-spot-danger {
    background: #FFEBEB;
    border-left: 3px solid ${RED};
    padding: 8px 12px;
    font-size: 12px;
    color: #7A0000;
    border-radius: 0 3px 3px 0;
    margin-top: 8px;
  }

  /* REMINDERS */
  .fg-remind-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
  .fg-remind-card {
    background: white;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 4px;
    padding: 14px;
  }
  .fg-remind-icon { font-size: 20px; margin-bottom: 6px; }
  .fg-remind-title { font-weight: 700; font-size: 13px; color: ${RIVER}; margin-bottom: 6px; }
  .fg-remind-body { font-size: 12px; color: #555; line-height: 1.5; }
  .fg-remind-card.danger { border-color: ${RED}; background: #FFF8F8; }
  .fg-remind-card.danger .fg-remind-title { color: ${RED}; }

  /* FOOTER */
  .fg-footer {
    background: ${BARK};
    color: ${SAND};
    text-align: center;
    padding: 20px;
    font-size: 11px;
    letter-spacing: 0.06em;
    opacity: 0.8;
  }

  @media (max-width: 500px) {
    .fg-hero { padding: 36px 16px 28px; }
    .fg-body { margin: 0 8px; }
    .fg-panel { padding: 20px 14px 28px; }
    .fg-alert { margin: 0 8px 0; }
  }
`;

const SCHEDULE = [
  { time: "5:00–7:00", window: "Dawn", tactic: "Poppers & deer-hair bugs", note: "Work shallow banks and log jams before light; topwater action peaks in first 45 min", hot: true },
  { time: "7:00–9:30", window: "Morning", tactic: "Crayfish & Clouser Minnow", note: "Shift to sub-surface; chartreuse/white Clouser for stained Potomac water", hot: true },
  { time: "9:30–11:30", window: "Late morning", tactic: "Woolly Bugger / leech", note: "Drift pools and current seams; shade-holding fish on the Shenandoah forks", hot: false },
  { time: "11:30–14:00", window: "Midday grind", tactic: "Nymphs / helgramite", note: "Bounce bottom with extra weight in stained water. Overcast days can turn the bite on in minutes — keep a streamer rod rigged", hot: false },
  { time: "14:00–17:00", window: "Afternoon", tactic: "Watch sky; streamer if clouds build", note: "Afternoon cloud cover can flip the bite fast — chartreuse streamer, fast strips", hot: false },
  { time: "17:00–20:00", window: "Evening", tactic: "Topwater, sulphur dries", note: "Second-best topwater window; Trico/sulphur spinner falls on calmer pools", hot: true },
];

const HATCHES = [
  { name: "Trico", latin: "Tricorythodes spp.", time: "Dawn–9am", flies: "#22–26 Trico Spinner, CDC Trico", note: "Spinner falls on flat water; gentle presentation critical" },
  { name: "Sulphur / PMD", latin: "Ephemerella invaria", time: "Evening", flies: "#16–18 Parachute Sulphur, Comparadun", note: "Most consistent evening hatch through late June" },
  { name: "Caddis", latin: "Hydropsychidae", time: "Dusk", flies: "#14–16 Elk Hair Caddis, Soft Hackle", note: "Skitter dry across surface on the swing; great on the Shenandoah" },
  { name: "Baitfish", latin: "Various minnows", time: "Low light + overcast", flies: "#2–6 Clouser, chartreuse/white in stain", note: "Overcast afternoon can trigger violent surface feeds — keep streamer rod handy" },
  { name: "Crayfish", latin: "Orconectes spp.", time: "All day", flies: "#4–6 EP Crayfish, Clouser Craw", note: "Dominant food source in rocky Potomac runs; dead-drift, then strip" },
  { name: "Helgramite", latin: "Nigronia serricornis", time: "All day", flies: "#4–8 Black Woolly Bugger, Hellgrammite nymph", note: "Bounce bottom through fast riffles; add split shot in stained water" },
];

const LEADERS = [
  { condition: "Clear water, flat light", length: "12 ft", tippet: "4X–5X", flies: "Size 16–22 dries, Trico spinner", note: "Long leader, reach cast; 5X for wary fish" },
  { condition: "Stained water (current Potomac)", length: "7.5 ft", tippet: "2X–3X", flies: "Chartreuse/white Clouser, heavy nymph", note: "Bump up weight to reach bottom; chartreuse for visibility" },
  { condition: "Topwater / popper", length: "7 ft", tippet: "1X–2X", flies: "Deer hair bug, Gurgler", note: "Short, stiff leader turns over big flies cleanly" },
  { condition: "Evening spinner fall", length: "14–16 ft", tippet: "5X–6X", flies: "Trico/Sulphur spinner", note: "Feed slacker water; 6X mono in total calm" },
  { condition: "Streamer / cloudy afternoon", length: "6 ft", tippet: "0X–1X", flies: "Clouser, Woolly Bugger", note: "Fast strips; leader shock-absorbs aggressive takes" },
];

const SPOTS = [
  {
    name: "Shepherdstown Bypass Riffle",
    river: "Potomac",
    tags: [{ label: "Public Access", cls: "tag-public" }, { label: "Wading", cls: "tag-wade" }],
    desc: "Classic riffle-pool sequence below the old low-water bridge. Rocky substrate holds smallmouth in slots behind boulders. MD DNR supplemental smallmouth stocking has been active here — expect mixed wild and holdover fish. Current conditions: low and clear with light stain, upper 70s°F.",
    warn: "Stained water this week — go chartreuse/white on Clousers, add weight to reach bottom.",
    snakehead: true,
  },
  {
    name: "Dargan Bend / Keep Tryst Rd",
    river: "Potomac",
    tags: [{ label: "Public Access", cls: "tag-public" }, { label: "Wading / Canoe", cls: "tag-wade" }],
    desc: "A long, productive bend with excellent wade access off Keep Tryst Road. Deep run on the Maryland side holds trophy smallmouth. Active MD DNR restocking site. Early morning poppers in the shallows, then crayfish patterns in the channel.",
    warn: "Upper 70s°F water temp — focus on dawn window and shaded current. Midday fish stack in deeper, cooler slots.",
    snakehead: true,
  },
  {
    name: "North Fork Shenandoah — Woodstock",
    river: "North Fork Shenandoah",
    tags: [{ label: "Public Access", cls: "tag-public" }, { label: "Wading", cls: "tag-wade" }],
    desc: "Running low and clear with the classic summer pattern in full effect. Fish concentrate in early morning shaded current breaks and deep ledge pools. Excellent caddis activity at dusk. Access via VDGIF public fishing areas near Woodstock.",
    warn: null,
    hab: true,
  },
  {
    name: "South Fork Shenandoah — Front Royal",
    river: "South Fork Shenandoah",
    tags: [{ label: "Public / State Land", cls: "tag-public" }, { label: "Float-Friendly", cls: "tag-access" }],
    desc: "Low, fishable, and fishable. Summer pattern: active fish 5–9am and 5–8pm, near-dormant midday. Sulphur and caddis hatches reliable at dusk. Wade from gravel bars or float a canoe through the longer pools.",
    warn: null,
    hab: true,
  },
];

const REMINDERS = [
  { icon: "🌡️", title: "Water Temp Protocol", body: "Potomac running upper 70s°F. At 78°F+ smallmouth are stressed — release quickly, keep fish in water, stop targeting them above 80°F.", danger: false },
  { icon: "⚠️", title: "HAB Advisory — Shenandoah", body: "Harmful algal toxins (HABs) have triggered 50+ mile recreational advisories on the Shenandoah system in recent summers. Check SwimHealthyVA.com before wading. Rinse gear, don't swallow water.", danger: true },
  { icon: "🐟", title: "Northern Snakehead", body: "Invasive northern snakehead is now established in the upper Potomac. If caught, do not release. Report to MD DNR or VA DWR.", danger: true },
  { icon: "🪰", title: "Go-To Box", body: "Chartreuse/white Clouser #4, EP Crayfish #4, Trico spinner #22, Parachute Sulphur #16, black Woolly Bugger #6, Elk Hair Caddis #14.", danger: false },
  { icon: "☁️", title: "Overcast = Opportunity", body: "Afternoon cloud cover can flip the bite on in minutes. Keep a streamer rod rigged through the midday grind — when clouds roll in, switch fast.", danger: false },
  { icon: "🎣", title: "Wading Caution", body: "Potomac ledges are slick with algae at these temps. Felt soles or studs. Carry a wading staff on unfamiliar crossings. Never wade alone in unfamiliar spots.", danger: false },
  { icon: "📋", title: "License Check", body: "WV: saltwater endorsement not required for Potomac smallmouth. MD: standard freshwater license. VA: freshwater license for Shenandoah access.", danger: false },
  { icon: "🌅", title: "Late June Timing", body: "Two prime windows: dawn to 9:30am and 5pm to dark. Midday sun is brutal — rest under a tree, stay hydrated, fish harder when it gets cloudy.", danger: false },
];

const TABS = ["Schedule", "Hatches", "Leaders", "Spots", "Reminders"];

export default function FlyGuide() {
  const [tab, setTab] = useState(0);

  return (
    <div className="fg-root">
      <style>{styles}</style>

      {/* CONDITIONS BANNER */}
      <div className="fg-conditions">
        <span className="fg-conditions-label">Current Conditions</span>
        <div className="fg-cond-item"><div className="fg-cond-dot" /><span>Potomac: Low & clear, light stain · Upper 70s°F</span></div>
        <div className="fg-cond-item"><div className="fg-cond-dot" /><span>Shenandoah Forks: Low · Clear · Summer pattern</span></div>
        <div className="fg-cond-item"><div className="fg-cond-dot warn" /><span>HAB monitoring active — Shenandoah system</span></div>
        <div className="fg-cond-item"><div className="fg-cond-dot warn" /><span>Snakehead established — upper Potomac</span></div>
      </div>

      {/* HERO */}
      <div className="fg-hero">
        <div className="fg-eyebrow">Upper Potomac & Shenandoah Valley · Late June Field Guide</div>
        <h1>Smallmouth<br /><em>on the Fly</em></h1>
        <div className="fg-subtitle">West Virginia & Northern Virginia · Summer 2025</div>
        <div className="fg-stats">
          <div className="fg-stat"><span className="fg-stat-val">Upper 70s°F</span><span className="fg-stat-lbl">Water Temp</span></div>
          <div className="fg-stat"><span className="fg-stat-val">Low · Clear</span><span className="fg-stat-lbl">Potomac Level</span></div>
          <div className="fg-stat"><span className="fg-stat-val">Dawn / Dusk</span><span className="fg-stat-lbl">Prime Windows</span></div>
          <div className="fg-stat"><span className="fg-stat-val">4 Spots</span><span className="fg-stat-lbl">Access Points</span></div>
        </div>
      </div>

      {/* HAB ALERT */}
      <div className="fg-alert">
        <div className="fg-alert-title">⚠ Shenandoah HAB Advisory</div>
        <p>Harmful algal toxins have caused 50+ mile recreational advisories on the Shenandoah system. Check conditions before wading. Rinse waders and gear after each use. Visit <a href="https://www.swimhealthyva.com" target="_blank" rel="noreferrer">SwimHealthyVA.com</a> for current status.</p>
      </div>

      {/* BODY */}
      <div className="fg-body">
        <div className="fg-tabs">
          {TABS.map((t, i) => (
            <button key={t} className={`fg-tab${tab === i ? " active" : ""}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>

        <div className="fg-panel">

          {/* SCHEDULE */}
          {tab === 0 && (
            <>
              <div className="fg-section-head">Daily Schedule</div>
              <div className="fg-section-sub">Late June · Upper Potomac & Shenandoah · All times approximate</div>
              <div style={{ overflowX: "auto" }}>
                <table className="fg-schedule">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Window</th>
                      <th>Primary Tactic</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SCHEDULE.map((r, i) => (
                      <tr key={i} className={r.hot ? "fg-highlight" : ""}>
                        <td>{r.time}</td>
                        <td>{r.window}{r.hot && <div className="fg-tip">★ Prime window</div>}</td>
                        <td>{r.tactic}</td>
                        <td>{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <hr className="fg-divider" />
              <p style={{ fontSize: 12, color: STEEL, lineHeight: 1.6 }}>
                <strong>Water temp note:</strong> Potomac is in the upper 70s°F — smallmouth become stressed above 80°F. Prioritize the dawn window, release fish quickly in the net, and stop targeting them if temps spike further. The Shenandoah forks are running cooler; fish can be targeted through more of the day in shaded current.
              </p>
            </>
          )}

          {/* HATCHES */}
          {tab === 1 && (
            <>
              <div className="fg-section-head">Late June Hatches</div>
              <div className="fg-section-sub">Primary food sources and matching patterns</div>
              <div className="fg-hatch-grid">
                {HATCHES.map((h, i) => (
                  <div className="fg-hatch-card" key={i}>
                    <div className="fg-hatch-name">{h.name}</div>
                    <div className="fg-hatch-latin">{h.latin}</div>
                    <div className="fg-hatch-detail">{h.note}</div>
                    <div style={{ marginTop: 8 }}>
                      <span className="fg-hatch-window">{h.time}</span>
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, color: AMBER, fontWeight: 600 }}>{h.flies}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* LEADERS */}
          {tab === 2 && (
            <>
              <div className="fg-section-head">Leader & Tippet Guide</div>
              <div className="fg-section-sub">Match to conditions — current Potomac is stained, size up</div>
              <div style={{ overflowX: "auto" }}>
                <table className="fg-leader">
                  <thead>
                    <tr>
                      <th>Condition</th>
                      <th>Leader</th>
                      <th>Tippet</th>
                      <th>Flies</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LEADERS.map((r, i) => (
                      <tr key={i}>
                        <td>{r.condition}</td>
                        <td><span className="fg-code">{r.length}</span></td>
                        <td><span className="fg-code">{r.tippet}</span></td>
                        <td style={{ fontSize: 12 }}>{r.flies}</td>
                        <td style={{ fontSize: 12, color: STEEL }}>{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* SPOTS */}
          {tab === 3 && (
            <>
              <div className="fg-section-head">Access Points</div>
              <div className="fg-section-sub">Current conditions noted — all sites public access</div>
              {SPOTS.map((s, i) => (
                <div className="fg-spot-card" key={i}>
                  <div className="fg-spot-header">
                    <div>
                      <div className="fg-spot-name">{s.name}</div>
                      <div className="fg-spot-meta">{s.river}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                      {s.tags.map((t, j) => <span key={j} className={`fg-spot-tag ${t.cls}`}>{t.label}</span>)}
                    </div>
                  </div>
                  <div className="fg-spot-body">
                    <p>{s.desc}</p>
                    {s.warn && <div className="fg-spot-warn">⚠ {s.warn}</div>}
                    {s.hab && (
                      <div className="fg-spot-danger">
                        🚨 <strong>HAB Advisory:</strong> Harmful algal toxins have been detected in the Shenandoah system. Check <a href="https://www.swimhealthyva.com" target="_blank" rel="noreferrer">SwimHealthyVA.com</a> before wading. Rinse all gear after use.
                      </div>
                    )}
                    {s.snakehead && (
                      <div className="fg-spot-danger" style={{ marginTop: s.warn ? 6 : 8 }}>
                        🐟 <strong>Northern Snakehead:</strong> Invasive species now established in upper Potomac. Do not release if caught — report to MD DNR or VA DWR.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* REMINDERS */}
          {tab === 4 && (
            <>
              <div className="fg-section-head">Late June Reminders</div>
              <div className="fg-section-sub">Safety, regulations, and gear checklist</div>
              <div className="fg-remind-grid">
                {REMINDERS.map((r, i) => (
                  <div className={`fg-remind-card${r.danger ? " danger" : ""}`} key={i}>
                    <div className="fg-remind-icon">{r.icon}</div>
                    <div className="fg-remind-title">{r.title}</div>
                    <div className="fg-remind-body">{r.body}</div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      <div className="fg-footer">
        Mountaineer Maker · Ranson, WV · Built for the upper Potomac & Shenandoah Valley
      </div>
    </div>
  );
}
