"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock,
  Bookmark,
  SlidersHorizontal,
  X,
} from "lucide-react"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

type Job = {
  _id: string
  jobTitle: string
  company: string
  category: string
  employmentType: string
  workplaceType: string
  location: string
  salaryType: string
  minSalary: number
  maxSalary: number
  experienceLevel: string
  skills: string[]
  description: string
  createdAt: string
  status: string
}

const BrowseJobsClient = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [submittedSearch, setSubmittedSearch] = useState("")

  const [jobType, setJobType] = useState("")
  const [workplace, setWorkplace] = useState("")
  const [category, setCategory] = useState("")
  const [experience, setExperience] = useState("")
  const [location, setLocation] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const [page, setPage] = useState(1)
  const [savedJobs, setSavedJobs] = useState<string[]>([])

  const jobsPerPage = 6

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true)

      const params = new URLSearchParams()

      if (submittedSearch) params.set("search", submittedSearch)
      if (jobType) params.set("Type", jobType)
      if (workplace) params.set("isRemote", workplace)
      if (category) params.set("category", category)
      if (experience) params.set("experienceLevel", experience)
      if (location) params.set("location", location)
      if (sortBy) params.set("sortBy", sortBy)

      const response = await fetch(`${BASE_URL}/jobs?${params.toString()}`, {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch jobs")
      }

      const data = await response.json()

      setJobs(Array.isArray(data.jobs) ? data.jobs : [])
    } catch (error) {
      console.error("Fetch Jobs Error:", error)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }, [
    submittedSearch,
    jobType,
    workplace,
    category,
    experience,
    location,
    sortBy,
  ])

  useEffect(() => {
    setPage(1)
    fetchJobs()
  }, [fetchJobs])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmittedSearch(search.trim())
  }

  const clearFilters = () => {
    setSearch("")
    setSubmittedSearch("")
    setJobType("")
    setWorkplace("")
    setCategory("")
    setExperience("")
    setLocation("")
    setSortBy("recent")
    setPage(1)
  }

  const toggleSave = (id: string) => {
    setSavedJobs((previous) =>
      previous.includes(id)
        ? previous.filter((jobId) => jobId !== id)
        : [...previous, id]
    )
  }

  const totalPages = Math.ceil(jobs.length / jobsPerPage)
  const startIndex = (page - 1) * jobsPerPage
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage)

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-7">
          <p className="mb-2 text-sm text-blue-400">Public / Browse Jobs</p>

          <h1 className="text-3xl font-bold tracking-tight">
            Find Your <span className="text-violet-400">Dream Job</span>
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Discover opportunities that match your skills and career goals.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mb-7 flex flex-col gap-3 rounded-xl border border-zinc-800 bg-[#131316] p-3 sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-3 px-2">
            <Search size={19} className="shrink-0 text-zinc-500" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title, skills, keywords..."
              className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-zinc-600"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-7 py-3 text-sm font-semibold transition hover:bg-violet-500"
          >
            Search Jobs
          </button>
        </form>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Filters Sidebar */}
          <aside className="h-fit rounded-xl border border-zinc-800 bg-[#131316] p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-semibold">
                <SlidersHorizontal size={17} />
                Filters
              </h2>

              <button
                onClick={clearFilters}
                className="text-xs text-violet-400 hover:text-violet-300"
              >
                Clear all
              </button>
            </div>

            {/* Job Type */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium">Job Type</h3>

              <div className="space-y-3 text-sm text-zinc-400">
                {[
                  ["Full Time", "full-time"],
                  ["Part Time", "part-time"],
                  ["Contract", "contract"],
                  ["Freelance", "freelance"],
                ].map(([label, value]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input
                      type="radio"
                      name="jobType"
                      checked={jobType === value}
                      onChange={() => setJobType(value)}
                      className="accent-violet-500"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="my-5 border-t border-zinc-800" />

            {/* Workplace */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium">Workplace</h3>

              <div className="space-y-3 text-sm text-zinc-400">
                {[
                  ["Remote", "true"],
                  ["On-site / Hybrid", "false"],
                ].map(([label, value]) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input
                      type="radio"
                      name="workplace"
                      checked={workplace === value}
                      onChange={() => setWorkplace(value)}
                      className="accent-violet-500"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="my-5 border-t border-zinc-800" />

            {/* Category */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium">Category</h3>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-[#1c1c20] px-3 py-2.5 text-sm text-zinc-300 outline-none focus:border-violet-500"
              >
                <option value="">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="my-5 border-t border-zinc-800" />

            {/* Experience */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium">Experience Level</h3>

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-[#1c1c20] px-3 py-2.5 text-sm text-zinc-300 outline-none focus:border-violet-500"
              >
                <option value="">All Levels</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Junior">Junior</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="my-5 border-t border-zinc-800" />

            {/* Location */}
            <div>
              <h3 className="mb-3 text-sm font-medium">Location</h3>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onBlur={() => setPage(1)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur()
                  }
                }}
                placeholder="e.g. Dhaka"
                className="w-full rounded-lg border border-zinc-700 bg-[#1c1c20] px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-500"
              />
            </div>
          </aside>

          {/* Jobs Section */}
          <section>
            {/* Result Header */}
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold">
                  Found {jobs.length.toLocaleString()} Professional Jobs
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Explore the latest opportunities
                </p>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-zinc-800 bg-[#131316] px-3 py-2 text-xs text-zinc-300 outline-none focus:border-violet-500"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
              </select>
            </div>

            {/* Loading */}
            {loading && (
              <div className="rounded-xl border border-zinc-800 bg-[#131316] p-12 text-center text-sm text-zinc-400">
                Loading jobs...
              </div>
            )}

            {/* Empty State */}
            {!loading && jobs.length === 0 && (
              <div className="rounded-xl border border-zinc-800 bg-[#131316] p-12 text-center">
                <BriefcaseBusiness
                  size={35}
                  className="mx-auto mb-4 text-zinc-600"
                />
                <h3 className="font-semibold">No Jobs Found</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Try changing your search or filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium hover:bg-violet-500"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Job Cards */}
            {!loading && currentJobs.length > 0 && (
              <div className="space-y-4">
                {currentJobs.map((job) => (
                  <article
                    key={job._id}
                    className="rounded-xl border border-zinc-800 bg-[#131316] p-5 transition hover:border-violet-500/50 hover:bg-[#18181c]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-[#202027] text-lg font-bold text-violet-400">
                        {job.company?.charAt(0)?.toUpperCase() || "J"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-white">
                              {job.jobTitle}
                            </h3>

                            <p className="mt-1 text-sm text-zinc-400">
                              {job.company}
                            </p>
                          </div>

                          <button
                            onClick={() => toggleSave(job._id)}
                            aria-label="Save job"
                            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-violet-400"
                          >
                            <Bookmark
                              size={19}
                              fill={
                                savedJobs.includes(job._id)
                                  ? "currentColor"
                                  : "none"
                              }
                              className={
                                savedJobs.includes(job._id)
                                  ? "text-violet-400"
                                  : ""
                              }
                            />
                          </button>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs">
                          <span className="flex items-center gap-1 rounded-md bg-zinc-800 px-2.5 py-1.5 text-zinc-300">
                            <MapPin size={13} />
                            {job.location}
                          </span>

                          <span className="flex items-center gap-1 rounded-md bg-zinc-800 px-2.5 py-1.5 text-zinc-300">
                            <BriefcaseBusiness size={13} />
                            {job.employmentType}
                          </span>

                          <span className="flex items-center gap-1 rounded-md bg-zinc-800 px-2.5 py-1.5 text-zinc-300">
                            <Clock size={13} />
                            {job.workplaceType}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-md border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-300">
                              {job.salaryType}:{" "}
                              {job.minSalary?.toLocaleString()} -{" "}
                              {job.maxSalary?.toLocaleString()}
                            </span>

                            <span className="rounded-md border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-300">
                              {job.experienceLevel}
                            </span>

                            <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-xs text-emerald-400">
                              {job.status}
                            </span>
                          </div>

                          <span className="text-xs text-zinc-500">
                            {job.category}
                          </span>
                        </div>

                        {job.skills?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {job.skills.slice(0, 5).map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-7 flex items-center justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-lg border border-zinc-800 px-3 py-2 text-sm disabled:opacity-30"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`size-9 rounded-lg text-sm ${
                      page === number
                        ? "bg-violet-600 text-white"
                        : "border border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded-lg border border-zinc-800 px-3 py-2 text-sm disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default BrowseJobsClient
