"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BookTypes } from "@/types/books"

export default function BookPage() {
  const { id } = useParams()
  const token = localStorage.getItem("token")
  const [book, setBook] = useState<BookTypes | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://bookbuddy-v7ra.onrender.com/v1/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if (!response.ok) {
          throw new Error("Error al obtener el libro")
        }
        const data = await response.json()
        setBook(data)
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchBook()
  }, [id, token])

  return (
    <main className="flex flex-col items-start overflow-hidden bg-newbooks-linear py-2">
      <section className="flex justify-center items-center w-full">
        {loading ? (
          <p>
            <i className="bx bx-loader-alt bx-spin bx-lg"></i>
          </p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          book && (
            <div key={book._id}>
              <Link href={`/book/${book._id}`}>
                <Image
                  src={book.image.frontImage}
                  alt={book.title}
                  width={150}
                  height={200}
                  style={{ width: "auto" }}
                  priority={true}
                />
              </Link>
              <h2>{book.title}</h2>
              <p>{book.subtitle}</p>
              <p>{book.description}</p>
              <p>Categorías: {book.categories.join(", ")}</p>
              <p>Rating: {book.rating}</p>
              <p>Status: {book.status}</p>
              <div>
                <h3>Autores:</h3>
              </div>
              <p>Editorial: {book.editorial}</p>
              <p>Page Count: {book.pageCount}</p>
              <p>Ebook: {book.ebook}</p>
              <p>Audiobook: {book.audiobook}</p>
            </div>
          )
        )}
      </section>
    </main>
  )
}
