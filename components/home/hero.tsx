"use client"

import { useState } from "react"
import Image from "next/image"
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Search,
  Smile,
  Users,
} from "lucide-react"

const trendingPositions = [
  "Product Designer",
  "AI/Programmer",
  "Dev-Ops Engineer",
]

const heroStats = [
  { value: "50K", label: "Active Jobs", icon: Search },
  { value: "12K", label: "Companies", icon: Building2 },
  { value: "2M", label: "Job Seekers", icon: Users },
  { value: "97%", label: "Satisfaction Rate", icon: Smile },
]

export function HeroSection() {
  const [keyword, setKeyword] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (keyword.trim()) params.set("search", keyword.trim())
    if (location.trim()) params.set("location", location.trim())

    window.location.href = `/jobs?${params.toString()}`
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#050505] px-4 pb-16 pt-16 sm:pt-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.035] to-transparent" />

        <div className="absolute bottom-[-100px] left-1/2 h-72 w-[500px] -translate-x-1/2 rounded-full bg-violet-700/15 blur-[130px]" />
      </div>

      {/* Background Particles */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 55 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-1 rounded-full bg-violet-500/40"
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 23 + 17) % 100}%`,
              opacity: ((i % 5) + 2) / 10,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Announcement Badge */}
        <div className="relative mb-7 flex items-center justify-center">
          <div className="absolute top-1/2 right-full mr-2 hidden h-px w-12 bg-gradient-to-l from-white/20 to-transparent sm:block" />

          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#151515]/90 px-4 py-2.5 shadow-[0_0_25px_rgba(255,255,255,0.04)]">
            <BriefcaseBusiness className="size-4 text-orange-400" />

            <span className="text-xs font-bold tracking-wide text-white">
              50,000+
            </span>

            <span className="text-xs font-medium tracking-wide text-zinc-500">
              NEW JOBS THIS MONTH
            </span>
          </div>

          <div className="absolute top-1/2 left-full ml-2 hidden h-px w-12 bg-gradient-to-r from-white/20 to-transparent sm:block" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl leading-tight font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-[42px]">
          Find Your Dream Job Today
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          HireLoop connects top talent with visionary companies. Discover
          thousands of job opportunities tailored to your skills and
          aspirations.
        </p>

        {/* Search Bar */}
        <div className="mt-9 flex w-full max-w-[580px] flex-col gap-2 rounded-xl border border-white/[0.13] bg-[#111111] p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] sm:flex-row sm:items-center">
          {/* Job Search */}
          <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
            <Search className="size-[17px] shrink-0 text-zinc-400" />

            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
              }}
              placeholder="Job Title, skill or company"
              className="h-9 w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-zinc-400"
            />
          </div>

          {/* Divider */}
          <div className="hidden h-6 w-px bg-white/15 sm:block" />

          {/* Location */}
          <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
            <MapPin className="size-[17px] shrink-0 text-zinc-400" />

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
              }}
              placeholder="Location or Remote"
              className="h-9 w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-zinc-400"
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            aria-label="Search jobs"
            className="flex h-9 shrink-0 items-center justify-center rounded-lg bg-[#6954f5] px-3.5 text-white transition-all duration-200 hover:bg-[#7967ff] hover:shadow-[0_0_18px_rgba(105,84,245,0.4)]"
          >
            <Search className="size-[17px]" />
          </button>
        </div>

        {/* Trending Positions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          <span className="mr-1 text-[11px] text-zinc-500">
            Trending:
          </span>

          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => setKeyword(position)}
              className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] text-zinc-300 transition-all duration-200 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white"
            >
              {position}
            </button>
          ))}
        </div>
      </div>

      {/* Globe */}
      <div className="relative mx-auto mt-10 h-[380px] max-w-6xl sm:h-[500px]">
        <Image
          src="/globe.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1152px"
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

        <p className="absolute inset-x-0 top-[44%] mx-auto max-w-md px-4 text-lg font-medium text-white sm:text-2xl">
          Assisting over 15,000 job seekers find their dream positions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="relative z-10 mx-auto -mt-24 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.08] bg-[#101010]/90 p-4 backdrop-blur-sm sm:p-5"
          >
            <stat.icon className="size-4 text-violet-300" />

            <p className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {stat.value}
            </p>

            <p className="mt-0.5 text-[11px] text-zinc-500 sm:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
