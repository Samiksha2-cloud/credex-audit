## Day 1 — 2026-05-08

**Hours worked:** 2

**What I did:** Set up Next.js project with TypeScript, Tailwind CSS,
shadcn/ui components. Created GitHub repo, deployed to Vercel.
Live URL: https://credex-audit-five.vercel.app

**What I learned:** Next.js App Router folder structure, shadcn/ui
init process, Vercel deployment from GitHub.

**Blockers / what I'm stuck on:** None so far.

**Plan for tomorrow:** Build the spend input form with all 8 AI tools,
plans, seats, monthly cost. Add localStorage persistence.

## Day 2 — 2026-05-09

**Hours worked:** 4

**What I did:** Researched and recorded pricing for all 8 AI tools 
manually from official vendor pages. 
Created PRICING_DATA.md with 
source URLs. Built the spend input form with all tools, plans, seats, 
monthly spend fields. 
Added localStorage persistence so form data 
survives page reloads.

**What I learned:** 
How React useState and useEffect work together 
for form state management. 
How localStorage works in Next.js 
(need typeof window check for server-side rendering).

**Blockers / what I'm stuck on:** Gemini pricing is in INR — 
need to decide whether to convert to USD or keep both. 
Decision: will show USD equivalent in audit engine.

**Plan for tomorrow:** Build the audit engine logic — 
rules for each tool comparing actual spend vs optimal spend.