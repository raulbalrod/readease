"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { BookTypes } from "@/types/books"
import LoaderBookPage from "@/containers/book/Loader"
import BookDetails from "@/containers/book/BookDetails"
import ModalBook from "@/containers/book/Modal"
import { renderRating } from "@/containers/book/RatingBook"

export default function BookPage() {
  const { id } = useParams()
  const token = localStorage.getItem("token")
  const [book, setBook] = useState<BookTypes | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const toggleDescription = () => setShowFullDescription(!showFullDescription)

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

  const toggleModal = (content: any) => {
    setModalContent(content)
    setIsModalOpen(!isModalOpen)
  }

  return (
    <main className="flex flex-col items-start overflow-hidden py-2">
      <section className="flex justify-center items-center w-full">
        {loading ? (
          <section className="w-full flex md:flex-row flex-col justify-between md:space-x-10 space-y-4 p-10">
            <LoaderBookPage />
          </section>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          book && (
            <div key={book._id} className="w-full">
              <section className="w-full flex md:flex-row flex-col justify-between md:space-x-10 space-y-4 p-10">
                <BookDetails
                  _id={book._id}
                  title={book.title}
                  subtitle={book.subtitle}
                  rating={book.rating}
                  categories={book.categories}
                  description={book.description}
                  img={book.authors.img}
                  name={book.authors.name}
                  renderRating={renderRating}
                  toggleModal={toggleModal}
                  toggleDescription={toggleDescription}
                  showFullDescription={showFullDescription}
                />
              </section>

              {isModalOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-primary/95">
                  <ModalBook
                    title={book.title}
                    ebook={book.ebook}
                    frontImage={book.image.frontImage}
                    name={book.authors.name}
                    audiobook={book.audiobook}
                    toggleModal={toggleModal}
                    modalContent={modalContent}
                  />
                </div>
              )}
            </div>
          )
        )}
      </section>
    </main>
  )
}
