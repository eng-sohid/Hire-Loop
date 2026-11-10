import Image from "next/image"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050505] px-4 pt-24 pb-32 sm:pt-32 sm:pb-44">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
          Your next role is already looking for you
        </h2>

        <p className="mt-4 text-sm text-zinc-400 sm:text-base">
          Build a profile in minutes, hire smarter and start doing meaningful
          work today.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/sign-up"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Create Free Account
          </Link>

          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-white/20 bg-black/30 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
