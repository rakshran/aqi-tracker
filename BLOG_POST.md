# I built a data journalism site about air pollution in 25 days. Here's what actually happened.

Jan 14th I had an idea. I wanted to see if air quality in cities actually got better after governments passed clean air laws. Like, did the Clean Air Act actually *do* anything? You can google this and get a million PDF reports. But there's no simple interactive thing where you pick a city and just *see* the lines go down.

So I built it.

**aqi-tracker-lilac.vercel.app**

React, Vite, Tailwind, Recharts. Deployed on Vercel. 8 cities. 6 pollutants. 70 years of data for some cities. You pick Los Angeles and you can literally watch PM10 drop from 185 in 1955 to 28 in 2023. Diamond markers on the chart show when specific policies kicked in. Click a diamond and the sidebar highlights which intervention it was.

The whole thing fits in one viewport. No scrolling to find the chart. No scrolling to find the interventions. Everything visible at once. That was intentional.

## The stack

Nothing fancy:

- React 18 + Vite
- Tailwind CSS (utility classes, no CSS-in-JS nonsense)
- Recharts for the line charts
- Motion for tiny animations
- Lora + Inter fonts
- Deployed to Vercel

Total dependencies in package.json: minimal. No state management library. No router. It's one page.

## What it actually shows

8 cities:

- **Los Angeles** (1955-2023) — the OG smog city that actually fixed it
- **London** (1952-2023) — started after 12,000 people died in the Great Smog. wild.
- **Beijing** (1998-2023) — the dramatic recent drop everyone talks about
- **Tokyo** (1965-2023) — quietly became one of the cleanest megacities on earth
- **Pittsburgh** (1940-2023) — steel city turned clean city
- **Mexico City** (1988-2023) — "Hoy No Circula" (no driving days) actually worked
- **Seoul** (1995-2023) — rapid industrialization then rapid cleanup
- **Delhi** (2010-2023) — the honest one. it's still bad.

6 pollutants tracked: PM2.5, PM10, SO2, NO2, O3, CO. Each toggleable. Each with its own color. The color palette is muted and editorial — think Our World in Data, not a SaaS dashboard.

## The interesting part: I asked Claude to critique it

This is where it gets real.

After building the initial version — charts working, interventions showing, data loaded — I asked Claude to write a comprehensive critique of the entire site. Like, rip it apart. What would a researcher say? What would a data journalist say? What would Twitter say?

The critique was brutal. And correct:

- **No citations.** I had data from EPA, DEFRA, CNEMC... but zero links to actual sources. A user could not verify a single number.
- **Implied causation.** Diamond markers on intervention years *strongly* suggest those policies caused the improvements. But air quality is multi-factorial. Confounders everywhere.
- **Survivorship bias.** I only picked cities where things got better. Where are the cities where policy failed? Where pollution got worse? I'm showing a highlights reel and calling it journalism.
- **Geographic bias.** 3 North American, 1 European, 4 Asian cities. Zero from Africa. Zero from South America. Zero from the Middle East.
- **Interpolated data shown as real data.** Some years had estimated values and I was displaying them the same as measured data. That's misleading.

So what did I do?

I built all of it into the site.

## The fixes

**Phase 1:** Added proper data citations and source attribution. Every city now has traceable sources.

**Phase 2:** Added causation vs correlation disclaimers. The sidebar now has a note that these interventions *coincided* with improvements, not that they *caused* them. Because intellectual honesty > looking smart.

**Phase 3:** Added selection bias transparency. There's an "About Selection" modal that straight up tells you: "This dataset is not representative of global air quality trends." It lists exactly what's missing and why. It warns you about the success-oriented bias. It tells you this might create false optimism.

**Phase 4:** Made interpolated data visually distinct — hollow circles instead of filled, dashed line segments instead of solid, "Est." badge in tooltips.

Then I redesigned the whole thing. Went full editorial. Cream background (#FDFBF7). Black ink (#1A1A1A). Gold accent (#F2C94C). Sharp corners everywhere. No rounded-lg. No shadows. It looks like a page from a research publication, not a web app.

## The mobile saga

Desktop was done. Looked great. Fit in one viewport. Editorial. Clean.

Mobile was a disaster.

The tooltip would clip off the right edge of the screen on newer data points. The sidebar drawer had no close button. The chart was tiny. The 6 pollutant toggle pills were crammed together with no room to tap. The word "QUALITY" in the subtitle was orphaned on its own line.

This became its own project. I wrote a full CLAUDE.md spec — breakpoint architecture, desktop protection rules, a regression checklist. The rule was simple: **desktop is frozen. Don't touch it. All work is mobile-only.**

31 pull requests later (and a bunch of direct commits for rapid fixes) — tooltip anchors to bottom of chart on mobile, interventions panel slides in as a proper drawer with backdrop and close button, chart height increased, x-axis ticks reduced, diamond tap targets enlarged.

The commit history tells the story. Lots of "mobile fixes", a "Revert mobile fixes", then "mobile fixes" again. The classic.

## 96 commits. 65 of them in one day.

Look at the git log. Jan 14: initial commit. Jan 15: feature explosion — multi-pollutant support, viewport redesign, golden stars, then removing golden stars, then fixing golden stars. Jan 16-18: data quality and critique work. Then a 3-week gap.

Feb 7: editorial redesign. Feb 8: 50+ commits in a single day. Mobile fixes, reverts, more fixes, header restructuring, dropdown bugs, portrait mode.

That's how building things actually works. It's not linear. It's bursts.

## The Claude thing

33 of the 65 non-merge commits are authored by Claude. I was writing prompts and merging PRs. Claude was writing React components, building critique documents, implementing data transparency features, fixing mobile bugs.

This is the new workflow. I had the idea. I had the editorial vision. I knew what "done" looked like. Claude did the implementation. I reviewed, tested, pushed back, asked for changes, merged.

Is this "building"? Yeah. Same way a founder who hires engineers is still building. The taste, direction, and quality bar are mine. The execution is collaborative.

## What I learned

**1. Self-critique is a feature.** Asking AI to destroy your own work before the internet does is underrated. The critique doc caught real issues that would have been embarrassing.

**2. Data journalism is hard.** Getting data is easy. Making data *honest* is hard. Selection bias, interpolation transparency, causation language — this stuff matters if you want to be credible.

**3. Mobile is always a second project.** You think you're building one thing. You're building two. Desktop and mobile are different products with different constraints.

**4. One viewport > scrolling.** Fitting everything into a single screen forces prioritization. If you can't see the chart and the interventions at the same time, the relationship between them is lost.

**5. Ship the ugly version.** The first version had shimmy-animating golden stars on the chart. I removed them. Then added them back. Then removed them again. Then redesigned the whole thing 3 weeks later. The editorial version looks nothing like v1. Doesn't matter. V1 existed. V2 was informed by v1.

## What's next

The honest answer: probably nothing. It works. It's live. It says what it needs to say. Not everything needs to be a business or a platform.

Sometimes you just want to know if the Clean Air Act worked.

It did. The chart shows it.

**aqi-tracker-lilac.vercel.app**
