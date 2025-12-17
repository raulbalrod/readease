"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/Sheet"
import { Button } from "../Button/ActionButton"
import { BookTypes } from "@/types/books"
import { API_URLS } from "@/config/api"

const HeaderBookPage: React.FC = () => {
  const { token, username, logout } = useAuth()
  const router = useRouter()
  const [books, setBooks] = useState<BookTypes[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      if (token && username) {
        try {
          const response = await fetch(
            API_URLS.getUserBooks(username),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          if (response.ok) {
            const data = await response.json()
            setBooks(data)
          } else {
            console.error("Failed to fetch books")
          }
        } catch (error) {
          console.error("Error fetching books:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchBooks()
  }, [token, username])

  const handleNavigation = () => {
    if (token && username) {
      router.push(`/books/${username}/list`)
    } else {
      console.error("No token or username available")
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/landing-page")
  }

  return (
    <header className="flex items-center justify-between bg-primary w-screen py-6 px-10 z-50">
      <nav className="hidden md:flex items-center gap-10">
        <div>
          <a href="/home">
            <Image
              src="/readease/whithout-title/logo.svg"
              alt="logo ReadEase"
              width="58"
              height="58"
            />
          </a>
        </div>
        <ul className="flex gap-4 font-medium">
          <li className="text-lg uppercase font-medium hover:text-neutral/90">
            <a href="/home">Home</a>
          </li>
          <li className="text-lg uppercase font-medium hover:text-neutral/90">
            <a href="/books/discovery">Explore by Categorie</a>
          </li>
        </ul>
      </nav>

      <a href="/home">
        <Image
          src="/readease/whithout-title/logo.svg"
          alt="logo ReadEase"
          width="50"
          height="50"
          className="block md:hidden"
        />
      </a>

      <section className="flex items-center gap-6">
        <a href="/books/discovery" className="block md:hidden">
          <i className="bx bx-search-alt bx-sm hover:text-neutral/80 cursor-pointer block md:hidden"></i>
        </a>
        <i
          onClick={handleNavigation}
          className="bx bx-bookmarks bx-sm hover:text-neutral/80 cursor-pointer"
        ></i>
        <Sheet>
          <SheetTrigger asChild>
            <i className="bx bx-user bx-sm hover:text-neutral/80 cursor-pointer"></i>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Profile</SheetTitle>
              <SheetDescription>Manage your account</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col items-center h-full gap-10 mt-10">
              <Image
                src={`https://unavatar.io/github/${username}`}
                alt="User avatar"
                width="52"
                height="52"
                style={{ borderRadius: "100%" }}
              />
              <h1 className="text-xl font-semibold">The books of {username}</h1>
              <div className="w-full">
                {loading ? (
                  <p>Loading books...</p>
                ) : (
                  <>
                    {books.length > 0 ? (
                      <ul className="h-64 overflow-y-scroll">
                        {books.map((book) => (
                          <li key={book._id} className="py-2">
                            <p>{book.title}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>
                        You don't have any books saved in your list right now
                      </p>
                    )}
                  </>
                )}
              </div>
              <Button variant="logout" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </header>
  )
}

export default HeaderBookPage
