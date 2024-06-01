"use client"

import { useState } from "react"
import EbooksList from "@/containers/landing-page/ebooks"
import FaqSection from "@/containers/landing-page/faq"
import InitialSectionContainer from "@/containers/landing-page/initial-section"
import ItemsList from "@/containers/landing-page/must-sees"
import PriceSection from "@/containers/landing-page/price"
import Audiobooks from "@/containers/landing-page/audiobooks"

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-start">
      <div className="relative top-20 flex flex-col items-center justify-center gap-4 w-full py-16 bg-[url('/backgrounds/initial-content-bg.jpg')] bg-cover bg-center text-neutral">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/85 to-primary/40"></div>
        <InitialSectionContainer />
      </div>

      <div
        id="must-sees"
        className="mt-20 p-20 w-full bg-mustsees-linear text-neutral"
      >
        <ItemsList />
      </div>

      <div
        id="ebooks"
        className="relative flex lg:flex-row flex-col items-center justify-center gap-4 w-full p-16 bg-[url('/backgrounds/ebooks.jpg')] bg-cover bg-center text-neutral"
      >
        <div className="absolute inset-0 bg-gradient-to-l from-primary/85 to-primary/40"></div>
        <EbooksList />
      </div>

      <div
        id="audiobooks"
        className="p-20 w-full bg-mustsees-linear text-neutral"
      >
        <Audiobooks />
      </div>

      <div
        id="faq"
        className="w-full flex flex-col items-center justify-center gap-4 py-16"
      >
        <FaqSection />
      </div>

      <div
        id="prices"
        className="w-full flex flex-col items-center justify-center gap-2 py-16 bg-black/20 bg-custom-linear"
      >
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

        <PriceSection isAnnual={isAnnual} />
      </div>
    </main>
  )
}
