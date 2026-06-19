# Response Questions

## 1. Walk us through your decisions.

**What did you prioritize and why?**

I focused on Tara's core need: knowing within 10 seconds whether a demo day is viable. That meant picking the right data points and building a UI that gives her the answer without making her read through anything.

For the data, I pulled four metrics from the weather and marine APIs: visibility, wind speed, wave height, and precipitation. I set thresholds at less than 2 nautical miles visibility, over 20 knots wind, over 4 feet wave height, and over 0.3 inches/hr precipitation. These are reasonable starting assumptions for safe coastal demo conditions, not values I'd ship permanently without checking them against what Tara and the boat captains actually use.

For the UI, the main decision was coloring the entire card, not just a badge. Tara can scan the 10-day grid and get the answer before reading a single word. Within each card, individual metric values also turn red when they breach their threshold, so she knows at a glance whether it is wind or waves or visibility causing the problem without opening anything. Clicking into a day opens a drawer with the hourly breakdown, where each row is color-coded and individual values are highlighted the same way. That way the default view stays clean but the detail is always one tap away if she needs to dig in.

**What did you leave out?**

I left out filtering by a specific time slot and instead used all 24 hours of data. This was a deliberate choice. The GO/NO-GO logic is built on worst-case values across the full day: minimum visibility, maximum wind speed, maximum precipitation/hr, maximum wave height. That means if conditions are dangerous during demo hours, they will always show up in the daily worst case and trigger NO-GO.

The real tradeoff is false positives. A day could get flagged NO-GO because of bad conditions at 2am when demo hours are perfectly clear. The drawer handles that: Tara can open it, see which hours are red, and make the call herself.

**If Tara were sitting next to you, what would you ask her before building the next version?**

What time do demos actually run, and does that vary? Have you ever had a cancellation that none of these four metrics would have caught, something like lightning or a tidal window? And are the thresholds I picked close to what the boat captains already work with, or are they off for this location?

## 2. How would you evolve this tool?

**How do you prioritize the following requests?**

- Adding other demo sites (Panama City, Norfolk, San Diego)
- Mobile version for boat captains
- Historical weather patterns so Tara can push back on leadership scheduling demos during storm season

Multi-site first. The coordinates are hardcoded in one place, so this is the lowest-effort change with the broadest impact. It makes the tool useful to every demo team, not just Gulfport.

Historical patterns second. This is the most strategically valuable feature for Tara. It shifts her from reactive, checking if tomorrow is ok, to proactive, being able to tell leadership not to schedule demos in September. It takes more effort since it needs a new data source and new UI, but the payoff is real: Tara gets a data-backed argument instead of just pushing back on instinct.

Mobile last. The responsive layout is already good enough for a captain to check conditions on a phone. Tara is the primary user and she's on a desktop. Mobile becomes more important as the feature set grows, but right now it is not blocking anyone.

**What would you build next?**

Configurable thresholds per site. Right now the NO-GO logic is hardcoded for Gulfport. When you add Panama City or Norfolk, conditions and risk tolerances could differ. Before adding more sites I would make thresholds configurable, either through a config file or a simple settings UI, so each location can be tuned independently. That is what makes multi-site actually work rather than just being a coordinate swap.
