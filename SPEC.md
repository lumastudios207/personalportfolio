# SPEC.md — Ivan Annikov Portfolio Site

> **How to use this document:** This is the single source of truth for the project.
> At the start of every Claude Code session, reference this file with:
> *"Read SPEC.md in full before proceeding."*
> Do not deviate from tokens, component names, or page structure without updating this file first.

---

## 1. Project Overview

Personal portfolio site for Ivan Annikov, fractional product designer specializing in UX/UI
for SaaS products. Primary audience: tech company founders and CEOs at seed to Series B stage.
The site doubles as a case study showcase and lead generation tool.
Primary goal: drive discovery calls and new fractional design engagements.

---

## 2. Tech Stack

- **Framework:** Astro 5
- **Styling:** Tailwind CSS v4
- **Interactive components:** React (as Astro islands, `client:load` or `client:visible` only where needed)
- **Content:** Markdown / MDX content collections for case studies
- **Deployment target:** Vercel
- **No CMS** — all content managed via MDX frontmatter and component props

---

## 3. Design Tokens

### Colors
```
--color-primary:     #FFFFFF
--color-accent:      #F7C63B
--color-background:  #0D0D0D
--color-surface:     #F6F4F0
--color-text:        #0D0D0D
--color-text-muted:  #6D6D6D
```

**Palette notes:**
Dark-base site. Most pages sit on `#0D0D0D` background with `#FFFFFF` primary text.
`#F7C63B` accent is reserved for CTAs, highlights, and hover states — use sparingly.
`#F6F4F0` surface is used for cards, panels, and light-mode sections where contrast is needed.
`#6D6D6D` is for secondary copy, captions, metadata.

### Typography
- **Font family:** IBM Plex Sans — used for all type roles (display, UI, body)
- **Google Fonts import:** `https://fonts.google.com/specimen/IBM+Plex+Sans`
- **Display / Headlines:** IBM Plex Sans 700, `letter-spacing: -0.03em`
- **UI / Nav / Labels / Subheadings:** IBM Plex Sans 500–600
- **Body copy:** IBM Plex Sans 400, `letter-spacing: 0`
- **Note for Claude Code:** Apply negative tracking (`-0.03em`) to all headings at `text-4xl`
  and above to achieve a compressed, modernist appearance consistent with the design intent.

### Spacing
- Use Tailwind spacing scale
- Section vertical padding: `py-24` desktop / `py-16` mobile
- Max content width: `1280px`, centered with `mx-auto px-6`

### Breakpoints
- Mobile: `< 768px`
- Tablet: `768px–1023px`
- Desktop: `≥ 1024px`

---

## 4. Reference Material

> Claude Code must read all reference material before building any component.

### Cloned Site — Component Reference
**Location:** `/design-refs/cloned-site/`

A fully coded site has been provided as a reference implementation. Before building any
component, check this folder for an equivalent. When a matching component exists:
- Study its HTML structure, class patterns, and spacing logic
- Emulate the layout and interaction approach
- Adapt to this project's design tokens and content structure
- Do not copy verbatim — extract the pattern, rewrite for this stack

### Screenshot References
**Location:** `/design-refs/screenshots/`

Visual direction references for specific components and sections. Each screenshot is named
to match the component or section it informs. Reference these alongside written specs below.
When a screenshot is available, it takes precedence over written layout descriptions where
they conflict.

---

## 5. Site Map

| Route | Page | Notes |
|---|---|---|
| `/` | Homepage + Work Index | Hero, client logos, testimonials, case study grid |
| `/work/[slug]` | Individual Case Study | Dynamic route from MDX content collection |
| `/process` | Design Process | Static page |
| `/contact` | Contact | Form, resume download, social links, location |

---

## 6. Global Components

### `<Nav>`
- **Layout:** Logo flush left, nav links + CTA flush right
- **Links:** Work, Process, Contact
- **Active state:** "Work" is selected/active on homepage
- **CTA:** "Schedule a Call" button, right of nav links — style with `--color-accent`
  - Links to: `https://calendly.com/iannikov/call-with-ivan-about-design`
  - Opens in new tab (`target="_blank"`)
  - This is the **only** CTA on the site — no CTA button in the hero section
- **Behavior:** Sticky. Transparent over hero, transitions to solid `--color-background` on scroll
- **Mobile:** Hamburger menu (React island for toggle state)
- **Reference:** `/design-refs/screenshots/nav.png` if available

### `<Footer>`
- Social icons: LinkedIn, Dribbble
- Location: `Portland, Maine` — displayed as plain text, no link required
- Copyright line: `© [YEAR] Ivan Annikov. All rights reserved.`
- Minimal layout — no heavy content

---

## 7. Page Specs

---

### 7.1 Homepage `/`

Sections in order:

#### 1. `<Nav>` — see Global Components

