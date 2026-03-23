"use client"

import { useState } from "react"

interface GallerySection {
  label: string
  title: string
  description: string
  images: { src: string; alt: string }[]
  sideImage?: string
}

interface Props {
  sections: GallerySection[]
}

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

export default function TabbedGallery({ sections }: Props) {
  const [activeTab, setActiveTab] = useState(0)
  const active = sections[activeTab]

  return (
    <div>
      {/* Tab navigation */}
      <div className="relative flex border-t border-white/[0.14]">
        <CornerNotches />
        {sections.map((section, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`relative px-6 py-4 text-sm font-medium uppercase tracking-[0.08em] transition-colors md:px-10 ${
              i > 0 ? "-ml-[20px]" : ""
            } ${
              i === activeTab
                ? "text-[#6D6D6D]"
                : "text-[var(--color-accent)]/75 hover:text-white"
            }`}
          >
            {section.label}
            {i === activeTab && (
              <span className="absolute bottom-0 left-6 right-6 h-[2px] bg-[var(--color-accent)] md:left-10 md:right-10" />
            )}
          </button>
        ))}
      </div>

      {/* Section headers — all rendered in place, only active one visible */}
      <div className="relative md:h-[280px] border-t border-white/[0.14]">
        <CornerNotches />
        {sections.map((section, i) => (
          <div
            key={i}
            className={`${i === activeTab ? "" : "hidden"} flex flex-col gap-5 px-6 pt-8 pb-12 md:absolute md:inset-0 md:justify-center md:px-10 md:pt-0 md:pb-0`}
          >
            {section.sideImage && (
              <div className="hidden md:block absolute inset-y-0 right-0 w-[33.333%] overflow-hidden">
                <img
                  src={section.sideImage}
                  alt={`${section.title} illustration`}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="md:w-2/3">
              <h2 className="text-3xl font-medium tracking-[-0.03em] text-white md:text-5xl">
                {section.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Images */}
      {active.images.map((img, i) => (
        <div
          key={`${activeTab}-${i}`}
          className="border-t border-white/[0.14] bg-white/[0.06] relative"
          style={{ padding: "7.5%" }}
        >
          <CornerNotches />
          <img
            src={img.src}
            alt={img.alt}
            className="w-full rounded object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}
