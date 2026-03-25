import { Card, CardContent } from "@/components/ui/card"

const panels = [
  {
    number: "01",
    label: "Product\nDesign",
    description:
      "I work with founders and product teams to turn complex problems into intuitive web and mobile apps. From early discovery through high-fidelity UI, I bring a strategic lens to every design decision — grounded in user preferences and business objectives.",
  },
  {
    number: "02",
    label: "UI Component\nSystems",
    description:
      "I design and build scalable component libraries that bring consistency to your apps and speed to your engineering team. Every component is documented, responsive, and built with real-world usage patterns in mind.",
  },
  {
    number: "03",
    label: "Prototype\nDevelopment",
    description:
      "I close the gap between design and engineering by building interactive prototypes. Using modern frameworks and AI-augmented workflows, I deliver functional builds so product teams can ship faster.",
  },
]

export default function ServicePanels() {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3 md:p-10">
      {panels.map((panel) => (
        <Card
          key={panel.number}
          variant="corners"
          className="border-white/[0.14] bg-white/[0.06]"
        >
          <CardContent className="flex flex-col gap-4 p-3 md:p-4">
            <span className="text-sm font-medium text-[var(--color-accent)]">
              {panel.number}
            </span>
            <h3 className="whitespace-pre-line text-3xl font-medium text-white md:text-3xl">
              {panel.label}
            </h3>
            <p className="max-w-sm text-base leading-relaxed text-white/70">
              {panel.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
