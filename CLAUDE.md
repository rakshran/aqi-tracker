# AQI Tracker — Mobile Responsiveness Project

## Project Overview

Data visualization site: **"Historical Air Pollution Trends — A Visual Investigation into Urban Air Quality"**
Hosted at: `aqi-tracker-lilac.vercel.app`

**The desktop design is FROZEN.** All work is mobile-only (≤768px viewport).

## Tech Stack

- **Framework:** React 18.3.1 + Vite 6.0.3
- **CSS:** Tailwind CSS 3.4.17 (utility-first, no CSS-in-JS)
- **Charts:** Recharts 2.12.7 (LineChart with custom tooltip, ReferenceDot diamonds)
- **Animations:** Motion 11.11.17 (minimal usage)
- **Fonts:** Lora (serif), Inter (sans)
- **Utility:** clsx + tailwind-merge via `src/utils/cn.js`

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main layout: header, two-column grid, sidebar drawer |
| `src/components/PollutionChart.jsx` | Recharts chart, pollutant toggles, custom tooltip, data table |
| `src/components/InterventionsPanel.jsx` | Sidebar intervention cards with highlight animation |
| `src/components/CitySelector.jsx` | Custom select dropdown |
| `src/components/AboutDataModal.jsx` | Data methodology modal |
| `src/components/AboutSelectionModal.jsx` | Selection bias modal |
| `src/data/citiesData.js` | 8 cities with historical pollution data & interventions |
| `src/index.css` | Tailwind directives + editorial component classes |
| `tailwind.config.js` | Custom colors (canvas, ink, accent, grid), fonts, letter-spacing |

## Breakpoint Architecture

| Prefix | Width | Current Usage |
|--------|-------|---------------|
| `md:` | 768px | Typography, padding scaling |
| `lg:` | 1024px | Layout grid shift (single → two-column), sidebar behavior |

### CRITICAL: Breakpoint Realignment Needed

The spec defines mobile as ≤768px. The codebase currently uses `lg:` (1024px) for the layout shift.
The spec requires tablets (769–1023px) to show the **desktop** layout.
**Action:** Move layout breakpoint from `lg:` to `md:` so the two-column layout kicks in at 768px.

## Desktop Protection Rules (MUST follow)

1. **All CSS overrides** must live inside Tailwind responsive prefixes (`md:` for ≥768px desktop behavior). No unscoped CSS rules.
2. **New DOM elements** (backdrop, close button, trigger link) must be hidden on desktop (`hidden md:block` or `md:hidden` as appropriate).
3. **Do NOT modify any existing CSS property outside a mobile scope.**
4. **Chart/SVG logic:** Use `window.innerWidth <= 768` to conditionally apply mobile values. Do not change desktop defaults.
5. **Tooltip positioning:** Gate mobile flip/anchor logic behind viewport width check.
6. **External link `target="_blank"`** is the ONE global change allowed.

## Desktop Layout (frozen reference)

```
┌─────────────────────────────────────────────────────┐
│ Header: Title + Subtitle + "ABOUT" link top-right   │
├──────────────────────────┬──────────────────────────┤
│ Main (~70%)              │ Sidebar (~30%)           │
│ City Selector            │ KEY INTERVENTIONS        │
│ Description              │ Causation note           │
│ GRAPH / DETAILS tabs     │ Vertical timeline:       │
│ 6 pollutant pill toggles │  • 1970 Clean Air Act    │
│ Note/disclaimer          │  • 1975 Catalytic Conv.  │
│ Multi-line time-series   │  • 1990 Reformulated Gas │
│ chart (diamonds, tooltip,│  • 2006 Port Clean Air   │
│ dashed interpolation)    │                          │
└──────────────────────────┴──────────────────────────┘
```

## Mobile Issues — Implementation Phases

### Phase 1: P0 — Critical Fixes
| # | Issue | Summary |
|---|-------|---------|
| 1 | Key Interventions Drawer | Add close button, inline trigger link, verify backdrop, prevent body scroll behind drawer |
| 2 | Tooltip Overflow | Tooltip clips off right edge on 2005–2023 data points — flip to left on mobile |

### Phase 2: P1 — Usability
| # | Issue | Summary |
|---|-------|---------|
| 3 | Chart Too Small | Increase min-height, reduce x-axis ticks, enlarge diamond tap targets on mobile |
| 5 | Excessive Vertical Spacing | Reduce padding between header/selector/chart on mobile |

### Phase 3: P2 — Polish
| # | Issue | Summary |
|---|-------|---------|
| 4 | Pollutant Pills Tight | 6 pills crammed, increase gap or allow 2-row layout on mobile |
| 6 | Subtitle Orphan | "QUALITY" orphaned — prevent with nowrap or text adjustment |
| 7 | External Links | All `<a>` tags need `target="_blank" rel="noopener noreferrer"` |

### Phase 4: P3 — Enhancement
| # | Issue | Summary |
|---|-------|---------|
| 8 | Hamburger Menu | Conflates nav/sidebar — relabel or change icon |

## Desktop Regression Checklist (run after EVERY phase)

At 1024×768, 1280×800, 1440×900, 1920×1080 verify:
- [ ] Two-column layout (main + sidebar) unchanged
- [ ] Chart dimensions, tick labels, marker sizes, tooltip behavior unchanged
- [ ] Key Interventions sidebar visible in-place — no close button, no backdrop
- [ ] No "View Key Interventions →" link visible
- [ ] Pollutant pills in single row with original spacing
- [ ] All vertical spacing/padding unchanged
- [ ] Subtitle on one line, no inserted `<br>` visible
- [ ] "ABOUT" link visible in header (not behind hamburger)
- [ ] No horizontal scroll

**Tablet (769–1023px):** Must show desktop layout. Mobile styles must NOT leak.

## Color Palette Reference

```
canvas: #FDFBF7   ink: #1A1A1A   accent: #F2C94C   grid: #E5E5E5
pm25: #1A1A1A   pm10: #6B6B6B   so2: #8B3A7A
no2: #3B5998    o3: #7A9A6D     co: #B87333
```

## Quality Bar

Data journalism site. Think Our World in Data or NYT interactives on mobile. Every interaction intentional, every transition smooth, every tap target generous (44px minimum).
