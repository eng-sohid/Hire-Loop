import {
  BarChart3,
  Bookmark,
  FileText,
  GraduationCap,
  Scale,
  Search,
  Sparkles,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Search Jobs",
    description: "Find opportunities that benefit you.",
  },
  {
    icon: BarChart3,
    title: "Salary Insights",
    description: "Know your worth with real market data.",
  },
  {
    icon: Scale,
    title: "Pay Comparison",
    description: "Compare compensation packages easily.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Bookmark and revisit your favorite listings.",
  },
  {
    icon: Zap,
    title: "One-Click Apply",
    description: "Apply to multiple jobs in a single click.",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Build professional resumes in minutes.",
  },
  {
    icon: Sparkles,
    title: "Skill-Based Matching",
    description: "Get matched to openings that suit your skillset.",
  },
  {
    icon: GraduationCap,
    title: "Career Resources",
    description: "Access guides, templates and career advice.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-[#050505] px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] text-violet-400 uppercase">
            <Sparkles className="size-3" />
            Why HireLoop
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Everything you need to succeed
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title}>
              <div className="flex size-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
                <feature.icon className="size-4 text-violet-300" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
