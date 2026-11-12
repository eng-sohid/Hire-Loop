"use client"

import React, { useCallback, useEffect, useState } from "react"
import {
  RefreshCw,
  BriefcaseBusiness,
  Eye,
  Pencil,
  Trash2,
  X,
  MapPin,
  CalendarDays,
  Building2,
  Clock,
  Banknote,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

type Job = {
  _id: string
  jobTitle: string
  company: string
  category?: string
  employmentType: string
  workplaceType: string
  location: string
  salaryType?: string
  minSalary: number
  maxSalary: number
  experienceLevel?: string
  vacancies?: number
  skills?: string[]
  description?: string
  responsibilities?: string
  education?: string
  deadline?: string
  applicationEmail?: string
  createdAt: string
  status: string
}

type ModalType = "view" | "edit" | "delete" | null

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [modalType, setModalType] = useState<ModalType>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true)
      setError("")

      const response = await fetch(`${BASE_URL}/jobs`)
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load jobs")
      }

      setJobs(result.jobs || [])
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const openModal = (type: ModalType, job: Job) => {
    setSelectedJob(job)
    setModalType(type)
    setMessage("")
  }

  const closeModal = () => {
    if (isSubmitting) return

    setSelectedJob(null)
    setModalType(null)
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedJob) return

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    const payload = {
      ...data,
      minSalary: Number(data.minSalary),
      maxSalary: Number(data.maxSalary),
      vacancies: Number(data.vacancies),
      skills: String(data.skills)
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    }

    try {
      setIsSubmitting(true)

      const response = await fetch(`${BASE_URL}/jobs/${selectedJob._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update job")
      }

      setMessage("Job updated successfully!")
      await fetchJobs()
      setSelectedJob(null)
      setModalType(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update job")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedJob) return

    try {
      setIsSubmitting(true)

      const response = await fetch(`${BASE_URL}/jobs/${selectedJob._id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete job")
      }

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== selectedJob._id)
      )

      setMessage("Job deleted successfully!")
      setSelectedJob(null)
      setModalType(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete job")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatSalary = (job: Job) => {
    if (!job.minSalary && !job.maxSalary) return "Negotiable"

    const min = job.minSalary?.toLocaleString("en-US")
    const max = job.maxSalary?.toLocaleString("en-US")

    return `৳${min || "0"} - ৳${max || "0"}`
  }

  const formatDate = (date?: string) => {
    if (!date) return "N/A"

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-[#183f32] focus:ring-2 focus:ring-[#183f32]/10"

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700"

  return (
    <div className="min-h-screen bg-[#faf9f6] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#183f32] md:text-3xl">
              Manage Jobs
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage, edit and monitor your job postings.
            </p>
          </div>

          <button
            onClick={fetchJobs}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Feedback */}
        {message && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle2 size={18} />
            {message}
            <button onClick={() => setMessage("")} className="ml-auto">
              <X size={16} />
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle size={18} />
            {error}
            <button onClick={() => setError("")} className="ml-auto">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Job Count */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-[#183f32]/10 p-3 text-[#183f32]">
              <BriefcaseBusiness size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Jobs Posted</p>
              <h2 className="text-2xl font-bold text-gray-900">
                {jobs.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white md:block">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold text-gray-900">All Job Postings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-5 py-4 font-semibold">Job Details</th>
                  <th className="px-5 py-4 font-semibold">Location</th>
                  <th className="px-5 py-4 font-semibold">Job Type</th>
                  <th className="px-5 py-4 font-semibold">Salary</th>
                  <th className="px-5 py-4 font-semibold">Posted Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      <Loader2 className="mx-auto mb-2 animate-spin" />
                      Loading jobs...
                    </td>
                  </tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      No jobs found. Create your first job.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job._id} className="transition hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {job.jobTitle}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {job.company}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {job.location}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-700">
                          {job.employmentType}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {job.workplaceType}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-gray-700">
                        {formatSalary(job)}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {formatDate(job.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 capitalize">
                          {job.status || "Active"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            title="View Job"
                            onClick={() => openModal("view", job)}
                            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            title="Edit Job"
                            onClick={() => openModal("edit", job)}
                            className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            title="Delete Job"
                            onClick={() => openModal("delete", job)}
                            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          <h2 className="font-semibold text-gray-900">All Job Postings</h2>

          {isLoading ? (
            <div className="rounded-xl border bg-white py-12 text-center text-gray-500">
              <Loader2 className="mx-auto mb-2 animate-spin" />
              Loading jobs...
            </div>
          ) : jobs.length === 0 ? (
            <div className="rounded-xl border bg-white py-12 text-center text-gray-500">
              No jobs found. Create your first job.
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {job.jobTitle}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                      <Building2 size={14} />
                      {job.company}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {job.status || "Active"}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin size={15} />
                    {job.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <BriefcaseBusiness size={15} />
                    {job.employmentType} · {job.workplaceType}
                  </p>
                  <p className="flex items-center gap-2">
                    <Banknote size={15} />
                    {formatSalary(job)}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    {formatDate(job.createdAt)}
                  </p>
                </div>

                <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => openModal("view", job)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    onClick={() => openModal("edit", job)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-50 py-2 text-sm font-medium text-amber-600 hover:bg-amber-100"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => openModal("delete", job)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedJob && modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#183f32]">
                  {modalType === "view"
                    ? "Job Details"
                    : modalType === "edit"
                      ? "Edit Job"
                      : "Delete Job"}
                </h2>
                <p className="text-xs text-gray-500">{selectedJob.jobTitle}</p>
              </div>

              <button
                onClick={closeModal}
                disabled={isSubmitting}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* View Modal */}
            {modalType === "view" && (
              <div className="space-y-5 p-5">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedJob.jobTitle}
                  </h3>
                  <p className="mt-1 text-gray-500">{selectedJob.company}</p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <DetailItem
                    icon={<MapPin size={17} />}
                    label="Location"
                    value={selectedJob.location}
                  />
                  <DetailItem
                    icon={<BriefcaseBusiness size={17} />}
                    label="Employment Type"
                    value={selectedJob.employmentType}
                  />
                  <DetailItem
                    icon={<Building2 size={17} />}
                    label="Workplace"
                    value={selectedJob.workplaceType}
                  />
                  <DetailItem
                    icon={<Banknote size={17} />}
                    label="Salary"
                    value={formatSalary(selectedJob)}
                  />
                  <DetailItem
                    icon={<Clock size={17} />}
                    label="Experience"
                    value={selectedJob.experienceLevel || "N/A"}
                  />
                  <DetailItem
                    icon={<CalendarDays size={17} />}
                    label="Posted Date"
                    value={formatDate(selectedJob.createdAt)}
                  />
                </div>

                <DetailSection
                  title="Job Description"
                  value={selectedJob.description}
                />
                <DetailSection
                  title="Responsibilities"
                  value={selectedJob.responsibilities}
                />
                <DetailSection
                  title="Education"
                  value={selectedJob.education}
                />
                <DetailSection title="Skills">
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills?.length ? (
                      selectedJob.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-[#183f32]/10 px-3 py-1 text-xs font-medium text-[#183f32]"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">N/A</span>
                    )}
                  </div>
                </DetailSection>

                <DetailItem
                  icon={<CalendarDays size={17} />}
                  label="Application Deadline"
                  value={formatDate(selectedJob.deadline)}
                />
                <DetailItem
                  icon={<BriefcaseBusiness size={17} />}
                  label="Vacancies"
                  value={String(selectedJob.vacancies || "N/A")}
                />
                <DetailItem
                  icon={<Building2 size={17} />}
                  label="Application Email"
                  value={selectedJob.applicationEmail || "N/A"}
                />
              </div>
            )}

            {/* Edit Modal */}
            {modalType === "edit" && (
              <form onSubmit={handleUpdate} className="space-y-4 p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Job Title</label>
                    <input
                      name="jobTitle"
                      defaultValue={selectedJob.jobTitle}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      name="company"
                      defaultValue={selectedJob.company}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Category</label>
                    <input
                      name="category"
                      defaultValue={selectedJob.category || ""}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Location</label>
                    <input
                      name="location"
                      defaultValue={selectedJob.location}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Employment Type</label>
                    <input
                      name="employmentType"
                      defaultValue={selectedJob.employmentType}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Workplace Type</label>
                    <input
                      name="workplaceType"
                      defaultValue={selectedJob.workplaceType}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Salary Type</label>
                    <input
                      name="salaryType"
                      defaultValue={selectedJob.salaryType || ""}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Experience Level</label>
                    <input
                      name="experienceLevel"
                      defaultValue={selectedJob.experienceLevel || ""}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Minimum Salary</label>
                    <input
                      type="number"
                      name="minSalary"
                      defaultValue={selectedJob.minSalary}
                      min="0"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Maximum Salary</label>
                    <input
                      type="number"
                      name="maxSalary"
                      defaultValue={selectedJob.maxSalary}
                      min="0"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Vacancies</label>
                    <input
                      type="number"
                      name="vacancies"
                      defaultValue={selectedJob.vacancies || 1}
                      min="1"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      defaultValue={selectedJob.deadline?.slice(0, 10) || ""}
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>
                      Skills (comma separated)
                    </label>
                    <input
                      name="skills"
                      defaultValue={selectedJob.skills?.join(", ") || ""}
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>Education</label>
                    <textarea
                      name="education"
                      rows={2}
                      defaultValue={selectedJob.education || ""}
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>Job Description</label>
                    <textarea
                      name="description"
                      rows={4}
                      defaultValue={selectedJob.description || ""}
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>Responsibilities</label>
                    <textarea
                      name="responsibilities"
                      rows={4}
                      defaultValue={selectedJob.responsibilities || ""}
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>Application Email</label>
                    <input
                      type="email"
                      name="applicationEmail"
                      defaultValue={selectedJob.applicationEmail || ""}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#183f32] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#245442] disabled:opacity-60"
                  >
                    {isSubmitting && (
                      <Loader2 size={16} className="animate-spin" />
                    )}
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* Delete Modal */}
            {modalType === "delete" && (
              <div className="p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <Trash2 size={26} />
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  Delete this job?
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-800">
                    {selectedJob.jobTitle}
                  </span>
                  ? This action cannot be undone.
                </p>

                <div className="mt-6 flex flex-col-reverse justify-center gap-3 sm:flex-row">
                  <button
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                  >
                    {isSubmitting && (
                      <Loader2 size={16} className="animate-spin" />
                    )}
                    {isSubmitting ? "Deleting..." : "Yes, Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Reusable detail components

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
      <span className="mt-0.5 text-[#183f32]">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 text-sm font-medium break-words text-gray-800">
          {value}
        </p>
      </div>
    </div>
  )
}

function DetailSection({
  title,
  value,
  children,
}: {
  title: string
  value?: string
  children?: React.ReactNode
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>
      {children || (
        <p className="text-sm leading-7 whitespace-pre-line text-gray-600">
          {value || "N/A"}
        </p>
      )}
    </div>
  )
}

export default ManageJobsPage
