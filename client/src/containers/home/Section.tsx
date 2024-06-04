import React from "react"
import { Skeleton } from "@/components/Skeleton"

interface SectionProps {
  loading: boolean
  error: string | null
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ loading, error, children }) => (
  <section className="flex flex-col w-full">
    {loading ? (
      <>
        <Skeleton className="h-4 w-[250px] m-3" />
        <div className="flex w-full overflow-x-hidden">
          <div className="flex">
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[350px] w-[200px] rounded-xl mx-2"
              />
            ))}
          </div>
        </div>
      </>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      children
    )}
  </section>
)

export default Section
