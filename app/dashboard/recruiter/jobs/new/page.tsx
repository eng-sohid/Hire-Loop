"use client"

import React from "react"
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  DollarSign,
  CalendarDays,
  Plus,
  ArrowLeft,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { createJob } from "@/lib/actions/jobs"

const NewJobPage = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      const jobData = Object.fromEntries(formData.entries()) as Record<
        string,
        string
      >

      // Convert numeric fields
      const payload = {
        ...jobData,
        minSalary: jobData.minSalary ? Number(jobData.minSalary) : 0,
        maxSalary: jobData.maxSalary ? Number(jobData.maxSalary) : 0,
        vacancies: Number(jobData.vacancies),
        skills: jobData.skills.split(",").map((skill) => skill.trim()),
      }

      const result = await createJob(payload)

      console.log("Job Created:", result)

      if (result.success) {
        e.currentTarget.reset()
      }
    } catch (error) {
      console.error("Job Submission Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"

  const labelClass = "mb-2 block text-sm font-medium text-gray-700"

  return (
    <div className="min-h-screen bg-[#f8faf9] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/recruiter/dashboard"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-800">
                <Sparkles size={16} />
                Recruiter Workspace
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                Create a New Job
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Fill in the details below to publish your job opportunity.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <BriefcaseBusiness size={23} />
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <BriefcaseBusiness size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Basic Information
                </h2>
                <p className="text-xs text-gray-500">
                  Enter the basic details about the position.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClass}>Job Title *</label>
                <input
                  name="jobTitle"
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Developer"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Company Name *</label>
                <div className="relative">
                  <Building2
                    size={17}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    name="company"
                    type="text"
                    required
                    placeholder="Your company name"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Job Category *</label>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option>Technology</option>
                  <option>Design & Creative</option>
                  <option>Marketing</option>
                  <option>Finance & Accounting</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Customer Service</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Employment Type *</label>
                <select
                  name="employmentType"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select employment type
                  </option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Workplace Type *</label>
                <select
                  name="workplaceType"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select workplace type
                  </option>
                  <option>On-site</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
          </section>

          {/* Location & Salary */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <MapPin size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Location & Compensation
                </h2>
                <p className="text-xs text-gray-500">
                  Where will the candidate work and what will they earn?
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Job Location *</label>
                <input
                  name="location"
                  type="text"
                  required
                  placeholder="e.g. Dhaka, Bangladesh"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Salary Type *</label>
                <select
                  name="salaryType"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select salary type
                  </option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                  <option>Hourly</option>
                  <option>Negotiable</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Minimum Salary (BDT)</label>
                <div className="relative">
                  <DollarSign
                    size={17}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    name="minSalary"
                    type="number"
                    min="0"
                    placeholder="e.g. 20000"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Maximum Salary (BDT)</label>
                <div className="relative">
                  <DollarSign
                    size={17}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    name="maxSalary"
                    type="number"
                    min="0"
                    placeholder="e.g. 40000"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <Sparkles size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Candidate Requirements
                </h2>
                <p className="text-xs text-gray-500">
                  Specify the experience and skills you are looking for.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Experience Level *</label>
                <select
                  name="experienceLevel"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select experience level
                  </option>
                  <option>Entry Level</option>
                  <option>Junior</option>
                  <option>Mid Level</option>
                  <option>Senior</option>
                  <option>Expert</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Number of Vacancies *</label>
                <input
                  name="vacancies"
                  type="number"
                  min="1"
                  required
                  placeholder="e.g. 3"
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Required Skills *</label>
                <input
                  name="skills"
                  type="text"
                  required
                  placeholder="e.g. React, Next.js, TypeScript, Node.js"
                  className={inputClass}
                />
                <p className="mt-2 text-xs text-gray-400">
                  Separate skills with commas.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Job Description *</label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  placeholder="Describe the job role, daily activities and expectations..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Responsibilities *</label>
                <textarea
                  name="responsibilities"
                  required
                  rows={4}
                  placeholder="Describe the key responsibilities..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Educational Requirements</label>
                <textarea
                  name="education"
                  rows={3}
                  placeholder="e.g. Bachelor's degree in Computer Science or equivalent experience."
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>
          </section>

          {/* Application Details */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <CalendarDays size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Application Details
                </h2>
                <p className="text-xs text-gray-500">
                  Set the deadline for job applications.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Application Deadline *</label>
                <input
                  name="deadline"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Application Email</label>
                <input
                  name="applicationEmail"
                  type="email"
                  placeholder="careers@company.com"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <button
              type="reset"
              className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Clear Form
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#183f32] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#245743] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={18} />
              {isSubmitting ? "Publishing..." : "Publish Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewJobPage
