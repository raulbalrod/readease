"use client"

import React from "react"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

const HeaderBookPage: React.FC = () => {
  const { token, username } = useAuth()
  const router = useRouter()

  const handleNavigation = () => {
    if (token && username) {
      router.push(`/books/${username}/list`)
    } else {
      console.error("No token or username available")
    }
  }

  return (
    <header className="flex items-center justify-between bg-primary w-screen py-6 px-10 z-50">
      <nav className="hidden md:flex items-center gap-10">
        <div>
          <Image
            src="/bookbuddy/whithout-title/logo.svg"
            alt="logo bookbuddy"
            width="58"
            height="58"
          />
        </div>
        <ul className="flex gap-4 font-medium">
          <li className="text-lg uppercase font-medium">
            <a href="/home">Home</a>
          </li>
          <li className="text-lg uppercase font-medium">
            <a href="/books/discovery">Explore by Categorie</a>
          </li>
        </ul>
      </nav>

      <Image
        src="/bookbuddy/whithout-title/logo.svg"
        alt="logo bookbuddy"
        width="50"
        height="50"
        className="block md:hidden"
      />

      <section className="flex items-center gap-6">
        <a href="#">
          <i className="bx bx-search bx-sm hover:text-neutral/80"></i>
        </a>
        <a href="#" onClick={handleNavigation}>
          <i className="bx bx-bookmarks bx-sm hover:text-neutral/80"></i>
        </a>
        <a href="/sign-in">
          <i className="bx bx-user bx-sm hover:text-neutral/80"></i>
        </a>
      </section>
    </header>
  )
}

export default HeaderBookPage
