import { useState } from "react";

// Palette — WV highlands: slate gorge, limestone cream, gold, forest ridge
const GORGE   = "#2B3A2E";   // deep forest/gorge green
const SLATE   = "#3D4F55";   // river slate
const LIMESTONE = "#F4EFE4"; // pale limestone cream
const GOLD    = "#B8860B";   // dark goldenrod
const BARK    = "#2A1F14";   // dark bark
const MOSS    = "#5C6B50";   // ridge moss
const MIST    = "#E4EBE6";   // mountain mist
const RUST    = "#8B3A1A";   // autumn rust
const AMBER   = "#C9943A";   // amber
const STEEL   = "#7A8C82";   // river steel

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;600&family=Source+Code+Pro:wght@400;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

.mg-root{
  font-family:'Source Sans 3',sans-serif;
  background:${BARK};
  min-height:100vh;
  color:#222;
}

/* HEADER BAND */
.mg-band{
  background:${GORGE};
  color:${LIMESTONE};
  padding:9px 18px;
  font-size:11px;
  letter-spacing:.05em;
  display:flex;
  flex-wrap:wrap;
  gap:5px 18px;
  align-items:center;
  border-bottom:2px solid ${GOLD};
}
.mg-band-label{
  font-family:'Source Code Pro',monospace;
  font-weight:600;
  color:${AMBER};
  text-transform:uppercase;
  letter-spacing:.1em;
  font-size:10px;
}
.mg-band-item{display:flex;gap:6px;align-items:center;}
.mg-dot{width:6px;height:6px;border-radius:50%;background:${AMBER};flex-shrink:0;}
.mg-dot.note{background:${GOLD};}

/* HERO */
.mg-hero{
  background:linear-gradient(150deg,${BARK} 0%,${GORGE} 55%,${SLATE} 100%);
  padding:52px 24px 40px;
  text-align:center;
  position:relative;
  overflow:hidden;
}
.mg-hero::after{
  content:'';
  position:absolute;
  bottom:0;left:0;right:0;height:50px;
  background:${LIMESTONE};
  clip-path:ellipse(55% 100% at 50% 100%);
  opacity:.06;
}
.mg-eyebrow{
  font-family:'Source Code Pro',monospace;
  font-size:10px;
  letter-spacing:.16em;
  text-transform:uppercase;
  color:${AMBER};
  margin-bottom:14px;
}
.mg-hero h1{
  font-family:'Playfair Display',serif;
  font-size:clamp(30px,7vw,56px);
  font-weight:900;
  color:${LIMESTONE};
  line-height:1.1;
  margin-bottom:8px;
}
.mg-hero h1 em{color:${AMBER};font-style:italic;}
.mg-subtitle{
  color:${MIST};
  font-size:14px;
  font-weight:300;
  margin-bottom:28px;
  opacity:.85;
}
.mg-stats{display:flex;justify-content:center;gap:28px;flex-wrap:wrap;}
.mg-stat{text-align:center;}
.mg-stat-val{
  font-family:'Playfair Display',serif;
  font-size:20px;
  font-weight:700;
  color:${AMBER};
  display:block;
}
.mg-stat-lbl{
  font-size:10px;
  letter-spacing:.09em;
  text-transform:uppercase;
  color:${MIST};
  opacity:.7;
}

