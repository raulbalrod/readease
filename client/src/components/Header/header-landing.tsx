"use client"

import React, { useState } from "react"
import Image from "next/image"
import Button from "../Button"
import SelectLanguage from "../Select/Language"

export default function HeaderLandingPage() {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const handleItemClick = (item: string) => {
    setActiveItem(item)
  }

  const getItemClass = (item: string) => {
    return item === activeItem
      ? "text-secondary"
      : "text-neutral hover:text-secondary cursor-pointer hover:delay-75"
  }

  return (
    <header className="fixed flex items-center justify-between bg-primary w-screen py-6 px-10 z-50">
      <nav className="hidden md:flex items-center gap-10">
        <div>
          <Image
            src="/readease/whithout-title/logo.svg"
            alt="logo ReadEase"
            width="64"
            height="64"
          />
        </div>
        <ul className="flex gap-6">
          <li
            className={`md:hidden xl:block xl:text-lg uppercase font-medium ${getItemClass(
              "must-sees",
            )}`}
            onClick={() => handleItemClick("must-sees")}
          >
            <a href="#must-sees">must-sees</a>
          </li>
          <li
            className={`md:hidden xl:block xl:text-lg uppercase font-medium ${getItemClass(
              "ebooks",
            )}`}
            onClick={() => handleItemClick("ebooks")}
          >
            <a href="#ebooks">ebooks</a>
          </li>
          <li
            className={`md:hidden xl:block xl:text-lg uppercase font-medium ${getItemClass(
              "audiobooks",
            )}`}
            onClick={() => handleItemClick("audiobooks")}
          >
            <a href="#audiobooks">audiobooks</a>
          </li>
          <li
            className={`md:hidden xl:block xl:text-lg uppercase font-medium ${getItemClass(
              "faq",
            )}`}
            onClick={() => handleItemClick("faq")}
          >
            <a href="#faq">faq</a>
          </li>
          <li
            className={`md:hidden xl:block xl:text-lg uppercase font-medium ${getItemClass(
              "prices",
            )}`}
            onClick={() => handleItemClick("prices")}
          >
            <a href="#prices">prices</a>
          </li>
        </ul>
      </nav>

      <Image
        src="/readease/whithout-title/logo.svg"
        alt="logo readease"
        width="50"
        height="50"
        className="block 
        md:hidden"
      />

      <section className="flex gap-6">
        {/* <SelectLanguage /> */}
        <Button text="Log in" path="sign-in" variant="only_text" />
        <Button text="Subscribe now" path="/subscription" variant="default" />
      </section>
    </header>
  )
}
