# CLAUDE.md

Read SPEC.md in full before writing any code.
Reference /design-refs/cloned-site/ before building any component.
Never deviate from design tokens in SPEC.md Section 3.
Ask before introducing any dependency not already in the stack.
Commit working code before starting a new section.
```

This means you don't have to manually remind Claude Code every session — it reads this automatically.

---

**2. Recommended folder structure to establish in Session 1**

Get Claude Code to scaffold this exact structure so every future session has a predictable home for everything:
```
/
├── SPEC.md
├── CLAUDE.md
├── design-refs/
│   ├── cloned-site/        ← drop your cloned site here
│   └── screenshots/        ← named reference images
├── public/
│   ├── resume.pdf
│   └── fonts/              ← if self-hosting IBM Plex Sans
├── src/
│   ├── components/
│   ├── content/
│   │   └── work/           ← MDX case study files go here
│   ├── layouts/
│   ├── pages/
│   └── styles/
│       └── global.css      ← CSS variables / design tokens live here
└── astro.config.mjs
```

---

**3. Define design tokens as CSS variables in Session 1 — not just Tailwind config**

Tailwind v4 uses CSS-first config, so your tokens should live in `global.css` as CSS custom properties first, then referenced in Tailwind. Tell Claude Code explicitly:
```
Define all design tokens from SPEC.md Section 3 as CSS custom properties 
in src/styles/global.css, then map them into Tailwind v4's theme via @theme.
```

This gives you tokens that work both in Tailwind classes *and* in any raw CSS you need — important for complex layouts like the hero.

---

**4. IBM Plex Sans — use Google Fonts with `preconnect`**

Tell Claude Code to load the font in your base layout using the standard Google Fonts pattern with preconnect hints for performance. Specify only the weights you need — 400, 500, 600, 700 — to keep the payload lean. Tailwind v4 makes it easy to set as the default font via `@theme`.

---

**5. Astro content collections — define the schema in Session 1**

Even if you have no real case study content yet, get Claude Code to create the Zod schema for your work collection in Session 1 alongside the scaffold. It's much harder to retrofit later. The frontmatter schema is already in SPEC.md Section 7.2 — just point Claude Code at it.

---

**6. One session = one clear deliverable**

The biggest Claude Code productivity trap is scope creep within a session. Each session in your build sequence should end with something you can open in a browser and visually verify. If Claude Code starts drifting into the next section unprompted, stop it and commit what works first.

---

**7. When handing off the cloned site**

Before dropping the cloned site folder, do a quick scan and note which specific components you want emulated — marquee, card style, nav behavior, etc. Then tell Claude Code explicitly at the start of the relevant session:
```
Before building the [Marquee] component, read the equivalent 
component in /design-refs/cloned-site/ and use it as your 
structural reference. Adapt to our stack and tokens.
```

Vague "use this as inspiration" instructions produce vague results. Named component targets produce tight ones.

---

**8. The one thing most people skip: a QA checkpoint prompt**

After each session, before moving on, run this:
```
Review everything built so far against SPEC.md. 
List any deviations, missing pieces, or decisions you made 
that aren't explicitly covered in the spec.

SPEC.md is updated regularly. At the start of every session, 
re-read it in full even if you have prior context. 
Always treat the current SPEC.md as the source of truth 
over any previous session's decisions.