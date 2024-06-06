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
            `https://bookbuddy-v7ra.onrender.com/v1/${endpoint}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          if (!response.ok) {
            throw new Error("Error al obtener los libros")
          }
          const data = await response.json()
          setBooks(data.slice(0, 18))
          setLoading(false)
        } catch (error: any) {
          setError(error.message)
          setLoading(false)
        }
      }
    }

    fetchBooks()
  }, [token, endpoint])

  const renderHeader = () => {
    if (endpoint === `users/${username}/books`) {
      return (
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold m-4 text-2xl">{title}</h1>
          <a href={`/books/${username}/list`}>
            <p className="font-bold m-4 text-2xl flex items-center cursor-pointer">
              See all<i className="bx bx-chevron-right bx-sm"></i>
            </p>
          </a>
        </div>
      )
    } else {
      return <h1 className="font-bold m-4 text-2xl w-full">{title}</h1>
    }
  }

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
          {books.slice(0, 20).map((book, index) => (
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