#### 2. Hero Section
- **No CTA button** — CTA lives in the navbar only. Hero is purely identity-focused.
- **Layout:** Full-bleed, typographic-forward. Name is the dominant visual element —
  displayed in large, bold, full-width type (uppercase, IBM Plex Sans 700, tight tracking).
  Portrait photo of Ivan integrated into the layout (overlaid on or between the name letterforms,
  or positioned alongside). Title and subtitle as secondary supporting text, smaller scale.
- **Elements (in order of visual hierarchy):**
  1. **Full name** — `IVAN ANNIKOV` — massive display type, near full viewport width
  2. **Portrait photo** — high quality, cut-out or duotone treatment. Integrated with name type.
  3. **Title** — `[TITLE]` e.g. "Fractional Product Designer" — IBM Plex Sans 500, muted color
  4. **Subtitle** — `[SUBTITLE]` — one short sentence, `--color-text-muted`, smaller size
- **Visual reference:** `/design-refs/screenshots/hero-ref.png` — editorial layout with
  oversized name, portrait photo layered into composition, minimal supporting text.
  Adapt color palette to dark background (`#0D0D0D`) and white/accent type.
- **Height:** Minimum `100vh`
- **Note for Claude Code:** The name treatment should feel magazine/editorial —
  letterforms large enough to nearly span the full viewport width at desktop.

#### 3. How I Help Section
- Sits directly below the hero — first content section after the identity statement
- **Section title:** `[HOW I HELP TITLE]` — e.g. "How I help product teams move faster"
- **Section subtitle:** `[HOW I HELP SUBTITLE]` — one supporting sentence, muted color
- **Four expertise panels** displayed below the title/subtitle copy:

| Panel | Label | Description |
|---|---|---|
| 1 | Product Design | UX & UI for SaaS products — end-to-end design from research through high-fidelity UI, including interactive prototypes built in code for faster validation |
| 2 | Design Systems | Production-ready component libraries your engineering team can ship directly from |
| 3 | Brand Identity Design | Visual identity, logo systems, and brand language for early-stage companies |
| 4 | Web Design & Development | Fully built marketing sites delivered using Astro — fast, content-driven, with custom graphics and page layouts |

- **Panel layout:** Left to Claude Code — should feel considered and design-intentional,
  not a generic equal-column grid. Consider varying panel sizes, typographic hierarchy within
  each panel, or a layout that gives Panel 1 (Product Design) slightly more visual weight
  as the primary service. Four panels lend themselves well to a 2×2 grid or a 4-column
  row at desktop — both are valid starting points.
- **Panel contents (each):**
  - Label / service name — prominent
  - 1–2 sentence description — muted color, smaller type
  - Optional: a small icon or number (01–05) as a visual anchor
- **Background:** Can use `--color-surface` panels on dark background, or dark panels with
  subtle border — defer to cloned site reference for card treatment
- **Reference:** `/design-refs/cloned-site/` — check for existing card or panel component

#### 4. Client Logo Marquee
- Horizontally scrolling, auto-playing marquee of client logos
- Infinite loop, smooth scroll, no pause on hover required
- Logos in monochrome / white to sit on dark background
- **Placeholder logos:** `[CLIENT LOGO 1]` through `[CLIENT LOGO 6]`
- **Reference:** `/design-refs/cloned-site/` — check for existing marquee component

#### 5. Testimonials / Client Reviews
- Card-based layout — horizontal scroll or grid (defer to screenshot reference)
- **Each card contains:**
  - Company logo
  - Quote text: `[CLIENT QUOTE]`
  - Client first + last name: `[FIRST NAME LAST NAME]`
  - Role / title at company: `[ROLE, COMPANY]`
- Cards use `--color-surface` background on dark page for contrast
- **Reference:** `/design-refs/screenshots/testimonials.png` if available

#### 6. Case Study Panel Grid
- Grid layout — 2 columns desktop, 1 column mobile
- **Each card contains:**
  - Company name
  - Project description: `[PROJECT DESCRIPTION]`
  - Work type tag — one of two categories: `Product Design` or `Marketing Design`
  - Preview image: `[PROJECT PREVIEW IMAGE]`
  - Link: "View Details →" linking to `/work/[slug]`
- Cards link to individual case study pages
- **Reference:** `/design-refs/screenshots/case-study-grid.png` if available

#### 7. `<Footer>` — see Global Components

---

### 7.2 Individual Case Study `/work/[slug]`

Powered by MDX content collections. Each `.mdx` file in `/src/content/work/` maps to a slug.

#### Frontmatter schema (MDX):
```yaml
---
company: "[Company Name]"
location: "[City, Country]"
description: "[Brief project description]"
previewImage: "[path/to/image]"
workTypes: ["product-design"] # or ["product-design", "marketing-design"]
# "product-design" renders as "Product Design"
# "marketing-design" renders as "Marketing Design"
contributions:
  - "[Contribution 1]"
  - "[Contribution 2]"
clientQuote: "[Large pull quote from client]"
clientLogo: "[path/to/logo]"
order: 1 # for prev/next navigation
---
```

#### Sections in order:

#### 1. `<Nav>` — same as global, no active state change needed

