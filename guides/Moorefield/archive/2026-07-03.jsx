import { useState } from "react";

const GORGE     = "#2B3A2E";
const SLATE     = "#3D4F55";
const LIMESTONE = "#F4EFE4";
const GOLD      = "#B8860B";
const BARK      = "#2A1F14";
const MOSS      = "#5C6B50";
const MIST      = "#E4EBE6";
const RUST      = "#8B3A1A";
const AMBER     = "#C9943A";
const STEEL     = "#7A8C82";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;600&family=Source+Code+Pro:wght@400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
.mg-root{font-family:'Source Sans 3',sans-serif;background:${BARK};min-height:100vh;color:#222;}

.mg-band{background:${GORGE};color:${LIMESTONE};padding:9px 18px;font-size:11px;letter-spacing:.05em;display:flex;flex-wrap:wrap;gap:5px 18px;align-items:center;border-bottom:2px solid ${GOLD};}
.mg-band-label{font-family:'Source Code Pro',monospace;font-weight:600;color:${AMBER};text-transform:uppercase;letter-spacing:.1em;font-size:10px;}
.mg-band-item{display:flex;gap:6px;align-items:center;}
.mg-dot{width:6px;height:6px;border-radius:50%;background:${AMBER};flex-shrink:0;}
.mg-dot.warn{background:${RUST};}
.mg-dot.note{background:${GOLD};}

.mg-hero{background:linear-gradient(150deg,${BARK} 0%,${GORGE} 55%,${SLATE} 100%);padding:52px 24px 40px;text-align:center;position:relative;overflow:hidden;}
.mg-eyebrow{font-family:'Source Code Pro',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:${AMBER};margin-bottom:14px;}
.mg-hero h1{font-family:'Playfair Display',serif;font-size:clamp(30px,7vw,56px);font-weight:900;color:${LIMESTONE};line-height:1.1;margin-bottom:8px;}
.mg-hero h1 em{color:${AMBER};font-style:italic;}
.mg-subtitle{color:${MIST};font-size:14px;font-weight:300;margin-bottom:28px;opacity:.85;}
.mg-stats{display:flex;justify-content:center;gap:28px;flex-wrap:wrap;}
.mg-stat{text-align:center;}
.mg-stat-val{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:${AMBER};display:block;}
.mg-stat-lbl{font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:${MIST};opacity:.7;}

.mg-species-bar{background:${BARK};display:flex;justify-content:center;border-bottom:3px solid ${GORGE};}
.mg-sp-btn{padding:14px 32px;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-family:'Source Sans 3',sans-serif;cursor:pointer;border:none;background:none;color:${STEEL};border-bottom:3px solid transparent;margin-bottom:-3px;transition:all .2s;}
.mg-sp-btn:hover{color:${LIMESTONE};}
.mg-sp-btn.active.trout{color:#6BAED6;border-bottom-color:#6BAED6;}
.mg-sp-btn.active.bass{color:${AMBER};border-bottom-color:${AMBER};}

.mg-body{background:${LIMESTONE};margin:0 14px;border-radius:4px 4px 0 0;overflow:hidden;}
.mg-tabs{display:flex;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;}
.mg-tabs::-webkit-scrollbar{display:none;}
.mg-tab{padding:12px 18px;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;border:none;background:none;white-space:nowrap;border-bottom:3px solid transparent;transition:all .2s;font-family:'Source Sans 3',sans-serif;color:${STEEL};}
.mg-tab:hover{background:rgba(0,0,0,.05);}
.mg-tab.active.trout{color:#2171B5;border-bottom-color:#2171B5;background:rgba(33,113,181,.06);}
.mg-tab.active.bass{color:${GOLD};border-bottom-color:${GOLD};background:rgba(184,134,11,.06);}

.mg-panel{padding:22px 18px 32px;}
.mg-section-head{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;color:${GORGE};margin-bottom:3px;}
.mg-section-sub{font-size:12px;color:${STEEL};margin-bottom:18px;font-weight:300;}
hr.mg-div{border:none;border-top:1px solid rgba(0,0,0,.1);margin:22px 0;}

.mg-lore{background:rgba(43,58,46,.07);border-left:4px solid ${AMBER};padding:13px 15px;border-radius:0 4px 4px 0;margin-bottom:20px;font-size:13px;color:${GORGE};line-height:1.7;}
.mg-lore strong{color:${BARK};}

.mg-season-note{background:rgba(43,58,46,.08);border-left:4px solid ${MOSS};padding:12px 14px;border-radius:0 4px 4px 0;margin-bottom:20px;font-size:13px;color:${GORGE};line-height:1.6;}

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

.mg-hatch-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:11px;}
.mg-hatch-card{border:1px solid rgba(0,0,0,.1);border-radius:4px;padding:13px;background:white;}
.mg-hatch-name{font-weight:700;font-size:13px;color:${GORGE};margin-bottom:2px;}
.mg-hatch-latin{font-size:10px;color:${STEEL};font-style:italic;margin-bottom:7px;}
.mg-hatch-detail{font-size:12px;color:#444;line-height:1.5;}
.mg-hatch-window{display:inline-block;background:${MIST};color:${MOSS};font-size:10px;font-family:'Source Code Pro',monospace;font-weight:600;padding:2px 7px;border-radius:2px;margin-top:6px;letter-spacing:.04em;}
.mg-hatch-flies{margin-top:6px;font-size:11px;color:${AMBER};font-weight:600;}

.mg-leader{width:100%;border-collapse:collapse;font-size:12px;}
.mg-leader thead tr{background:${SLATE};color:${LIMESTONE};}
.mg-leader thead th{padding:8px 10px;text-align:left;font-size:10px;letter-spacing:.07em;text-transform:uppercase;font-weight:600;}
.mg-leader tbody tr{border-bottom:1px solid rgba(0,0,0,.07);}
.mg-leader tbody tr:last-child{border:none;}
.mg-leader td{padding:9px 10px;vertical-align:top;line-height:1.4;}
.mg-leader td:first-child{font-weight:700;color:${BARK};}
.mg-code{font-family:'Source Code Pro',monospace;font-size:11px;color:${AMBER};font-weight:600;}

.mg-wma-banner{background:${GORGE};color:${LIMESTONE};padding:13px 15px;border-radius:4px;margin-bottom:16px;font-size:13px;line-height:1.6;}
.mg-wma-banner strong{color:${AMBER};}
.mg-wma-tracts{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-top:12px;}
.mg-wma-tract{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:3px;padding:10px 12px;}
.mg-wma-tract-name{font-weight:700;font-size:12px;color:${AMBER};margin-bottom:3px;}
.mg-wma-tract-detail{font-size:11px;color:${MIST};line-height:1.5;opacity:.85;}

.mg-spot-card{border:1px solid rgba(0,0,0,.1);border-radius:4px;overflow:hidden;margin-bottom:14px;background:white;}
.mg-spot-hd{padding:13px 15px;display:flex;justify-content:space-between;align-items:flex-start;gap:10px;}
.mg-spot-hd.trout{background:#1A3A52;color:${LIMESTONE};}
.mg-spot-hd.bass{background:${GORGE};color:${LIMESTONE};}
.mg-spot-hd.both{background:${SLATE};color:${LIMESTONE};}
.mg-spot-name{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;}
.mg-spot-meta{font-size:11px;margin-top:3px;opacity:.75;}
.mg-tags{display:flex;flex-direction:column;gap:4px;align-items:flex-end;}
.mg-tag{font-size:9px;font-family:'Source Code Pro',monospace;font-weight:600;letter-spacing:.07em;padding:2px 7px;border-radius:2px;white-space:nowrap;}
.mg-tag.wade{background:rgba(201,148,58,.3);color:${AMBER};}
.mg-tag.float{background:rgba(100,160,220,.3);color:#AADDFF;}
.mg-tag.stocked{background:rgba(107,174,214,.3);color:#7ECFFF;}
.mg-tag.wild{background:rgba(92,107,80,.3);color:#A8C89A;}
.mg-tag.wma{background:rgba(180,134,11,.25);color:#FFD770;}
.mg-tag.cabin{background:rgba(201,148,58,.4);color:#FFE0A0;}
.mg-spot-body{padding:13px 15px;}
.mg-spot-body p{font-size:13px;line-height:1.6;color:#444;margin-bottom:8px;}
.mg-spot-body p:last-child{margin-bottom:0;}
.mg-spot-note{background:#FFF8EC;border-left:3px solid ${GOLD};padding:8px 11px;font-size:12px;color:#6B4800;border-radius:0 3px 3px 0;margin-top:8px;line-height:1.5;}
.mg-spot-warn{background:#FFEFEF;border-left:3px solid ${RUST};padding:8px 11px;font-size:12px;color:#6B1500;border-radius:0 3px 3px 0;margin-top:6px;line-height:1.5;}
.mg-spot-eagle{background:#F0F6FF;border-left:3px solid #4A90D9;padding:8px 11px;font-size:12px;color:#1A3A5C;border-radius:0 3px 3px 0;margin-top:6px;line-height:1.5;}

.mg-remind-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:11px;}
.mg-remind-card{background:white;border:1px solid rgba(0,0,0,.1);border-radius:4px;padding:14px;}
.mg-remind-card.alert{border-color:${RUST};background:#FFF8F8;}
.mg-remind-card.highlight{border-color:${GOLD};background:#FFFBF0;}
.mg-remind-icon{font-size:20px;margin-bottom:6px;}
.mg-remind-title{font-weight:700;font-size:13px;color:${GORGE};margin-bottom:5px;}
.mg-remind-card.alert .mg-remind-title{color:${RUST};}
.mg-remind-card.highlight .mg-remind-title{color:${GOLD};}
.mg-remind-body{font-size:12px;color:#555;line-height:1.5;}

.mg-footer{background:${BARK};color:${AMBER};text-align:center;padding:18px;font-size:11px;letter-spacing:.06em;opacity:.8;}

@media(max-width:480px){
  .mg-hero{padding:38px 14px 30px;}
  .mg-body{margin:0 8px;}
  .mg-panel{padding:18px 13px 26px;}
  .mg-sp-btn{padding:12px 18px;font-size:11px;}
}
`;

const TROUT_SCHEDULE = [
  { time:"5:30–8:30",  window:"Dawn / Cool",   tactic:"Elk Hair Caddis, Sulphur dry",    note:"Best surface action while temps are down; fish stack in riffles above pools on the North Fork", hot:true },
  { time:"8:30–11:00", window:"Late morning",   tactic:"Nymph — BWO, Pheasant Tail",     note:"Sub-surface as sun hits; drift seams below limestone ledges and undercuts", hot:false },
  { time:"11:00–16:00",window:"Midday — rest",  tactic:"Move to shade or switch to bass", note:"Water can reach critical temps on the main stem — stop targeting trout above 68°F", hot:false, warn:true },
  { time:"16:00–18:00",window:"Afternoon cool", tactic:"Caddis nymph, soft hackle",      note:"Canyon shade drops temps; fish emerge from deep slots on the North Fork", hot:false },
  { time:"18:00–dusk", window:"Evening hatch",  tactic:"Sulphur, Light Cahill, Caddis",  note:"Most reliable dry-fly window; spinner falls on flat tailouts below riffles", hot:true },
];

const BASS_SCHEDULE = [
  { time:"5:30–8:00",  window:"Dawn topwater",  tactic:"Deer-hair bug, Gurgler",          note:"Prime popper window at McNeill Tract gravel bars and Moorefield flats; work log structure and current seams", hot:true },
  { time:"8:00–10:00", window:"Morning",         tactic:"Crayfish, Clouser Minnow",       note:"Shift sub-surface; drift rocky Trough chutes and ledge edges with weighted crayfish", hot:true },
  { time:"10:00–14:00",window:"Mid-morning",     tactic:"Woolly Bugger, helgramite",      note:"Fast strips through deeper Trough pools; shade-holding fish on limestone ledge breaks", hot:false },
  { time:"14:00–17:00",window:"Midday",          tactic:"Deep nymph, helgramite",         note:"Bounce bottom in coldest canyon slots; overcast = streamer opportunity any time of day", hot:false },
  { time:"17:00–dark", window:"Evening",         tactic:"Topwater / big streamer",        note:"Second topwater window; evening bite on the Moorefield flats can be electric — watch for rising fish", hot:true },
];

const TROUT_HATCHES = [
  { name:"Sulphur",      latin:"Ephemerella invaria",     time:"Evening",    flies:"#16–18 Parachute Sulphur, Comparadun",          note:"Most consistent late-June evening hatch on the North Fork tailouts" },
  { name:"Light Cahill", latin:"Stenacron interpunctatum",time:"Evening",    flies:"#14–16 Light Cahill, CDC Cahill",                note:"Fishes well alongside sulphurs; look for mixed spinner falls on flat water" },
  { name:"Caddis",       latin:"Hydropsychidae",           time:"Dusk",       flies:"#14–16 Elk Hair Caddis, X-Caddis, Soft Hackle", note:"Swing soft hackle wet through fast North Fork riffles at dusk" },
  { name:"BWO",          latin:"Baetis spp.",              time:"Overcast/AM",flies:"#18–22 Parachute Adams, CDC BWO",               note:"Overcast days can trigger BWO hatches even in late June — stay alert" },
  { name:"Trico",        latin:"Tricorythodes spp.",       time:"Dawn 6–9am", flies:"#22–26 Trico Spinner, CDC cluster",             note:"Spinner falls on slick tailouts of the upper North Fork near Cabins" },
  { name:"Sculpin",      latin:"Cottus spp.",              time:"All day",    flies:"#4–8 Muddler Minnow, Clouser",                  note:"Dominant forage for big holdover browns; dead-drift then strip through pools" },
];

const BASS_HATCHES = [
  { name:"Crayfish",    latin:"Orconectes spp.",    time:"All day",    flies:"#4–6 EP Crayfish, Clouser Craw",             note:"Primary forage in The Trough's rocky channels; dead-drift with rubber legs then strip" },
  { name:"Helgramite",  latin:"Nigronia serricornis",time:"All day",   flies:"#4–8 Black Woolly Bugger, Hellgrammite",     note:"Bounce along Trough boulders; biggest Trough smallmouth key on these all summer" },
  { name:"Baitfish",    latin:"Minnows / shiners",  time:"Low light",  flies:"#2–6 Clouser, white/olive Deceiver",         note:"Aggressive streamer bite during overcast windows and cloud buildup any time of day" },
  { name:"Caddis",      latin:"Hydropsychidae",      time:"Dusk",       flies:"#14 Elk Hair Caddis, Gurgler (skated)",     note:"Smallmouth slash caddis clusters at dusk; skate the fly on a downstream swing" },
  { name:"Topwater bug",'latin':"(imitation)",       time:"Dawn/Dusk",  flies:"Deer-hair bug, Murray's Hellgrammite Popper",note:"Best on calm flat water at top and tail of Trough pools and Moorefield gravel bars" },
  { name:"Sculpin",     latin:"Cottus spp.",         time:"All day",    flies:"#2–6 Muddler Minnow, Mohair Leech",         note:"Trophy fish key on these; strip fast through the lower Trough and canyon pool exits" },
];

const TROUT_LEADERS = [
  { cond:"Flat tailout, clear water", len:"14 ft",    tip:"5X–6X", flies:"#18–22 Trico spinner, Sulphur dry",   note:"Long leader; reach cast; 6X for surface-sipping holdovers" },
  { cond:"Riffle / fast run",         len:"9 ft",     tip:"4X",    flies:"Elk Hair Caddis, Pheasant Tail #14",  note:"Czech nymph rig for deep North Fork riffles" },
  { cond:"Streamer (big brown)",      len:"6–7 ft",   tip:"2X–3X", flies:"Muddler, articulated sculpin",        note:"Short, stiff; strip from downstream up through deep pools" },
  { cond:"Evening spinner fall",      len:"16 ft",    tip:"6X",    flies:"Trico / Cahill spinner",              note:"Long, fine; single fly; slow presentation on glassy tailouts" },
  { cond:"Euro / Czech nymph",        len:"Variable", tip:"3X–4X", flies:"PT nymph, Hare's Ear, Copper John",  note:"10 ft sighter; tight-line; bounce bottom in fast chutes" },
];

const BASS_LEADERS = [
  { cond:"Topwater / popper",      len:"7 ft",  tip:"1X–0X", flies:"Deer-hair bug, Gurgler",            note:"Short, stiff; turns over bulky flies cleanly; 0X for big air-resistant bugs" },
  { cond:"Crayfish / nymph",       len:"9 ft",  tip:"2X–3X", flies:"Crayfish, Clouser Craw, helgramite",note:"Dead-drift then strip; extra split shot for The Trough's depth" },
  { cond:"Streamer / fast water",  len:"6 ft",  tip:"0X–1X", flies:"Clouser, Woolly Bugger, Muddler",  note:"Fast strips; short leader kills slack on violent canyon takes" },
  { cond:"Clear, pressured pools", len:"10 ft", tip:"3X",    flies:"Small Clouser, soft hackle",        note:"Longer leader for wary fish in calm upper Trough pools at midday" },
];

const TROUT_SPOTS = [
  {
    name:"North Fork — Cabins / Smoke Hole Rd",
    river:"North Fork of the South Branch",
    type:"trout",
    tags:[{label:"Stocked + Holdovers",cls:"stocked"},{label:"Wading",cls:"wade"}],
    desc:"WV DNR stocks this stretch heavily January through June. The boulder-field habitat upstream of the Smoke Hole Rd bridge holds impressive numbers of fish and some wild holdovers. Access off Rt 28/55 at numerous pull-offs south of Cabins — road runs alongside the river for miles.",
    note:"Fish the shaded canyon walls in the morning; spinner falls on the broad tailout below the bridge at dusk are outstanding. This is the most reliable late-June trout water in the watershed.",
    warn:null,
    eagle:false,
  },
  {
    name:"Big Bend Campground — Upper South Branch",
    river:"South Branch Potomac",
    type:"trout",
    tags:[{label:"USFS Public",cls:"stocked"},{label:"Float or Wade",cls:"float"}],
    desc:"Upper end of the Smoke Hole Canyon float. Walk-in access from the USFS Big Bend Campground. Clear limestone water with excellent cobblestone structure. Petersburg Hatchery golden rainbow trout occasionally appear this far down. Best combined trout-and-smallmouth water in the system.",
    note:"14-mile float to Petersburg — commit to a full day. Best trout action above the canyon mouth in early morning before water temps climb.",
    warn:null,
    eagle:false,
  },
  {
    name:"Petersburg — Below Hatchery",
    river:"South Branch Potomac",
    type:"trout",
    tags:[{label:"Stocked",cls:"stocked"},{label:"Walk-In Wade",cls:"wade"}],
    desc:"The Petersburg State Fish Hatchery releases golden rainbow trout — WV's signature strain developed here — into the South Branch below Petersburg. Access at the Rt 220 bridge pull-off north side. Stocking runs January–June; holdovers linger in the deeper pools through summer.",
    note:"Water temps can get marginal here in late June. Target the dawn and dusk windows only. Deep slots below the bridge hold the largest fish.",
    warn:"Check water temp before wading. Stop targeting trout if above 68°F — fish are stressed and release mortality climbs fast above 70°F.",
    eagle:false,
  },
];

const BASS_SPOTS = [
  {
    name:"McNeill Tract — South Branch WMA",
    river:"South Branch Potomac",
    type:"bass",
    tags:[{label:"WMA / Public",cls:"wma"},{label:"Trough Put-In",cls:"float"},{label:"Cabin Access",cls:"cabin"}],
    desc:"Your closest quality water from the cabin. From Ashton Woods Dr, take Trough Rd north about 4 miles to the entrance on the left — this is the 430-acre McNeill Tract of the South Branch Wildlife Management Area. Pasture land and forest along the river with carry-down access to the South Branch at the upper mouth of The Trough. This is the standard put-in for the 7-mile Trough float.",
    note:"The WMA boundary marks the start of The Trough canyon. Even without floating, the wade access off the McNeill Tract gives you the first riffle-pool sequence entering the canyon — excellent morning topwater water on the gravel bars.",
    warn:null,
    eagle:true,
    snakehead:true,
  },
  {
    name:"The Trough — Hardy / Hampshire Canyon",
    river:"South Branch Potomac",
    type:"bass",
    tags:[{label:"Float Only",cls:"float"},{label:"Trophy Water",cls:"wild"},{label:"WMA",cls:"wma"}],
    desc:"Six miles of steep canyon walls with no road access — only a CSX rail line runs alongside. This is the South Branch's crown jewel for smallmouth. Deep pools separated by Class I–II ledge drops hold trophy fish throughout. The canyon was named by George Washington during his 1748 surveying expedition when he gazed in and declared it impassable. People come from all over the world to float this stretch.",
    note:"Guided float trips through Breezewood Adventures in Moorefield (breezeadventures.com) — book 2+ weeks ahead in summer. Plan a full day minimum. Trough Club Tract (602 acres, river access only) and Bridge Tract are mid-canyon WMA public land.",
    warn:null,
    eagle:true,
    snakehead:true,
  },
  {
    name:"Moorefield Town Flats — US 220 Bridge",
    river:"South Branch Potomac",
    type:"bass",
    tags:[{label:"Public Access",cls:"wma"},{label:"Wade",cls:"wade"}],
    desc:"Convenient wade access right in Moorefield below the US 220 bridge. Gravel bars and riffle-pool sequences with excellent smallmouth populations. Good topwater water in the morning before heat builds. Less pressure than The Trough but consistent fish to 16 inches. Easy evening session after a day at the cabin.",
    note:"Park at the WVDNR public access pull-off on the east bank. Wade downstream from the bridge — best structure is 200–400 yards below where the river bends left around a gravel bar.",
    warn:null,
    eagle:false,
    snakehead:true,
  },
  {
    name:"Old Fields Bridge — Rt 220 Put-In",
    river:"South Branch Potomac",
    type:"bass",
    tags:[{label:"Public Road Access",cls:"wma"},{label:"Float Put-In",cls:"float"}],
    desc:"Classic float put-in for the lower South Branch smallmouth stretch between Moorefield and The Trough. Riffle-to-pool structure with good crayfish habitat on the gravel flats. Overcast days trigger excellent streamer action through this section. Also a strong wading spot from the bridge downstream for 0.5 miles.",
    note:"Start point for self-guided floats down to the McNeill Tract / Trough entrance. Current is gentle enough for a canoe or kayak. Kellan Snyder at Breezewood Adventures launched guided trips from near here when he started in 2021.",
    warn:null,
    eagle:false,
    snakehead:true,
  },
  {
    name:"Sector Tract — Northern Trough Takeout",
    river:"South Branch Potomac",
    type:"bass",
    tags:[{label:"WMA / Public",cls:"wma"},{label:"Trough Takeout",cls:"float"}],
    desc:"The northern end of The Trough float in Hampshire County, accessed from Romney via Stringtown Road (CR-8/3) south about 4 miles to Sector, WV. River bottomland with good wade access. If you float The Trough top to bottom, this is your takeout. Also a productive standalone wade spot on the lower canyon water.",
    note:"From Romney: US 220 south 12 miles, left on Stringtown Rd, proceed to Sector. Harrison's access is the alternate takeout slightly downstream — confirm shuttle logistics with Breezewood before you launch.",
    warn:null,
    eagle:true,
    snakehead:true,
  },
  {
    name:"Smoke Hole Canyon — Upper Float",
    river:"South Branch Potomac",
    type:"bass",
    tags:[{label:"Float (Spring/Early Summer)",cls:"float"},{label:"Trout + Bass",cls:"wild"}],
    desc:"One of the only stretches in WV where you can target both trout and smallmouth on the same float. The 21-mile run from Smoke Hole Picnic Area to Petersburg passes through spectacular canyon scenery with massive rock formations. Class I–II+ with one significant rapid (Landslide). Bald eagles nest in this canyon.",
    note:"Check USGS gauge at Cabins before committing — summer flows can be too low for a safe float. Two-to-three-day camping float for the full run; shorter trips possible from road access points along Smoke Hole Rd.",
    warn:"Late June flows may be marginal — confirm gauge before trip. This is a remote float with no road egress for miles.",
    eagle:true,
    snakehead:false,
  },
];

const REMINDERS = [
  { icon:"🏠", title:"From the Cabin",          body:"McNeill Tract WMA is ~10 min from Ashton Woods Dr via Trough Rd — take it north 4 miles, entrance on the left. Moorefield Town Flats are 15 min south on US 220. Both are quick morning sessions before the heat builds.", cls:"highlight" },
  { icon:"🦅", title:"Bald Eagles",              body:"The Trough was the first known modern bald eagle nesting site in WV. You will almost certainly see eagles on a Trough float. They nest in the canyon walls and fish the same pools you do.", cls:"highlight" },
  { icon:"🌡️", title:"Trout Temp Cutoff",        body:"Stop targeting trout above 68°F. The South Branch main stem can hit this by mid-morning in late June. The North Fork near Cabins runs cooler — prioritize it on hot days for trout.", cls:"alert" },
  { icon:"🐟", title:"Northern Snakehead",        body:"Invasive northern snakehead is established in the South Branch WMA and Trough section. Do not release if caught — report to WVDNR at 304-637-0245. They are an air-breathing predator and a serious threat to the fishery.", cls:"alert" },
  { icon:"🛶", title:"Trough Float Logistics",    body:"Float-only canyon — no road egress for 6 miles. Breezewood Adventures (Moorefield) runs shuttles and guided trips. Book 2+ weeks ahead in summer. Bring all food and water for a full day on the water.", cls:"" },
  { icon:"🏛️", title:"Historical Note",           body:"George Washington surveyed and named The Trough in 1748, declaring the canyon impassable. In 1756 it was the site of the Battle of the Trough during the French and Indian War.", cls:"" },
  { icon:"☁️", title:"Overcast = Prime Time",     body:"Both smallmouth and trout feed more aggressively under cloud cover. Keep a streamer or popper rod rigged when skies gray up — the bite on The Trough can flip on in minutes.", cls:"" },
  { icon:"🎣", title:"WV Fishing License",         body:"Required for all anglers 15+. Annual license at wvdnr.gov or WVfish.com. No special trout stamp required for stocked streams. Check current South Branch bass regulations — some slot limits may apply.", cls:"" },
  { icon:"🥾", title:"Wading & Safety",            body:"Trough is float-only — no wading access mid-canyon. McNeill Tract boulders are slick. Felt soles or studs strongly recommended. Never wade The Trough alone in unfamiliar water.", cls:"" },
  { icon:"📋", title:"Private Land",               body:"South Branch corridor has significant private land. Stick to the river corridor while floating. WMA tract boundaries are marked — don't cross fences onto farm fields above the bank.", cls:"" },
];

const WMA_TRACTS = [
  { name:"McNeill Tract", detail:"430 acres · South end of The Trough · Pasture & forest · Carry-down river access · ~10 min from cabin via Trough Rd" },
  { name:"Bridge Tract",  detail:"25 acres · North of Sycamore Bridge railroad trestle · Narrow steep mountainside · Carry-down access mid-canyon" },
  { name:"Trough Club Tract", detail:"602 acres · River access only · Steep forested mountainside · Mid-canyon public land on the float" },
  { name:"Sector Tract",  detail:"Hampshire County · Northern Trough end · River bottomland · Standard Trough float takeout · Access from Romney via Stringtown Rd" },
];

const TABS = ["Schedule","Hatches","Leaders","Spots","Reminders"];

export default function MoorefieldFlyGuide() {
  const [species, setSpecies] = useState("bass");
  const [tab, setTab]         = useState(0);
  const sc = species === "trout" ? "trout" : "bass";
  const schedule = species === "trout" ? TROUT_SCHEDULE : BASS_SCHEDULE;
  const hatches  = species === "trout" ? TROUT_HATCHES  : BASS_HATCHES;
  const leaders  = species === "trout" ? TROUT_LEADERS  : BASS_LEADERS;
  const spots    = species === "trout" ? TROUT_SPOTS    : BASS_SPOTS;

  return (
    <div className="mg-root">
      <style>{css}</style>

      <div className="mg-band">
        <span className="mg-band-label">Hardy County · South Branch</span>
        <div className="mg-band-item"><div className="mg-dot" /><span>South Branch: Low & clear · Summer pattern</span></div>
        <div className="mg-band-item"><div className="mg-dot" /><span>North Fork: Cool · Best trout water late June</span></div>
        <div className="mg-band-item"><div className="mg-dot warn" /><span>Snakehead established — do not release</span></div>
        <div className="mg-band-item"><div className="mg-dot note" /><span>McNeill Tract ~10 min from cabin via Trough Rd</span></div>
      </div>

      <div className="mg-hero">
        <div className="mg-eyebrow">Moorefield, WV · Hardy County · South Branch Watershed · Late June</div>
        <h1>South Branch<br /><em>Field Guide</em></h1>
        <div className="mg-subtitle">The Trough · McNeill Tract · North Fork · Moorefield Flats — West Virginia Highlands</div>
        <div className="mg-stats">
          <div className="mg-stat"><span className="mg-stat-val">7 Miles</span><span className="mg-stat-lbl">The Trough Canyon</span></div>
          <div className="mg-stat"><span className="mg-stat-val">4 WMA Tracts</span><span className="mg-stat-lbl">Public Access</span></div>
          <div className="mg-stat"><span className="mg-stat-val">~10 Min</span><span className="mg-stat-lbl">Cabin to McNeill</span></div>
          <div className="mg-stat"><span className="mg-stat-val">Dawn / Dusk</span><span className="mg-stat-lbl">Prime Windows</span></div>
        </div>
      </div>

      <div className="mg-species-bar">
        <button className={`mg-sp-btn${species==="trout"?" active trout":""}`} onClick={()=>{setSpecies("trout");setTab(0);}}>🎣 Trout</button>
        <button className={`mg-sp-btn${species==="bass"?" active bass":""}`}  onClick={()=>{setSpecies("bass");setTab(0);}}>🐟 Smallmouth Bass</button>
      </div>

      <div className="mg-body">
        <div className="mg-tabs">
          {TABS.map((t,i) => (
            <button key={t} className={`mg-tab${tab===i?" active "+sc:""}`} onClick={()=>setTab(i)}>{t}</button>
          ))}
        </div>

        <div className="mg-panel">

          {tab === 0 && (
            <>
              <div className="mg-section-head">{species==="trout"?"Trout Daily Schedule":"Smallmouth Daily Schedule"}</div>
              <div className="mg-section-sub">{species==="trout"?"Late June · North Fork & Upper South Branch · Water temp is the variable":"Late June · The Trough, McNeill Tract & Moorefield Flats"}</div>
              {species==="trout" ? (
                <div className="mg-season-note">
                  <strong>Late June trout reality:</strong> The North Fork of the South Branch near Cabins is your best trout water through June — it runs cooler than the main stem. Main stem temps can reach 68–70°F by midday. Dawn and dusk are non-negotiable windows for trout in late summer.
                </div>
              ) : (
                <div className="mg-lore">
                  <strong>Your backyard fishery:</strong> The McNeill Tract WMA is about 10 minutes from the cabin via Trough Rd. The upper mouth of The Trough right there holds some of the best early-morning topwater smallmouth water on the South Branch. You don't need a guide or a shuttle to fish it — just carry your rod down to the river.
                </div>
              )}
              <div style={{overflowX:"auto"}}>
                <table className="mg-sched">
                  <thead><tr><th>Time</th><th>Window</th><th>Tactic</th><th>Notes</th></tr></thead>
                  <tbody>
                    {schedule.map((r,i)=>(
                      <tr key={i} className={r.hot?"mg-hot":""}>
                        <td>{r.time}</td>
                        <td>{r.window}{r.hot&&<div className="mg-tip">★ Prime window</div>}{r.warn&&<div className="mg-warm-warn">⚠ Temp check required</div>}</td>
                        <td>{r.tactic}</td>
                        <td>{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 1 && (
            <>
              <div className="mg-section-head">{species==="trout"?"Late June Trout Hatches":"Smallmouth Food Sources"}</div>
              <div className="mg-section-sub">{species==="trout"?"North Fork & South Branch · Key imitations":"South Branch, The Trough & McNeill Tract · Primary forage"}</div>
              <div className="mg-hatch-grid">
                {hatches.map((h,i)=>(
                  <div className="mg-hatch-card" key={i}>
                    <div className="mg-hatch-name">{h.name}</div>
                    <div className="mg-hatch-latin">{h.latin}</div>
                    <div className="mg-hatch-detail">{h.note}</div>
                    <div><span className="mg-hatch-window">{h.time}</span></div>
                    <div className="mg-hatch-flies">{h.flies}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 2 && (
            <>
              <div className="mg-section-head">{species==="trout"?"Trout Leader & Tippet":"Bass Leader & Tippet"}</div>
              <div className="mg-section-sub">Match to water type and fly size</div>
              <div style={{overflowX:"auto"}}>
                <table className="mg-leader">
                  <thead><tr><th>Condition</th><th>Leader</th><th>Tippet</th><th>Flies</th><th>Notes</th></tr></thead>
                  <tbody>
                    {leaders.map((r,i)=>(
                      <tr key={i}>
                        <td>{r.cond}</td>
                        <td><span className="mg-code">{r.len}</span></td>
                        <td><span className="mg-code">{r.tip}</span></td>
                        <td style={{fontSize:11}}>{r.flies}</td>
                        <td style={{fontSize:11,color:STEEL}}>{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 3 && (
            <>
              <div className="mg-section-head">{species==="trout"?"Trout Access Points":"Smallmouth Access Points"}</div>
              <div className="mg-section-sub">Hardy & Hampshire Counties · South Branch Watershed</div>

              {species==="bass" && (
                <div className="mg-wma-banner">
                  <strong>South Branch Wildlife Management Area — 1,183 acres of public fishing access</strong>
                  <div style={{fontSize:12,marginTop:6,opacity:.85}}>Four tracts managed by WVDNR along The Trough canyon. No camping permitted. Carry-down boat access on all river tracts. Smallmouth bass, rock bass, channel catfish.</div>
                  <div className="mg-wma-tracts">
                    {WMA_TRACTS.map((t,i)=>(
                      <div className="mg-wma-tract" key={i}>
                        <div className="mg-wma-tract-name">{t.name}</div>
                        <div className="mg-wma-tract-detail">{t.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {spots.map((s,i)=>(
                <div className="mg-spot-card" key={i}>
                  <div className={`mg-spot-hd ${s.type==="trout"?"trout":s.type==="bass"?"bass":"both"}`}>
                    <div>
                      <div className="mg-spot-name">{s.name}</div>
                      <div className="mg-spot-meta">{s.river}</div>
                    </div>
                    <div className="mg-tags">
                      {s.tags.map((t,j)=><span key={j} className={`mg-tag ${t.cls}`}>{t.label}</span>)}
                    </div>
                  </div>
                  <div className="mg-spot-body">
                    <p>{s.desc}</p>
                    {s.note && <div className="mg-spot-note">💡 {s.note}</div>}
                    {s.warn && <div className="mg-spot-warn">⚠ {s.warn}</div>}
                    {s.eagle && <div className="mg-spot-eagle">🦅 Bald eagles nest and hunt in this section — almost certain to see them on a morning float or wade.</div>}
                    {s.snakehead && <div className="mg-spot-warn">🐟 <strong>Northern Snakehead:</strong> Invasive species established in this stretch. Do not release if caught — report to WVDNR at 304-637-0245.</div>}
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === 4 && (
            <>
              <div className="mg-section-head">Field Reminders</div>
              <div className="mg-section-sub">Safety, logistics & local knowledge — Hardy County</div>
              <div className="mg-remind-grid">
                {REMINDERS.map((r,i)=>(
                  <div className={`mg-remind-card${r.cls?" "+r.cls:""}`} key={i}>
                    <div className="mg-remind-icon">{r.icon}</div>
                    <div className="mg-remind-title">{r.title}</div>
                    <div className="mg-remind-body">{r.body}</div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      <div className="mg-footer">
        Mountaineer Maker · Moorefield / Hardy County, WV · South Branch Potomac Watershed
      </div>
    </div>
  );
}
