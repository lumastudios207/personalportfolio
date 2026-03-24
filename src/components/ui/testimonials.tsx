"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

import corepilotLogo from "@/assets/Client Logos/corepilot.png"
import spliteroLogo from "@/assets/Client Logos/splitero.svg"
import secureframeLogo from "@/assets/Client Logos/securefrmae.png"
import upwaveLogo from "@/assets/Client Logos/upwave-blue.svg"
import ziplineLogo from "@/assets/Client Logos/zipline.svg"
import buildpulseLogo from "@/assets/Client Logos/buildpulse.png"
import screenstepsLogo from "@/assets/Client Logos/screensteps_og.svg"
import leadgeniusLogo from "@/assets/Client Logos/leadgenius.svg"
import intricatelyLogo from "@/assets/Client Logos/intricately.png"
import intertrustLogo from "@/assets/Client Logos/intertrust.webp"
import spycloudLogo from "@/assets/Client Logos/spycloud.svg"
import constructoLogo from "@/assets/Client Logos/constructo.png"

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  logo: { src: string }
}

const testimonials: Testimonial[] = [
  {
    quote: "Ivan took our software from initial mockups to a well-designed web app in a matter of months, without compromising on quality. During 2+ years working together, he helped us iterate quickly, think through numerous design challenges, and ultimately scale to thousands of customers and become the leading platform for security and privacy compliance.",
    author: "Shrav Mehta",
    role: "CEO",
    company: "Secureframe",
    logo: secureframeLogo,
  },
  {
    quote: "Working with Ivan has made a huge difference for our team at Splitero. His work on our marketing site and web app has been nothing short of impressive. Ivan has a knack for creating designs that not only look great but also resonate deeply with our audience. He has been an exceptional design partner, and we are incredibly thankful for his contributions to our projects.",
    author: "Corey Aubuchon",
    role: "VP Product",
    company: "Splitero",
    logo: spliteroLogo,
  },
  {
    quote: "Ivan was a pivotal design partner when we launched a new web application for Upwave. He did a great job understanding complex design requirements and incorporating feedback quickly to create designs our whole team loved. He is also very efficient and consistently delivered on time. Would absolutely choose to work with Ivan again!",
    author: "Chloe Kurzon",
    role: "Product Manager",
    company: "Upwave",
    logo: upwaveLogo,
  },
  {
    quote: "Working with Ivan has been a fantastic experience. He combines a sharp design eye with a thoughtful process — offering multiple strong options up front and refining the chosen direction with precision. If you're looking for someone who consistently goes above and beyond, Ivan is the right fit for your team.",
    author: "Maddison Gay",
    role: "CEO",
    company: "CorePilot",
    logo: corepilotLogo,
  },
  {
    quote: "Ivan is not only an invaluable addition to our product development team, but also a delight to work with. His keen eye for intuitive UI regardless of industry has contributed greatly to creating products that our customers love using.",
    author: "David Endler",
    role: "Co-Founder",
    company: "SpyCloud",
    logo: spycloudLogo,
  },
  {
    quote: "Ivan has a great eye for both UX and Visual Design, and was able to take our team's Android app from concept to production in just a few months. He's a blast to work with, and a constant source of leadership and inspiration for the rest of the team.",
    author: "Daniel Vickery",
    role: "Director of UX",
    company: "Intertrust",
    logo: intertrustLogo,
  },
  {
    quote: "It was a pleasure working with Ivan. Throughout the entire project, he was always responsive and open to our feedback. Communication and project management was top notch, and we are super happy with the results.",
    author: "Sid Dange",
    role: "CEO",
    company: "BuildPulse",
    logo: buildpulseLogo,
  },
  {
    quote: "We have worked with Ivan for many years and have always been amazed at his speed and ability. He is always extremely responsive and receptive to feedback. He has been fantastic to work with.",
    author: "Greg DeVore",
    role: "CEO",
    company: "ScreenSteps",
    logo: screenstepsLogo,
  },
  {
    quote: "Ivan is an excellent full-stack designer! Whether you're looking for someone to provide intuitive user interfaces, organized information architecture, detailed interactions, or attractive and modern visual design, Ivan will partner with you to solve your design challenges and make your product a success.",
    author: "Dave Rolnitzky",
    role: "Head of Product",
    company: "LeadGenius",
    logo: leadgeniusLogo,
  },
  {
    quote: "Ivan's creativity and responsiveness made him a great partner as we reimagined and redesigned our website. I'm pleased with the results, and believe Ivan's expertise would make him an asset to many other startups that are looking to relaunch their marketing sites.",
    author: "Carl Kelm",
    role: "Director of Marketing",
    company: "Zipline",
    logo: ziplineLogo,
  },
  {
    quote: "We've worked closely with Ivan for quite some time. He has consistently delivered outstanding product design work and helped us create a beautiful and performing marketing site. Partnering with Ivan helped us create and ship product features quickly without sacrificing good design or compromising on the product experience.",
    author: "Michael Polack",
    role: "Co-Founder",
    company: "Intricately",
    logo: intricatelyLogo,
  },
  {
    quote: "Ivan was instrumental in helping me lay the marketing foundation at Constructo. In less than 90 days, he designed a 20-page site from scratch, created a bundle of sales collateral, and polished up our pitch deck for raising seed. He is fast, effective, and a pleasure to work with.",
    author: "KC Karnes",
    role: "VP of Marketing",
    company: "Constructo",
    logo: constructoLogo,
  },
]

