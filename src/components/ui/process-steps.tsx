"use client"

import { useState } from "react"
import iconDiscover from "@/assets/icon-discover.svg"
import iconExperiment from "@/assets/icon-experiment.svg"
import iconCreate from "@/assets/icon-create.svg"
import iconValidate from "@/assets/icon-validate.svg"
import processBg from "@/assets/process-bg.png"

interface ProcessStep {
  number: string
  title: string
  description: string
  bullets: string[]
  icon?: { src: string }
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Uncover",
    description: "Great product work starts by surfacing what others overlook. I dig into your business goals, user needs, and existing product ecosystem — including your design system maturity and front-end stack — so I can identify where focused design and engineering effort will move the needle fastest. The result is a shared understanding of priorities and a clear path to execution.",
    bullets: [
      "Product & UX Audit",
      "Review of Business Use Cases",
      "PRD Reviews",
      "Design System Review",
      "Codebase Assessment",
    ],
    icon: iconDiscover,
  },
  {
    number: "02",
    title: "Explore",
    description: "With priorities locked in, I move fast into divergent thinking — generating concepts, testing layout strategies, and pressure-testing ideas against real user scenarios. I use AI-augmented workflows to rapidly produce and evaluate design directions, which means I can put more options on the table in less time without sacrificing quality or intent. You see real thinking early, not polished designs weeks later.",
    bullets: [
      "Alignment with Product Team",
      "Concept Generation",
      "AI-Assisted Ideation",
      "Wireframing & Layouts",
      "Initial Component Modeling",
    ],
    icon: iconExperiment,
  },
  {
    number: "03",
    title: "Craft",
    description: "This is where design becomes product. I build high-fidelity interfaces and production-ready front-end components in parallel, closing the gap between what's designed and what's shipped. By working across Figma and code, I eliminate the traditional handoff bottleneck — engineering receives components they can integrate directly, not specs they need to reinterpret.",
    bullets: [
      "High-Fidelity UI",
      "Design System Development",
      "Production-Ready Components",
      "Interactive Prototypes",
      "Dev Handoff",
    ],
    icon: iconCreate,
  },
  {
    number: "04",
    title: "Validate",
    description: "Design isn't done when it looks right — it's done when it works right. I test interfaces with real users and real data, measuring usability, performance, and alignment with the business metrics we outlined in the Uncover phase. Because I deliver production-ready components, validation happens against actual product behavior — which means the insights are sharper and the iteration cycles are shorter.",
    bullets: [
      "Usability Testing",
      "Accessibility Audits",
      "Analytics Review",
      "Engineering Reviews",
      "Feature Refinement Planning",
    ],
    icon: iconValidate,
  },
]

function CornerNotches() {
  return (
    <div className="hidden md:block">
      <div
        className="absolute z-20 w-[6px] h-[10px]"
        style={{
          top: "-5px",
          left: "-1px",
          background: "rgba(255,255,255,0.14)",
          clipPath: "polygon(0 0, 100% 50%, 0 100%)",
        }}
      />
      <div
        className="absolute z-20 w-[6px] h-[10px]"
        style={{
          top: "-5px",
          right: "-1px",
          background: "rgba(255,255,255,0.14)",
          clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
        }}
      />
    </div>
  )
}

export default function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0)
  const active = steps[activeStep]

  return (
    <div>
      {/* Tab navigation — 2x2 grid on mobile, row on desktop */}
      <div className="relative grid grid-cols-2 md:flex border-t border-white/[0.14]">
        <CornerNotches />
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`relative flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium uppercase tracking-[0.08em] transition-colors md:justify-start md:px-8 ${
              i > 0 ? "md:-ml-[10px]" : ""
            } ${
              i >= 2 ? "border-t border-white/[0.14] md:border-t-0" : ""
            } ${
              i % 2 !== 0 ? "border-l border-white/[0.14] md:border-l-0" : ""
            } ${
              i === activeStep
                ? "text-[#6D6D6D]"
                : "text-[var(--color-accent)]/75 hover:text-white"
            }`}
          >
            <span className={`text-xs ${i === activeStep ? "text-[var(--color-accent)]" : ""}`}>
              {step.number}
            </span>
            {step.title}
            {i === activeStep && (
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--color-accent)] md:left-8 md:right-8" />
            )}
          </button>
        ))}
      </div>

      {/* Step content — stacked on mobile, side-by-side on desktop */}
      <div className="relative flex flex-col md:flex-row border-t border-white/[0.14] md:min-h-[330px]">
        <CornerNotches />

        {/* Full-height vertical divider */}
        <div className="hidden md:block absolute inset-y-0 right-[39%] w-px bg-white/[0.14] z-[1]" />

        {/* Title + description */}
        <div className="w-full md:w-[61%] p-6 md:p-10 flex flex-col relative overflow-hidden">
          <img
            src={processBg.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
          />
          <h2 className="relative z-10 mb-4 text-2xl font-medium text-white md:text-4xl">
            {active.title}
          </h2>
          <p className="relative z-10 leading-relaxed text-white/70">
            {active.description}
          </p>
        </div>

        {/* Chips — below on mobile, right side on desktop */}
        <div className="w-full md:w-[39%] flex items-center p-6 md:pl-10 md:pr-8 md:py-10 border-t border-white/[0.14] md:border-t-0">
          <div className="flex flex-wrap items-center gap-3">
            {active.bullets.map((bullet, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-md border border-white/[0.14] bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-white/70"
              >
                <span className="h-2 w-2 shrink-0 rounded-sm bg-[var(--color-accent)]" />
                {bullet}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
