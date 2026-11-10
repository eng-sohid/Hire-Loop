"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  BriefcaseBusiness,
  Loader2,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"

type UserRole = "seeker" | "recruiter" | "admin"

export default function SignUpPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<UserRole>("seeker")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      setLoading(true)

      const result = await authClient.signUp.email({
        name: trimmedName,
        email: trimmedEmail,
        password,
        callbackURL: "/",
        role,
      })

      if (result.error) {
        console.error("SIGNUP ERROR:", result.error)
        setError(result.error.message || "Unable to create your account.")
        return
      }

      setSuccess("Account created successfully! Redirecting...")

      router.push("/")
      router.refresh()
    } catch (err) {
      console.error("SIGNUP FAILED:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError("")

    try {
      setGoogleLoading(true)

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })
    } catch (err) {
      console.error("GOOGLE SIGNUP ERROR:", err)
      setError("Google sign-up failed. Please try again.")
      setGoogleLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-10 text-[#183f32]">
      <div className="mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-[#e8e5dc] bg-white shadow-xl shadow-[#183f32]/5 lg:grid-cols-2">
          {/* Left Side */}
          <div className="relative hidden min-h-[700px] flex-col justify-between overflow-hidden bg-[#183f32] p-12 text-white lg:flex">
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#b58749]/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                  <Image
                    src="/logo.png"
                    alt="HireLoop"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>

                <span className="text-2xl font-bold tracking-tight">
                  HireLoop
                </span>
              </Link>
            </div>

            <div className="relative z-10 max-w-md">
              <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80">
                Your next opportunity starts here
              </span>

              <h1 className="text-5xl leading-tight font-bold tracking-tight">
                Build your
                <span className="block text-[#d9b77e]">future with us.</span>
              </h1>

              <p className="mt-6 text-base leading-8 text-white/70">
                Connect with opportunities, discover talented people, and take
                the next step in your professional journey.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full border-2 border-[#183f32] bg-[#d9b77e]" />
                  <div className="h-10 w-10 rounded-full border-2 border-[#183f32] bg-[#8da99b]" />
                  <div className="h-10 w-10 rounded-full border-2 border-[#183f32] bg-[#d4a69a]" />
                </div>

                <p className="text-sm text-white/70">
                  Start building your career today.
                </p>
              </div>
            </div>

            <div className="relative z-10 text-sm text-white/50">
              © {new Date().getFullYear()} HireLoop. All rights reserved.
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center px-6 py-12 sm:px-12">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <Link
                href="/"
                className="mb-10 inline-flex items-center gap-3 lg:hidden"
              >
                <Image
                  src="/logo.png"
                  alt="HireLoop"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />

                <span className="text-2xl font-bold">HireLoop</span>
              </Link>

              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#b58749] uppercase">
                  Get started
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-[#183f32] sm:text-4xl">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Join HireLoop and discover new opportunities.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div
                  role="status"
                  className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                  {success}
                </div>
              )}

              {/* Google Signup */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={googleLoading || loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {googleLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <svg
                    viewBox="0 0 48 48"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.47-4.74 7.16l7.73 6C44.43 37.92 46.98 31.9 46.98 24.55Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.91-5.82l-7.73-6c-2.14 1.44-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                    />
                  </svg>
                )}
                Continue with Google
              </button>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                  Or sign up with email
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSignUp} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-4 pl-12 text-sm text-gray-800 transition outline-none placeholder:text-gray-400 focus:border-[#183f32] focus:ring-2 focus:ring-[#183f32]/10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-4 pl-12 text-sm text-gray-800 transition outline-none placeholder:text-gray-400 focus:border-[#183f32] focus:ring-2 focus:ring-[#183f32]/10"
                    />
                  </div>
                </div>

                {/* Account Role */}
                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    I want to join as
                  </label>

                  <div className="relative">
                    <BriefcaseBusiness className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pr-10 pl-12 text-sm text-gray-800 transition outline-none focus:border-[#183f32] focus:ring-2 focus:ring-[#183f32]/10"
                    >
                      <option value="seeker">Job Seeker</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="admin">Admin</option>
                    </select>

                    <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-12 pl-12 text-sm text-gray-800 transition outline-none placeholder:text-gray-400 focus:border-[#183f32] focus:ring-2 focus:ring-[#183f32]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition hover:text-[#183f32]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    Use at least 8 characters.
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-12 pl-12 text-sm text-gray-800 transition outline-none placeholder:text-gray-400 focus:border-[#183f32] focus:ring-2 focus:ring-[#183f32]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition hover:text-[#183f32]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <p className="text-xs leading-6 text-gray-500">
                  By creating an account, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-[#183f32] hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[#183f32] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#183f32] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#183f32]/15 transition hover:bg-[#245443] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Sign In */}
              <p className="mt-8 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-bold text-[#183f32] transition hover:text-[#b58749]"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
