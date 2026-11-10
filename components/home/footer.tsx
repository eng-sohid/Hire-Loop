import Image from "next/image"
import Link from "next/link"

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5H16V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.9V11H7.5v3H10v7h3.5Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M6.9 8.6H4V20h2.9V8.6ZM5.4 7.3a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM9.6 20h2.9v-5.7c0-1.5.7-2.4 2-2.4 1.2 0 1.8.8 1.8 2.4V20h2.9v-6.2c0-2.9-1.5-4.3-3.8-4.3-1.6 0-2.5.9-2.9 1.7V8.6H9.6V20Z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M17.2 4h2.6l-5.7 6.5L20.8 20h-5.3l-4.1-5.4L6.6 20H4l6.1-7L3.6 4H9l3.7 4.9L17.2 4Zm-.9 14.4h1.4L8.1 5.5H6.6l9.7 12.9Z" />
    </svg>
  )
}

const footerColumns = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Companies", href: "/companies" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

const socials = [
  { label: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { label: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com" },
  { label: "X", icon: XIcon, href: "https://x.com" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a] px-4 pb-8 pt-14">
      <div className="mx-auto max-w-7xl">
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="inline-flex">
              <Image
                src="/logo.png"
                alt="HireLoop"
                width={120}
                height={40}
                className="h-7 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 text-sm leading-6 text-zinc-500">
              The AI-powered hiring platform connecting top talent with
              visionary companies worldwide.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="text-xs font-semibold tracking-wide text-white">
                  {column.title}
                </h4>

                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-500 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-zinc-600">
            Copyright {new Date().getFullYear()} © HireLoop. All Rights
            Reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/terms"
              className="text-xs text-zinc-600 transition-colors hover:text-zinc-300"
            >
              Terms and Conditions
            </Link>

            <Link
              href="/privacy"
              className="text-xs text-zinc-600 transition-colors hover:text-zinc-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