#### 2. Case Study Hero
- Company name — large heading
- Location — muted, small
- Brief project description
- Preview image — full-width or large featured image
- **Contributions block:** stylized bullet list of Ivan's contributions to the project
  - Visual treatment: use accent color marker or custom styled list

#### 3. Client Pull Quote
- Large, typographically prominent quote
- Company logo beneath or beside
- Full-width section, consider `--color-surface` or accent background treatment

#### 4. Work Sections (conditional sub-navigation)
- **If `workTypes` contains only `product-design`:** render single work section, no sub-nav
- **If `workTypes` contains both:** render sticky or inline sub-navigation tabs:
  `Product Design | Marketing Design`
- Each work section contains:
  - Section heading (work type label)
  - Paragraph about the project: `[WORK SECTION BODY COPY]`
  - **Screenshot groups** — one or more groups, each with:
    - Group title: `[SCREENSHOT GROUP TITLE]`
    - Group subtitle: `[SCREENSHOT GROUP SUBTITLE]`
    - One or more images

#### 5. Project Navigation
- Previous / Next project links at bottom of page
- Show: company name + preview thumbnail for each
- Derive order from `order` frontmatter field

#### 6. `<Footer>`

---

### 7.3 Design Process `/process`

> **Detailed section breakdown TBD.** Build this page last.
> Placeholder: render `<Nav>`, a heading `[PROCESS PAGE HEADLINE]`, body copy `[PROCESS BODY]`, and `<Footer>`.

---

### 7.4 Contact `/contact`

#### Sections:

#### 1. `<Nav>`

#### 2. Contact Form (React island — `client:load`)
Three fields:
- **Name:** text input, required
- **Email:** email input, required
- **Message:** textarea, required
- **Submit button:** accent-colored CTA — `[SUBMIT LABEL]`
- Client-side validation before submit
- Success/error state handling

#### 3. Supporting Info
- **Location:** `Portland, Maine` — plain text, no link
- **Resume download:** Button or text link to download PDF — file path: `/public/resume.pdf`
- **Social links:** LinkedIn, Dribbble — matching icons used in footer

#### 4. `<Footer>`

---

## 8. Content Placeholders

When content is not yet provided, Claude Code must use these placeholder conventions —
never invent real copy, names, or testimonials:

| Content type | Placeholder format |
|---|---|
| Headlines | `[HEADLINE]` |
| Body copy | `[BODY COPY]` |
| Client quotes | `[CLIENT QUOTE]` |
| Names | `[FIRST NAME LAST NAME]` |
| Roles | `[ROLE, COMPANY]` |
| Images | `[IMAGE: description]` |
| URLs / links | `[LINK]` |
| Resume file | `[RESUME PDF PATH]` |

---

## 9. Behavior & Interactions

- **Nav:** Transparent over hero, solid `--color-background` on scroll
- **CaseStudyCard:** Subtle lift on hover — `scale-[1.02]`, increased shadow
- **Logo Marquee:** Auto-scroll, infinite loop, CSS animation preferred over JS
- **Sub-navigation (case study):** Smooth scroll or tab switch — no page reload
- **Contact form:** React island with controlled inputs and inline validation messages
- **Page transitions:** None — keep fast and clean
- **Animations:** Subtle entrance animations on scroll for sections (use `IntersectionObserver`
  or a lightweight Astro-compatible library). Nothing flashy.

---

## 10. Build Sequence for Claude Code

Follow this order across sessions. Complete each step fully before moving to the next.

```
Session 1:  Project scaffold — Astro + Tailwind config, design tokens as CSS vars,
            base layout, fonts loaded, folder structure established

Session 2:  Global components — <Nav> (with scroll behavior), <Footer>

Session 3:  Homepage — section by section, in order

Session 4:  Individual Case Study page — MDX schema + dynamic route + all sections

Session 5:  Contact page

Session 6:  Process page

Session 7:  QA pass — visual review, responsive fixes, interaction polish
```

---

## 11. Open Items (resolve before Session 1)

- [x] Typography — **IBM Plex Sans**, single family across all roles
- [x] Hero section layout — **Full-bleed, typographic/editorial** (large name + portrait + title/subtitle)
- [x] Hero CTA — **None** — CTA is navbar only
- [x] Nav CTA label — **"Schedule a Call"**
- [x] Nav CTA link — `https://calendly.com/iannikov/call-with-ivan-about-design` (opens new tab)
- [x] Contact page — **Portland, Maine** (city/state only)
- [x] Footer location — **Portland, Maine**
- [x] Social platforms — **LinkedIn, Dribbble** (footer + contact page)
- [x] Resume — **PDF download**, stored at `/public/resume.pdf`
- [x] Work type category labels — **"Product Design"** and **"Marketing Design"**
- [x] Case study slug — **company name** (e.g., `/work/acme`)

- [ ] Hero portrait photo — provide cut-out PNG or high-res photo for hero integration
- [ ] Title line for hero — confirm exact wording (e.g. "Fractional Product Designer")
- [ ] Subtitle line for hero — confirm one-sentence descriptor
