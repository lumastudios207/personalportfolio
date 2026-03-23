import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("w-full relative", {
  variants: {
    variant: {
      default: [
        "border rounded-lg",
        "border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-950",
      ],
      corners: [
        "border rounded-md",
        "border-zinc-100 dark:border-zinc-700",
        "relative",
      ],
      "corners-light": [
        "border rounded-md",
        "border-black/[0.18]",
        "relative",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string
  description?: string
}

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props}>
    {props.children}
  </div>
))
CardContent.displayName = "CardContent"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CornerBordersDark = () => (
  <>
    <div className="border-white/20 size-6 absolute -top-0.5 -left-0.5 border-l-2 border-t-2 rounded-tl-md" />
    <div className="border-white/20 size-6 absolute -top-0.5 -right-0.5 border-r-2 border-t-2 rounded-tr-md" />
    <div className="border-white/20 size-6 absolute -bottom-0.5 -left-0.5 border-l-2 border-b-2 rounded-bl-md" />
    <div className="border-white/20 size-6 absolute -bottom-0.5 -right-0.5 border-r-2 border-b-2 rounded-br-md" />
  </>
)

const CornerBordersLight = () => (
  <>
    <div className="border-black/[0.18] size-6 absolute -top-0.5 -left-0.5 border-l border-t rounded-tl-md" />
    <div className="border-black/[0.18] size-6 absolute -top-0.5 -right-0.5 border-r border-t rounded-tr-md" />
    <div className="border-black/[0.18] size-6 absolute -bottom-0.5 -left-0.5 border-l border-b rounded-bl-md" />
    <div className="border-black/[0.18] size-6 absolute -bottom-0.5 -right-0.5 border-r border-b rounded-br-md" />
  </>
)

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, title, description, children, ...props }, ref) => {
    const content = (
      <CardContent>
        {title && (
          <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        )}
        {children}
      </CardContent>
    )

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        {variant === "corners" && <CornerBordersDark />}
        {variant === "corners-light" && <CornerBordersLight />}
        {content}
      </div>
    )
  },
)
Card.displayName = "Card"

export { Card, CardContent, CardHeader, cardVariants }
