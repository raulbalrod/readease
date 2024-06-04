"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Marquee from "@/components/Marquee"
import Button from "@/components/Button"
import BookWhitLink from "@/containers/home/Book"
import { BookTypes } from "@/types/books"
import { UserDataTypes } from "@/types/user"
import Categorie from "@/containers/home/Categorie"
import { Skeleton } from "@/components/Skeleton"
import Section from "@/containers/home/Section"
import { SECTION_HOME_PAGE } from "@/constants/categorieData"

export default function HomePage() {
  const router = useRouter()
  const { username } = useAuth()
  const [userData, setUserData] = useState<UserDataTypes | null>(null)
  const [books, setBooks] = useState<BookTypes[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token")
      if (!storedToken) {
        router.push("/sign-in")
      } else {
        setToken(storedToken)
      }
    } else {
      router.push("/landing-page")
    }
  }, [router])

  useEffect(() => {
    const fetchBooks = async () => {
      if (token) {
        try {
          const response = await fetch(
            "https://bookbuddy-v7ra.onrender.com/v1/books",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          if (!response.ok) {
            if (response.status === 401) {
              router.push("/sign-in")
            } else {
              throw new Error("Error al obtener los libros")
            }
          }
          const data = await response.json()
          setBooks(data)
          setLoading(false)
        } catch (error: any) {
          setError(error.message)
          setLoading(false)
        }
      }
    }

    fetchBooks()
  }, [token, router])

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return
      try {
        const response = await fetch(
          `https://bookbuddy-v7ra.onrender.com/v1/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if (!response.ok) {
          throw new Error("Error fetching user data")
        }
        const data = await response.json()
        setUserData(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [token, username])

  const sections = SECTION_HOME_PAGE({ username })

  return (
    <main className="flex flex-col items-start overflow-hidden bg-newbooks-linear py-2">
      <section className="flex flex-col justify-center items-start w-full">
        {loading ? (
          <div className="flex flex-col space-y-3 w-screen overflow-hidden">
            <Skeleton className="h-4 w-[250px] m-3" />
            <Marquee reverse>
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[350px] w-[200px] rounded-xl mx-2"
                />
              ))}
            </Marquee>
            <Skeleton className="w-32 flex justify-center p-6 rounded-xl mx-auto" />
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <div className="flex items-center">
              <h1 className="font-semibold m-4 text-lg">
                Books for {username}
              </h1>
            </div>
            <Marquee reverse>
              {books.slice(0, 10).map((book) => (
                <div key={book._id} className="">
                  <BookWhitLink
                    id={book._id}
                    src={book.image.frontImage}
                    alt={book.title}
                  />
                </div>
              ))}
            </Marquee>
            <div className="w-full flex justify-center p-4">
              <Button text="All books" path="/books" variant="default" />
            </div>
          </>
        )}
      </section>

      {sections.map(({ title, endpoint }) => (
        <Section key={title} loading={loading} error={error}>
          <Categorie title={title} endpoint={endpoint} username={username} />
        </Section>
      ))}
    </main>
  )
}
