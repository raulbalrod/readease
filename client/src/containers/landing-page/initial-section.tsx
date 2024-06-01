import Button from "@/components/Button"
import Image from "next/image"

export default function InitialSectionContainer() {
  return (
    <>
      <Image
        src="/bookbuddy/whithout-title/logo-v2.svg"
        alt="Logo Bookbuddy"
        width="128"
        height="128"
        className="z-10"
      />
      <h3 className="relative w-96 text-center font-medium text-xl">
        In <span className="text-secondary font-bold">Bookbuddy</span>, you'll
        find a collection of bestselling{" "}
        <span className="text-secondary font-bold">ebooks</span>, award-winning{" "}
        <span className="text-secondary font-bold">audiobooks</span>, and much
        more.
      </h3>

      <div className="relative flex font-semibold">
        <p className="text-4xl">14,95 €</p>
        <p>/month</p>
      </div>

      <span className="relative text-sm text-neutral">Cancel at any time</span>
      <Button text="Subscribe now" path="/subscription" variant="default" />
    </>
  )
}
