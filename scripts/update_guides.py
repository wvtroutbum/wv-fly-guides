import anthropic
import requests
import shutil
import os
from datetime import date

client = anthropic.Anthropic()
today = date.today().isoformat()

def fetch_conditions():
    """Fetch current USGS gauge data for South Branch and upper Potomac."""
    gauges = {
        "South Branch at Moorefield": "01606500",
        "Potomac at Shepherdstown": "01617000",
        "North Fork South Branch at Cabins": "01604500",
    }
    results = {}
    for name, site in gauges.items():
        try:
            url = f"https://waterservices.usgs.gov/nwis/iv/?sites={site}&parameterCd=00060,00010&format=json"
            r = requests.get(url, timeout=10)
            data = r.json()
            series = data["value"]["timeSeries"]
            flow = next((s for s in series if s["variable"]["variableCode"][0]["value"] == "00060"), None)
            temp = next((s for s in series if s["variable"]["variableCode"][0]["value"] == "00010"), None)
            results[name] = {
                "cfs": flow["values"][0]["value"][0]["value"] if flow else "N/A",
                "temp_c": temp["values"][0]["value"][0]["value"] if temp else "N/A",
            }
        except Exception as e:
            results[name] = {"cfs": "unavailable", "temp_c": "unavailable", "error": str(e)}
    return results

def read_file(path):
    with open(path, "r") as f:
        return f.read()

def write_file(path, content):
    with open(path, "w") as f:
        f.write(content)

def archive(src, name):
    dst = f"guides/{name}/archive/{today}.jsx"
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)
    print(f"Archived {src} -> {dst}")

def update_guide(guide_path, guide_name, conditions_text):
    current = read_file(guide_path)
    prompt = f"""You are updating a React JSX fly fishing field guide for {guide_name}.

Current conditions from USGS gauges as of {today}:
{conditions_text}

Here is the current JSX file:
<current_guide>
{current}
</current_guide>

Update the guide with the following changes:
1. Update the conditions banner at the top with current gauge readings (convert Celsius to Fahrenheit for water temp display)
2. Update any water temp stats in the hero section
3. Update schedule notes to reflect current flow and temp conditions
4. Update spot descriptions if conditions warrant (e.g. high/low water tactics)
5. Update the conditions banner to include a 'Last updated: {today_friendly}' line, for example: 'Last updated: Friday, June 27 2025'. Place it as the rightmost item in the conditions band at the top of the guide, in the same small monospace font style as the other band items, using a neutral color like the existing SAND or MIST variable.
6. Keep all structure, styling, and non-conditions content exactly the same
7. Return ONLY the complete updated JSX file with no explanation, no markdown fences, no preamble

Important: if gauge data shows unavailable, keep existing conditions text unchanged for that metric."""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=16000,
        messages=[{"role": "user", "content": prompt}]
    )
    result = message.content[0].text

    # Guard: reject truncated output
    if message.stop_reason == "max_tokens":
        raise RuntimeError(
            f"Claude hit max_tokens limit updating {guide_name} — "
            f"output truncated. File not written. Increase max_tokens."
        )

    # Guard: reject output missing a valid export
    if "export default" not in result:
        raise RuntimeError(
            f"Claude output for {guide_name} is missing 'export default' — "
            f"likely malformed. File not written."
        )

    return result

# ── MAIN ────────────────────────────────────────────────────────────────────

conditions = fetch_conditions()

conditions_text = "\n".join([
    f"- {name}: {v['cfs']} CFS, {v['temp_c']}°C ({round(float(v['temp_c']) * 9/5 + 32, 1) if v['temp_c'] not in ['N/A','unavailable'] else 'N/A'}°F)"
    for name, v in conditions.items()
])

print(f"Conditions fetched:\n{conditions_text}")

# Friendly "Friday, June 27 2025" style date for the guide banners (no platform-specific %-d)
_d = date.today()
today_friendly = _d.strftime("%A, %B ") + f"{_d.day} {_d.year}"
print(f"Guide banner date: {today_friendly}")

# Potomac/Shenandoah guide
potomac_path = "guides/PotomacShenandoah/FlyGuide.jsx"
archive(potomac_path, "PotomacShenandoah")
updated_potomac = update_guide(potomac_path, "Upper Potomac and Shenandoah (Shepherdstown / Harpers Ferry area)", conditions_text)
write_file(potomac_path, updated_potomac)
print("Potomac guide updated.")

# Moorefield guide
moorefield_path = "guides/Moorefield/MoorefieldFlyGuide.jsx"
archive(moorefield_path, "Moorefield")
updated_moorefield = update_guide(moorefield_path, "South Branch Potomac at Moorefield WV (Hardy County)", conditions_text)
write_file(moorefield_path, updated_moorefield)
print("Moorefield guide updated.")

print(f"Done. Both guides updated for {today}.")
