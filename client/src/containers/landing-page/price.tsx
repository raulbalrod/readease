"use client"

import PlanCard from "@/components/PlanCard"
import { PRICING } from "@/constants/pricing"
import React, { useState } from "react"

export default function PriceSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <>
      <h1 className="text-secondary font-semibold">Pricing</h1>
      <h3 className="text-center text-4xl font-semibold">
        Select the perfect plan
      </h3>
      <p className="text-center w-1/2 text-neutral/80 mb-10">
        Enjoy local titles, bestsellers, and a wide range of new features for
        the world of reading.
      </p>

      <div className="flex p-1 gap-4 mb-10 bg-neutral/15 rounded-full">
        <button
          className={`px-6 py-1 font-medium rounded-full ${
            !isAnnual ? "bg-secondary/90 text-neutral" : ""
          }`}
          onClick={() => setIsAnnual(false)}
        >
          Monthly
        </button>

        <button
          className={`px-6 py-1 font-medium rounded-full ${
            isAnnual ? "bg-secondary text-white" : ""
          }`}
          onClick={() => setIsAnnual(true)}
        >
          Annually
        </button>
      </div>

      <section className="flex justify-between items-start gap-6">
        {PRICING.map((plan, index) => (
          <PlanCard key={index} plan={plan} isAnnual={isAnnual} />
        ))}
      </section>
    </>
  )
}