// Desktop: 3 per page, Mobile: 2 per page
const desktopPages: Testimonial[][] = []
for (let i = 0; i < testimonials.length; i += 3) {
  desktopPages.push(testimonials.slice(i, i + 3))
}
const mobilePages: Testimonial[][] = []
for (let i = 0; i < testimonials.length; i += 2) {
  mobilePages.push(testimonials.slice(i, i + 2))
}

function SplitText({ text }: { text: string }) {
  const words = text.split(" ")
  return (
    <span className="inline">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.35,
            delay: i * 0.02,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="mb-6">
        <img
          src={t.logo.src}
          alt={`${t.company} logo`}
          className="h-10 w-auto max-w-[160px] object-contain"
        />
      </div>

      {/* Quote */}
      <blockquote className="mb-6 text-sm font-light leading-relaxed tracking-tight text-[var(--color-text)] md:text-base">
        {t.quote}
      </blockquote>

      {/* Author with accent line */}
      <div className="relative pl-4">
        <div
          className="absolute bottom-0 left-0 top-0 w-px"
          style={{ backgroundColor: "var(--color-accent)" }}
        />
        <span className="block text-sm font-medium tracking-wide text-[var(--color-text)]">
          {t.author}
        </span>
        <span className="mt-0.5 block text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
          {t.role} — {t.company}
        </span>
      </div>
    </div>
  )
}

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Auto-scroll every 8 seconds, pause on hover or manual interaction
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused || isHovered) return
    const timer = setInterval(() => {
      setActiveIndex((p) => (p + 1) % pages.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [paused, isHovered, activeIndex])

  const handleManualNav = (index: number) => {
    setActiveIndex(index)
    setPaused(true)
    // Resume auto-scroll after 20 seconds of no interaction
    setTimeout(() => setPaused(false), 20000)
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY],
  )

  const handleNext = () => {
    handleManualNav((activeIndex + 1) % pages.length)
  }

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleManualNav((activeIndex + 1) % pages.length)
      if (e.key === "ArrowLeft") handleManualNav((activeIndex - 1 + pages.length) % pages.length)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const [mobileIndex, setMobileIndex] = useState(0)

  const handleMobileNav = (index: number) => {
    setMobileIndex(index)
    setPaused(true)
    setTimeout(() => setPaused(false), 20000)
  }

  const desktopPage = desktopPages[activeIndex]
  const mobilePage = mobilePages[mobileIndex]

  return (
    <>
      {/* ===== MOBILE ===== */}
      <div
        className="px-2 py-12 md:hidden"
        onClick={() => handleMobileNav((mobileIndex + 1) % mobilePages.length)}
      >
        {/* Cards — normal flow, auto height */}
        <div className="flex flex-col gap-8">
          {mobilePage.map((t, i) => (
            <div
              key={`m-${mobileIndex}-${i}`}
              className={i > 0 ? "border-t border-black/[0.18] pt-8" : ""}
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        {/* Dot navigation */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {mobilePages.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                handleMobileNav(i)
              }}
              aria-label={`Go to testimonials page ${i + 1}`}
              className={`transition-all ${
                i === mobileIndex
                  ? "h-2.5 w-2.5 bg-[var(--color-text)]"
                  : "h-2.5 w-2.5 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div
        ref={containerRef}
        className="relative hidden cursor-none py-16 md:block"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleNext}
      >
        {/* Custom magnetic cursor */}
        <motion.div
          className="pointer-events-none absolute z-50"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className="flex items-center justify-center rounded-full bg-[var(--color-accent)]/90"
            animate={{
              width: isHovered ? 72 : 0,
              height: isHovered ? 72 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            <motion.span
              className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text)]"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
            >
              Next
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Three-column testimonial cards — fixed height */}
        <div className="relative h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="absolute inset-0 grid grid-cols-3"
            >
              {desktopPage.map((t, i) => (
                <div
                  key={`${activeIndex}-${i}`}
                  className={`${i > 0 ? "border-l border-black/[0.18] pl-8" : ""} ${i < desktopPage.length - 1 ? "pr-8" : ""}`}
                >
                  <TestimonialCard t={t} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {desktopPages.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                handleManualNav(i)
              }}
              aria-label={`Go to testimonials page ${i + 1}`}
              className={`transition-all ${
                i === activeIndex
                  ? "h-2.5 w-2.5 bg-[var(--color-text)]"
                  : "h-2.5 w-2.5 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Testimonial