/* SPECIES SWITCHER */
.mg-species-bar{
  background:${BARK};
  display:flex;
  justify-content:center;
  gap:0;
  border-bottom:3px solid ${GORGE};
}
.mg-sp-btn{
  padding:14px 32px;
  font-size:13px;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;
  font-family:'Source Sans 3',sans-serif;
  cursor:pointer;
  border:none;
  background:none;
  color:${STEEL};
  border-bottom:3px solid transparent;
  margin-bottom:-3px;
  transition:all .2s;
}
.mg-sp-btn:hover{color:${LIMESTONE};}
.mg-sp-btn.active.trout{color:#6BAED6;border-bottom-color:#6BAED6;}
.mg-sp-btn.active.bass{color:${AMBER};border-bottom-color:${AMBER};}

/* BODY */
.mg-body{
  background:${LIMESTONE};
  margin:0 14px;
  border-radius:4px 4px 0 0;
  overflow:hidden;
}

/* TABS */
.mg-tabs{
  display:flex;
  overflow-x:auto;
  scrollbar-width:none;
  -webkit-overflow-scrolling:touch;
}
.mg-tabs::-webkit-scrollbar{display:none;}
.mg-tab{
  padding:12px 18px;
  font-size:11px;
  font-weight:700;
  letter-spacing:.07em;
  text-transform:uppercase;
  cursor:pointer;
  border:none;
  background:none;
  white-space:nowrap;
  border-bottom:3px solid transparent;
  transition:all .2s;
  font-family:'Source Sans 3',sans-serif;
  color:${STEEL};
}
.mg-tab:hover{background:rgba(0,0,0,.05);}
.mg-tab.active.trout{color:#2171B5;border-bottom-color:#2171B5;background:rgba(33,113,181,.06);}
.mg-tab.active.bass{color:${GOLD};border-bottom-color:${GOLD};background:rgba(184,134,11,.06);}

/* PANEL */
.mg-panel{padding:22px 18px 32px;}

.mg-section-head{
  font-family:'Playfair Display',serif;
  font-size:21px;
  font-weight:700;
  color:${GORGE};
  margin-bottom:3px;
}
.mg-section-sub{
  font-size:12px;
  color:${STEEL};
  margin-bottom:18px;
  font-weight:300;
}
hr.mg-div{border:none;border-top:1px solid rgba(0,0,0,.1);margin:22px 0;}

/* SEASONAL NOTE */
.mg-season-note{
  background:rgba(43,58,46,.08);
  border-left:4px solid ${MOSS};
  padding:12px 14px;
  border-radius:0 4px 4px 0;
  margin-bottom:20px;
  font-size:13px;
  color:${GORGE};
  line-height:1.6;
}
.mg-season-note strong{color:${GORGE};}

/* SCHEDULE TABLE */
.mg-sched{width:100%;border-collapse:collapse;font-size:13px;}
.mg-sched thead tr{background:${GORGE};color:${LIMESTONE};}
.mg-sched thead th{padding:9px 11px;text-align:left;font-size:10px;letter-spacing:.07em;text-transform:uppercase;font-weight:600;}
.mg-sched tbody tr{border-bottom:1px solid rgba(0,0,0,.07);}
.mg-sched tbody tr:last-child{border:none;}
.mg-sched td{padding:9px 11px;vertical-align:top;line-height:1.4;}
.mg-sched td:first-child{font-family:'Source Code Pro',monospace;font-size:10px;color:${AMBER};white-space:nowrap;font-weight:600;}
.mg-sched td:nth-child(2){font-weight:600;color:${GORGE};}
.mg-hot{background:rgba(184,134,11,.08);}
.mg-tip{font-size:11px;color:${STEEL};font-style:italic;margin-top:2px;}
.mg-warm-warn{font-size:11px;color:${RUST};font-weight:600;margin-top:2px;}

/* HATCH GRID */
.mg-hatch-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:11px;}
.mg-hatch-card{
  border:1px solid rgba(0,0,0,.1);
  border-radius:4px;
  padding:13px;
  background:white;
}
.mg-hatch-name{font-weight:700;font-size:13px;color:${GORGE};margin-bottom:2px;}
.mg-hatch-latin{font-size:10px;color:${STEEL};font-style:italic;margin-bottom:7px;}
.mg-hatch-detail{font-size:12px;color:#444;line-height:1.5;}
.mg-hatch-window{
  display:inline-block;
  background:${MIST};
  color:${MOSS};
  font-size:10px;
  font-family:'Source Code Pro',monospace;
  font-weight:600;
  padding:2px 7px;
  border-radius:2px;
  margin-top:6px;
  letter-spacing:.04em;
}
.mg-hatch-flies{margin-top:6px;font-size:11px;color:${AMBER};font-weight:600;}

/* LEADER TABLE */
.mg-leader{width:100%;border-collapse:collapse;font-size:12px;}
.mg-leader thead tr{background:${SLATE};color:${LIMESTONE};}
.mg-leader thead th{padding:8px 10px;text-align:left;font-size:10px;letter-spacing:.07em;text-transform:uppercase;font-weight:600;}
.mg-leader tbody tr{border-bottom:1px solid rgba(0,0,0,.07);}
.mg-leader tbody tr:last-child{border:none;}
.mg-leader td{padding:9px 10px;vertical-align:top;line-height:1.4;}
.mg-leader td:first-child{font-weight:700;color:${BARK};}
.mg-code{font-family:'Source Code Pro',monospace;font-size:11px;color:${AMBER};font-weight:600;}

/* SPOTS */
.mg-spot-card{
  border:1px solid rgba(0,0,0,.1);
  border-radius:4px;
  overflow:hidden;
  margin-bottom:14px;
  background:white;
}
.mg-spot-hd{
  padding:13px 15px;
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:10px;
}
.mg-spot-hd.trout{background:#1A3A52;color:${LIMESTONE};}
.mg-spot-hd.bass{background:${GORGE};color:${LIMESTONE};}
.mg-spot-hd.both{background:${SLATE};color:${LIMESTONE};}
.mg-spot-name{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;}
.mg-spot-meta{font-size:11px;margin-top:3px;opacity:.75;}
.mg-tags{display:flex;flex-direction:column;gap:4px;align-items:flex-end;}
.mg-tag{
  font-size:9px;
  font-family:'Source Code Pro',monospace;
  font-weight:600;
  letter-spacing:.07em;
  padding:2px 7px;
  border-radius:2px;
  white-space:nowrap;
}
.mg-tag.wade{background:rgba(201,148,58,.3);color:${AMBER};}
.mg-tag.float{background:rgba(100,160,220,.3);color:#AADDFF;}
.mg-tag.stocked{background:rgba(107,174,214,.3);color:#7ECFFF;}
.mg-tag.wild{background:rgba(92,107,80,.3);color:#A8C89A;}
.mg-tag.access{background:rgba(150,180,120,.3);color:#B8E0A0;}
.mg-spot-body{padding:13px 15px;}
.mg-spot-body p{font-size:13px;line-height:1.6;color:#444;margin-bottom:8px;}
.mg-spot-body p:last-child{margin-bottom:0;}
.mg-spot-note{
  background:#FFF8EC;
  border-left:3px solid ${GOLD};
  padding:8px 11px;
  font-size:12px;
  color:#6B4800;
  border-radius:0 3px 3px 0;
  margin-top:8px;
}
.mg-spot-warn{
  background:#FFEFEF;
  border-left:3px solid ${RUST};
  padding:8px 11px;
  font-size:12px;
  color:#6B1500;
  border-radius:0 3px 3px 0;
  margin-top:6px;
}

/* REMINDERS */
.mg-remind-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:11px;}
.mg-remind-card{
  background:white;
  border:1px solid rgba(0,0,0,.1);
  border-radius:4px;
  padding:14px;
}
.mg-remind-card.alert{border-color:${RUST};background:#FFF8F8;}
.mg-remind-icon{font-size:20px;margin-bottom:6px;}
.mg-remind-title{font-weight:700;font-size:13px;color:${GORGE};margin-bottom:5px;}
.mg-remind-card.alert .mg-remind-title{color:${RUST};}
.mg-remind-body{font-size:12px;color:#555;line-height:1.5;}

/* FOOTER */
.mg-footer{
  background:${BARK};
  color:${AMBER};
  text-align:center;
  padding:18px;
  font-size:11px;
  letter-spacing:.06em;
  opacity:.8;
}

@media(max-width:480px){
  .mg-hero{padding:38px 14px 30px;}
  .mg-body{margin:0 8px;}
  .mg-panel{padding:18px 13px 26px;}
}
`;

// ── DATA ────────────────────────────────────────────────────────────────────

const TROUT_SCHEDULE = [
  { time:"5:30–8:30",  window:"Dawn / Cool", tactic:"Elk Hair Caddis, Sulphur dry",   note:"Best surface action while temps are down; South Branch running 158 CFS — fish stack in riffles above pools and in current seams", hot:true },
  { time:"8:30–11:00", window:"Late morning", tactic:"Nymph — BWO, Pheasant Tail",    note:"Sub-surface as sun hits; drift seams below big limestone ledges; 158 CFS on main stem pushes fish to softer water edges", hot:false },
  { time:"11:00–16:00",window:"Midday — avoid",tactic:"Rest or move to tailwaters",   note:"Water can reach critical temps — stop targeting trout above 68°F; temp sensor unavailable, carry a stream thermometer",    hot:false, warn:true },
  { time:"16:00–18:00",window:"Afternoon cool",tactic:"Caddis nymph, soft hackle",    note:"Temps drop as canyon shade kicks in; fish emerge from deep slots; North Fork at 15.1 CFS running low and clear — finesse presentation required",    hot:false },
  { time:"18:00–dusk", window:"Evening hatch", tactic:"Sulphur, Light Cahill, Caddis",note:"Most reliable dry-fly window; spinner falls on flat tailouts; low clear water on North Fork demands long fine leaders",        hot:true },
];

const BASS_SCHEDULE = [
  { time:"5:30–8:00",  window:"Dawn topwater", tactic:"Deer-hair bug, Gurgler",       note:"Prime popper window on the Trough and Moorefield flats; South Branch at 158 CFS — good wading depth on gravel bars and log structure", hot:true },
  { time:"8:00–10:00", window:"Morning",        tactic:"Crayfish, Clouser Minnow",    note:"Shift sub-surface as temps climb; 158 CFS provides excellent riffle energy through rocky chutes and ledge edges — ideal Clouser depth", hot:true },
  { time:"10:00–14:00",window:"Mid-morning",    tactic:"Woolly Bugger, helgramite",   note:"Fast strips through deeper Trough pools; 158 CFS keeps shade-holding fish active on limestone ledge breaks; water temp sensor unavailable — monitor conditions", hot:false },
  { time:"14:00–17:00",window:"Midday",         tactic:"Deep nymph, helgramite",      note:"Bounce bottom in the coldest slots; 158 CFS means good oxygenation in fast chutes; overcast = streamer opportunity any time", hot:false },
  { time:"17:00–dark", window:"Evening",        tactic:"Topwater / big streamer",     note:"Second topwater window; South Branch main stem at 158 CFS offers ideal evening wading on the Moorefield flats — electric topwater bite", hot:true },
];

const TROUT_HATCHES = [
  { name:"Sulphur",       latin:"Ephemerella invaria",   time:"Evening",   flies:"#16–18 Parachute Sulphur, Comparadun",         note:"Most consistent late-June evening hatch; spinner falls on flat tailouts" },
  { name:"Light Cahill",  latin:"Stenacron interpunctatum",time:"Evening", flies:"#14–16 Light Cahill, CDC Cahill",               note:"Fishes well in tandem with sulphurs on the North Fork" },
  { name:"Caddis",        latin:"Hydropsychidae",         time:"Dusk",      flies:"#14–16 Elk Hair Caddis, X-Caddis, Soft Hackle",note:"Swing soft hackle wet through fast riffles at dusk" },
  { name:"BWO",           latin:"Baetis spp.",            time:"Overcast/AM",flies:"#18–22 Parachute Adams, CDC BWO",             note:"Overcast days can trigger BWO hatches even in summer" },
  { name:"Trico",         latin:"Tricorythodes spp.",     time:"Dawn 6–9am",flies:"#22–26 Trico Spinner, CDC cluster",           note:"Spinner falls on slick tailouts of the upper North Fork" },
  { name:"Sculpin",       latin:"Cottus spp.",            time:"All day",   flies:"#4–8 Muddler Minnow, Clouser",                note:"Dominant forage for big browns; dead-drift then strip" },
];

const BASS_HATCHES = [
  { name:"Crayfish",      latin:"Orconectes spp.",        time:"All day",   flies:"#4–6 EP Crayfish, Clouser Craw",               note:"Primary forage in the Trough's rocky channels; dead-drift with rubber legs" },
  { name:"Helgramite",    latin:"Nigronia serricornis",   time:"All day",   flies:"#4–8 Black Woolly Bugger, Hellgrammite",       note:"Bounce along Trough boulders; biggest smallmouth key on these in summer" },
  { name:"Baitfish",      latin:"Minnows/shiners",        time:"Low light", flies:"#2–6 Clouser, white/olive Deceiver",           note:"Aggressive streamer bite during overcast windows and cloud buildup" },
  { name:"Caddis",        latin:"Hydropsychidae",         time:"Dusk",      flies:"#14 Elk Hair Caddis, Gurgler (skated)",        note:"Smallmouth slash caddis clusters at dusk; skate the fly on a downstream swing" },
  { name:"Topwater bug",  latin:"(imitation)",            time:"Dawn/Dusk", flies:"Deer-hair bug, Murray's Hellgrammite Popper", note:"Best on calm, flat water at the top and tail of Trough pools" },
  { name:"Sculpin",       latin:"Cottus spp.",            time:"All day",   flies:"#2–6 Muddler Minnow, Mohair Leech",           note:"Trophy fish key on these; strip fast through the lower Trough" },
];

const TROUT_LEADERS = [
  { cond:"Flat tailout, clear water",  len:"14 ft",  tip:"5X–6X", flies:"#18–22 Trico spinner, sulphur dry",    note:"Long leader; reach cast; 6X for surface-sipping fish" },
  { cond:"Riffle / fast run",          len:"9 ft",   tip:"4X",    flies:"Elk Hair Caddis, Pheasant Tail #14",   note:"Medium length; Czech nymph rig for deep riffles" },
  { cond:"Streamer (big brown)",       len:"6–7 ft", tip:"2X–3X", flies:"Muddler, articulated sculpin",         note:"Short, stiff; strip from downstream up through deep pools" },
  { cond:"Evening spinner fall",       len:"16 ft",  tip:"6X",    flies:"Trico/Cahill spinner",                 note:"Long, fine; single fly; slow presentation" },
  { cond:"Euro/Czech nymph",           len:"Variable",tip:"3X–4X",flies:"PT nymph, Hare's Ear, Copper John",   note:"10 ft sighter; tight-line; bounce bottom in fast chutes" },
];

const BASS_LEADERS = [
  { cond:"Topwater / popper",      len:"7 ft",  tip:"1X–0X", flies:"Deer-hair bug, Gurgler",           note:"Short, stiff; turns over bulky flies; 0X for big air-resistant bugs" },
  { cond:"Crayfish / nymph",       len:"9 ft",  tip:"2X–3X", flies:"Crayfish, Clouser Craw, helgramite",note:"Dead-drift, then strip; extra split shot for the Trough's depth" },
  { cond:"Streamer / fast water",  len:"6 ft",  tip:"0X–1X", flies:"Clouser, Woolly Bugger, Muddler",  note:"Fast strips; short leader kills slack on violent takes" },
  { cond:"Clear, pressured water", len:"10 ft", tip:"3X",    flies:"Small Clouser, soft hackle",        note:"Longer leader for wary fish in calm upper Trough pools" },
];

const TROUT_SPOTS = [
  {
    name:"North Fork — Cabins / Smoke Hole Rd",
    river:"North Fork of the South Branch",
    type:"trout",
    tags:[{label:"Stocked + Holdovers",cls:"stocked"},{label:"Wading",cls:"wade"}],
    desc:"WV DNR stocks this stretch heavily January through June. The boulder-field habitat upstream of the Smoke Hole Rd bridge holds impressive numbers of fish and some wild holdovers. Access off Rt 28/55 at numerous pull-offs south of Cabins. Currently running at 15.1 CFS — low and clear conditions; expect wary fish and demand careful wade approaches.",
    note:"At 15.1 CFS the North Fork is low and gin-clear — use long fine leaders (5X–6X), approach from downstream, and focus on shaded canyon walls in the morning. Spinner falls on the broad tailout below the bridge at dusk are outstanding.",
    warn:null,
  },
  {
    name:"Big Bend Campground — Upper South Branch",
    river:"South Branch Potomac",
    type:"trout",
    tags:[{label:"USFS / Public",cls:"access"},{label:"Float or Wade",cls:"float"}],
    desc:"Upper end of the Smoke Hole Canyon float. Walk-in access from the USFS Big Bend Campground. Clear limestone water with excellent cobblestone structure. Petersburg Hatchery golden rainbow trout occasionally appear this far down. South Branch at Moorefield is reading 158 CFS — upstream canyon flows are proportionally lower but this stretch should have fishable wading depth.",
    note:"14-mile float to Petersburg — commit to it or do a short wade up from Big Bend. Best trout action above the canyon mouth in early morning. Water temp sensor unavailable — carry a stream thermometer and stop targeting trout above 68°F.",
    warn:null,
  },
  {
    name:"Petersburg — Below Hatchery",
    river:"South Branch Potomac",
    type:"trout",
    tags:[{label:"Stocked",cls:"stocked"},{label:"Walk-In Wade",cls:"wade"}],
    desc:"The Petersburg State Fish Hatchery releases golden rainbow trout (the WV signature strain developed here) into the South Branch below Petersburg. Access at the Rt 220 bridge pull-off on the north side. Stocking runs January–June; holdovers linger in the deeper pools through summer. South Branch running 158 CFS at Moorefield gauge — wading conditions near Petersburg should be comfortable on the gravel flats.",
    note:"Water temp sensor is currently unavailable for this section — carry a thermometer and target the dawn and dusk windows only. Deep slots below the bridge hold the largest fish. At current late-June flows, concentrate on shaded deep runs during midday.",
    warn:"Check water temp before wading — 68°F is the target max for targeting trout. Stop fishing if above 70°F. Temp gauge currently unavailable; manual thermometer required.",
  },
];

const BASS_SPOTS = [
  {
    name:"The Trough — Hardy/Hampshire County Line",
    river:"South Branch Potomac",
    type:"bass",
    tags:[{label:"Float Only",cls:"float"},{label:"Trophy Water",cls:"wild"}],
    desc:"Six miles of steep-walled canyon with no road access — only a CSX rail line. This is the South Branch's crown jewel for smallmouth. Deep pools separated by Class I–II ledge drops hold trophy fish. Access: put in at Trough Rd (off Rt 220) and take out downstream at WVDNR access or Springfield. South Branch reading 158 CFS at Moorefield — an excellent floatable level for the Trough with good pool depth and active ledge drops.",
    note:"At 158 CFS the Trough is fishing at a prime summer level — pools have depth, ledge drops are energized, and fish are holding in defined seams. Guided float trips available through Breezewood Adventures in Moorefield (call 2+ weeks ahead in summer). Plan a full day minimum.",
    warn:null,
  },
  {
    name:"Moorefield Town Flats — Below US 220 Bridge",
    river:"South Branch Potomac",
    type:"bass",
    tags:[{label:"Public Access",cls:"access"},{label:"Wade",cls:"wade"}],
    desc:"Convenient wade access right in Moorefield below the US 220 bridge. Gravel bars and riffle-pool sequences with excellent smallmouth populations. At 158 CFS the South Branch is at a very comfortable wading level here — gravel bars are exposed, riffle crossings are straightforward, and fish are actively holding in current seams. Good topwater water in the morning before heat builds. Less pressure than the Trough but solid fish to 16\".",
    note:"Park at the WVDNR public access pull-off on the east bank. At current 158 CFS, wading is easy across the upper gravel bars — excellent conditions for an evening session after a day in the shop.",
    warn:null,
  },
  {
    name:"South Branch — Old Fields Bridge (Rt 220)",
    river:"South Branch Potomac",
    type:"bass",
    tags:[{label:"Public Road Access",cls:"access"},{label:"Float Put-In",cls:"float"}],
    desc:"Classic float put-in for the lower South Branch smallmouth stretch. Riffle-to-pool structure with good crayfish habitat on the gravel flats. At 158 CFS the current is well-defined through the riffle chutes — ideal for swinging Clousers and crayfish patterns through the downstream ledges. Overcast days can trigger excellent streamer action through this section. Also a strong wading spot from the bridge downstream for 0.5 miles.",
    note:"Start point for guided floats down to Moorefield. At 158 CFS expect a brisk float pace — read the ledge drops carefully and work the eddies behind the larger boulders where fish stack at this flow.",
    warn:null,
  },
  {
    name:"Smoke Hole Canyon — Upper Section",
    river:"South Branch Potomac",
    type:"bass",
    tags:[{label:"Float (Spring–Early Summer)",cls:"float"},{label:"Trout + Bass",cls:"wild"}],
    desc:"One of the few stretches in WV where you can target both trout and smallmouth on the same float. Water levels must be adequate — summer floats are limited by low flow. North Fork at Cabins is reading 15.1 CFS and the main stem upper canyon is proportionally low; confirm South Branch gauge levels above the canyon before committing to a float. When fishable, this is arguably the most spectacular canyon scenery in the state.",
    note:"Check USGS gauge at Cabins (currently 15.1 CFS — borderline for upper canyon float) before committing — Class II+ Landslide Rapid requires confident water reading. Two-to-three-day float for the full run.",
    warn:"Current North Fork flow of 15.1 CFS suggests upper canyon may be marginal for a safe float — confirm the South Branch above the canyon on the USGS gauge before launching.",
  },
];

const REMINDERS = [
  { icon:"🌡️", title:"Trout Temp Cutoff",        body:"Stop targeting trout above 68°F water temp. In late June the South Branch main stem can push this by mid-morning.