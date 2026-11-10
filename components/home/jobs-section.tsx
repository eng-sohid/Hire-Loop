import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

const jobs = [
  {
    title: "Frontend Developer",
    description:
      "Craft beautiful, performant interfaces used by millions of job seekers.",
    location: "San Francisco, USA",
    type: "Remote",
    salary: "$120k – $160k",
  },
  {
    title: "Backend Engineer",
    description:
      "Design scalable APIs and services that power the HireLoop platform.",
    location: "New York, USA",
    type: "Hybrid",
    salary: "$130k – $170k",
  },
  {
    title: "Product Designer",
    description:
      "Shape end-to-end product experiences and our growing design system.",
    location: "London, UK",
    type: "Remote",
    salary: "$90k – $130k",
  },
  {
    title: "DevOps Engineer",
    description:
      "Automate infrastructure and keep deployments running smoothly at scale.",
    location: "Berlin, Germany",
    type: "On-site",
    salary: "$100k – $140k",
  },
  {
    title: "AI Engineer",
    description:
      "Ship LLM-powered features across matching, screening and interviews.",
    location: "Worldwide",
    type: "Remote",
    salary: "$150k – $200k",
  },
  {
    title: "Product Manager",
    description:
      "Drive roadmap decisions with data, customer insight and strong opinions.",
    location: "Austin, USA",
    type: "Hybrid",
    salary: "$110k – $150k",
  },
]

export function JobsSection() {
  return (
    <section className="bg-[#050505] px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] text-violet-400 uppercase">
            <Sparkles className="size-3" />
            Discover New Opportunities
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            The roles you&rsquo;d never find by searching
          </h2>
        </div>

        {/* Job Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="flex flex-col rounded-2xl border border-white/[0.07] bg-[#111111] p-5 transition-colors duration-200 hover:border-white/[0.14]"
            >
              <h3 className="text-[15px] font-semibold text-white">
                {job.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-zinc-400">
                {job.description}
              </p>

              {/* Meta */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex min-w-0 items-center gap-2 text-zinc-300">
                    <span className="size-1.5 shrink-0 rounded-full bg-violet-400" />
                    <span className="truncate">{job.location}</span>
                  </span>

                  <span className="ml-2 shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-zinc-400">
                    {job.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {job.salary}
                </div>
              </div>

              <Link
                href="/jobs"
                className="mt-5 inline-flex items-center gap-1.5 border-t border-white/[0.06] pt-4 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
              >
                Apply Now
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/jobs"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            View All Jobs
          </Link>
        </div>
      </div>
    </section>
  )
}
