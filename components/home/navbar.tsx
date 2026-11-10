"use client"

import Link from "next/link"
import Image from "next/image"
import { MenuIcon, LogOut, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { authClient } from "@/lib/auth-client"

type Role = "seeker" | "recruiter" | "admin"

const publicNavLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/companies", label: "Company" },
  { href: "/pricing", label: "Pricing" },
]

export function Navbar() {
  const { data: session, isPending } = authClient.useSession()

  const user = session?.user

  const userRole = user?.role?.toLowerCase() as Role

  const role: Role = ["seeker", "recruiter", "admin"].includes(userRole)
    ? userRole
    : "seeker"

  const navLinks = [
    ...publicNavLinks,
    ...(user
      ? [
          {
            href: `/dashboard/${role}`,
            label: "Dashboard",
          },
        ]
      : []),
  ]

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/"
          },
        },
      })
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#262626] px-3 py-2.5 sm:px-5">
      <div className="mx-auto flex h-[46px] max-w-7xl items-center justify-between rounded-xl border border-white/[0.04] bg-[#1f1f1f] px-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] sm:px-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="HireLoop"
            width={120}
            height={40}
            priority
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          <nav className="flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="h-5 w-px bg-white/15" />

          {/* Authentication */}
          <div className="flex items-center gap-5">
            {isPending ? (
              <div className="h-8 w-24 animate-pulse rounded-lg bg-white/10" />
            ) : user ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-[#6954f5]/20 text-violet-300">
                    <UserRound className="size-4" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[11px] text-zinc-400">
                      Welcome back,
                    </span>

                    <span className="max-w-32 truncate text-sm font-semibold text-white">
                      {user.name || "User"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-red-400"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-[14px] font-medium text-violet-400 transition-colors hover:text-violet-300"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-[#6954f5] px-4 text-[14px] font-semibold text-white shadow-[0_2px_12px_rgba(105,84,245,0.2)] transition-all duration-200 hover:bg-[#7967ff]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-white hover:bg-white/10 hover:text-white md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="dark w-72 border-white/10 bg-[#1f1f1f] text-white"
          >
            <SheetHeader>
              <SheetTitle>
                <Link href="/" className="inline-flex">
                  <Image
                    src="/logo.png"
                    alt="HireLoop"
                    width={120}
                    height={40}
                    className="h-7 w-auto object-contain"
                  />
                </Link>
              </SheetTitle>
            </SheetHeader>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-2 px-4 pt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Authentication */}
            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 p-4">
              {isPending ? (
                <div className="h-10 animate-pulse rounded-lg bg-white/10" />
              ) : user ? (
                <>
                  <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#6954f5]/20 text-violet-300">
                      <UserRound className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-zinc-400">Welcome back,</p>

                      <p className="truncate text-sm font-semibold text-white">
                        {user.name || "User"}
                      </p>

                      <p className="truncate text-xs text-zinc-500">
                        {user.email}
                      </p>

                      <p className="mt-1 text-xs text-violet-300 capitalize">
                        {role}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="flex h-10 items-center justify-center gap-2 rounded-lg border border-red-400/20 text-sm font-medium text-red-400 transition-colors hover:bg-red-400/10"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="rounded-lg px-3 py-2 text-sm text-violet-400 transition-colors hover:bg-white/5"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    className="flex h-10 items-center justify-center rounded-lg bg-[#6954f5] text-sm font-semibold text-white transition-colors hover:bg-[#7967ff]"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
