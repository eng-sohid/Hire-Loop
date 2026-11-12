const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export type JobRow = {
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
  vacancies: number
  skills: string[]
  description: string
  responsibilities: string
  education: string
  deadline: string
  applicationEmail: string
  createdAt: string
  status: string
}

type JobsResponse = {
  success: boolean
  totalJobs?: number
  jobs: JobRow[]
  message?: string
}

export const getJobs = async (query: string = ""): Promise<JobRow[]> => {
  try {
    const res = await fetch(`${BASE_URL}/jobs${query ? `?${query}` : ""}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch jobs")
    }

    const data: JobsResponse = await res.json()

    return Array.isArray(data.jobs) ? data.jobs : []
  } catch (error) {
    console.error("Get Jobs Error:", error)
    return []
  }
}

export const createJob = async (data: Record<string, unknown>) => {
  try {
    const res = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const text = await res.text()

    let result

    try {
      result = JSON.parse(text)
    } catch {
      throw new Error(
        `Server returned HTML or invalid JSON. Status: ${res.status}`
      )
    }

    if (!res.ok) {
      throw new Error(result.message || `HTTP Error: ${res.status}`)
    }

    return result
  } catch (error) {
    console.error("Create Job Error:", error)

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}
