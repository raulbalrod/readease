"use client"

import PlanCard from "@/components/PlanCard"
import { PRICING } from "@/constants/pricing"

export default function PriceSection({ isAnnual }: any) {
  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between items-start gap-6">
        {PRICING.map((plan, index) => (
          <PlanCard key={index} plan={plan} isAnnual={isAnnual} />
        ))}
      </section>
    </>
  )
}
