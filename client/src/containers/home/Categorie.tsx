"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BookWhitLink from "@/containers/home/Book"
import { BookTypes } from "@/types/books"
import { Carousel, CarouselContent, CarouselItem } from "@/components/Carrousel"

interface CategorieProps {
  title: string
  username: any
  endpoint: string
}

export default function Categorie({
  title,
  endpoint,
  username,
}: CategorieProps) {
  const router = useRouter()
  const [books, setBooks] = useState<BookTypes[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (!storedToken) {
      router.push("/sign-in")
    } else {
      setToken(storedToken)
    }
  }, [router])

  useEffect(() => {
    if (!token) return

    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://bookbuddy-v7ra.onrender.com/v1/${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if (!response.ok) throw new Error("Error al obtener los libros")
        const data = await response.json()
        setBooks(data.slice(0, 18))
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [token, endpoint])

  const renderHeader = () => (
    <div className="flex items-center justify-between w-full">
      <h1 className="font-bold m-4 text-2xl">{title}</h1>
      {endpoint === `users/${username}/books` && (
        <a
          href={`/books/${username}/list`}
          className="font-bold m-4 text-2xl flex items-center cursor-pointer"
        >
          See all<i className="bx bx-chevron-right bx-sm"></i>
        </a>
      )}
    </div>
  )

  if (endpoint === `users/${username}/books` && books.length < 2) return null

  return (
    <>
      {renderHeader()}

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[100%]"
      >
        <CarouselContent>
          {books.slice(0, 20).map((book) => (
            <CarouselItem key={book._id} className="basis-1/10">
              <div className="p-1">
                <BookWhitLink id={book._id} title={book.title} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}
