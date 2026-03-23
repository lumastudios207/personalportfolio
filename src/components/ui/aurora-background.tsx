"use client"

import { cn } from "@/lib/utils"
import React, { type ReactNode } from "react"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `pointer-events-none absolute -inset-[10px] opacity-80 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
          style={{
            backgroundImage: [
              "repeating-linear-gradient(100deg, var(--white) 0%, var(--white) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--white) 16%)",
              "repeating-linear-gradient(100deg, var(--amber-300) 10%, var(--yellow-200) 15%, var(--amber-200) 20%, var(--orange-200) 25%, var(--yellow-300) 30%)",
            ].join(", "),
            backgroundSize: "300% 200%",
            backgroundPosition: "50% 50%",
            filter: "blur(10px)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: [
                "repeating-linear-gradient(100deg, var(--white) 0%, var(--white) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--white) 16%)",
                "repeating-linear-gradient(100deg, var(--amber-300) 10%, var(--yellow-200) 15%, var(--amber-200) 20%, var(--orange-200) 25%, var(--yellow-300) 30%)",
              ].join(", "),
              backgroundSize: "200% 100%",
              backgroundAttachment: "fixed",
              mixBlendMode: "soft-light",
              animation: "aurora 60s linear infinite",
            }}
          />
        </div>
      </div>
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  )
}
