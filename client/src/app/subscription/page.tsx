"use client"

import { useState } from "react"
import PriceSection from "@/containers/landing-page/price"
import { PRICING } from "@/constants/pricing"

export default function SubscribePage() {
  const [isAnnual, setIsAnnual] = useState(false)
  return (
    <main className="flex flex-col items-start">
      <div className="w-full flex flex-col items-center justify-center gap-2 py-16 bg-black/20 bg-subscription-linear">
        <p className="uppercase text-neutral/90">step 1 of 3</p>
        <h3 className="text-center text-4xl font-semibold">
          Choose your Bookbudy experience
        </h3>
        <p className="text-center w-1/2 text-neutral/80 mb-10">
          Unlock the World of Books!
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

        <PriceSection pricing={PRICING} isAnnual={isAnnual} />
      </div>
    </main>
  )
}
