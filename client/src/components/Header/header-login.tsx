import React from "react"
import Image from "next/image"

export default function HeaderSignIn() {
  return (
    <header className="flex items-center justify-center bg-primary py-6 w-full">
      <Image
        src="/bookbuddy/whithout-title/logo.svg"
        alt="logo bookbuddy"
        width="64"
        height="64"
      />
    </header>
  )
}
