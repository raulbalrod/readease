"use client"

import PlanCard from "@/components/PlanCard"

export default function PriceSection({ isAnnual, pricing }: any) {
  return (
    <>
      <section className="flex flex-col lg:flex-row justify-between items-start gap-6">
        {pricing.map((plan: any, index: any) => (
          <PlanCard key={index} plan={plan} isAnnual={isAnnual} />
        ))}
      </section>
    </>
  )
}
