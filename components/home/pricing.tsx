"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Crown, Sparkles, Sprout, TrendingUp } from "lucide-react"

const plans = [
  {
    name: "Starter",
    icon: Sprout,
    tagline: "Start building your hiring stack",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: "Choose Starter",
    highlighted: false,
    features: [
      "List up to 3 open roles",
      "Access to candidate database",
      "Email support",
    ],
  },
  {
    name: "Growth",
    icon: TrendingUp,
    tagline: "Start building your hiring stack",
    monthlyPrice: 17,
    yearlyPrice: 15,
    cta: "Choose Growth",
    highlighted: true,
    features: [
      "List up to 10 open roles",
      "Company profile customization",
      "AI-powered matching",
      "Priority email support",
    ],
  },
  {
    name: "Premium",
    icon: Crown,
    tagline: "Start building your hiring stack",
    monthlyPrice: 99,
    yearlyPrice: 89,
    cta: "Choose Premium",
    highlighted: false,
    features: [
      "Unlimited open roles",
      "Dedicated success manager",
      "Advanced analytics dashboard",
      "24/7 priority support",
    ],
  },
]

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")

  return (
    <section className="bg-[#050505] px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] text-violet-400 uppercase">
            <Sparkles className="size-3" />
            Pricing
          </span>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#111111] p-1">
            {(["monthly", "yearly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBilling(option)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${
                  billing === option
                    ? "bg-[#6954f5] text-white shadow-[0_2px_12px_rgba(105,84,245,0.35)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="capitalize">{option}</span>

                {option === "yearly" && (
                  <span className="ml-1.5 text-[10px] text-emerald-400">
                    Save 10%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const price =
              billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-6 sm:p-7 ${
                  plan.highlighted
                    ? "border border-[#6954f5]/50 bg-[#151425] shadow-[0_0_40px_rgba(105,84,245,0.15)]"
                    : "border border-white/[0.07] bg-[#111111]"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#6954f5] px-3 py-1 text-[10px] font-semibold tracking-wide text-white">
                    MOST POPULAR
                  </span>
                )}

                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#6954f5]/15">
                    <plan.icon className="size-4 text-violet-300" />
                  </div>

                  <h3 className="text-sm font-semibold text-white">
                    {plan.name}
                  </h3>
                </div>

                <p className="mt-2 text-xs text-zinc-500">{plan.tagline}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    ${price}
                  </span>

                  <span className="text-xs text-zinc-500">
                    /{billing === "monthly" ? "month" : "mo, billed yearly"}
                  </span>
                </div>

                {/* Features */}
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#6954f5]/20">
                        <Check className="size-2.5 text-violet-300" />
                      </span>

                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/sign-up"
                  className={`mt-8 flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-[#6954f5] text-white hover:bg-[#7967ff] hover:shadow-[0_2px_18px_rgba(105,84,245,0.4)]"
                      : "border border-white/15 text-white hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
