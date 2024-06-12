"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { BookTypes } from "@/types/books"
import { useAuth } from "@/contexts/AuthContext"
import { UserDataTypes } from "@/types/user"
import { Skeleton } from "@/components/Skeleton"
import AudiobookPlayer from "@/components/AudioboookPlayer"
import { EpubViewer } from "@/components/EpubViewer"
import BookWhitLink from "@/containers/home/Book"
import Image from "next/image"

export default function BookPage() {
  const router = useRouter()
  const { id } = useParams()
  const { token, username } = useAuth()
  const [userData, setUserData] = useState<UserDataTypes | null>(null)
  const [book, setBook] = useState<BookTypes | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const toggleDescription = () => setShowFullDescription(!showFullDescription)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token")
      if (!storedToken) {
        router.push("/sign-in")
      }
    }
  }, [router])

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

  useEffect(() => {
    const fetchBook = async () => {
      if (!id || !token) return
      setLoading(true)
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
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    const checkIfBookmarked = async () => {
      if (!username || !token) return
      try {
        const response = await fetch(
          `https://bookbuddy-v7ra.onrender.com/v1/users/${username}/books`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        if (!response.ok) {
          throw new Error("Error al verificar el libro")
        }
        const data = await response.json()
        const isBookmarked = data.some((book: any) => book._id === id)
        setIsBookmarked(isBookmarked)
      } catch (error: any) {
        setError(error.message)
      }
    }

    fetchBook()
    checkIfBookmarked()
  }, [id, token, username])

  const toggleModal = (content: any) => {
    setModalContent(content)
    setIsModalOpen(!isModalOpen)
  }

  const handleBookmarkClick = async () => {
    if (!userData || !token) return
    try {
      const response = await fetch(
        `https://bookbuddy-v7ra.onrender.com/v1/users/${userData._id}/books${
          isBookmarked ? "/remove" : ""
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId: id }),
        },
      )

      if (!response.ok) {
        throw new Error("Error al actualizar el estado del libro")
      }

      setIsBookmarked(!isBookmarked)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const emptyStars = 5 - fullStars
    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <i key={index} className="bx bxs-star text-[#F0B334]"></i>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <i key={index} className="bx bx-star text-[#F0B334]"></i>
        ))}
      </>
    )
  }

  return (
    <main className="flex flex-col items-start overflow-hidden py-2">
      <section className="flex justify-center items-center w-full">
        {loading ? (
          <section className="w-full flex md:flex-row flex-col justify-between md:space-x-10 space-y-4 p-10">
            <Skeleton className="h-[460px] w-[300px] rounded-xl bg-neutral/10" />
            <div className="w-3/4 flex flex-col space-y-3">
              <div className=" w-full flex justify-between items-center">
                <Skeleton className="h-[20px] w-[300px] rounded-xl bg-neutral/10" />
                <Skeleton className="h-[14px] w-[100px] rounded-xl bg-neutral/10" />
              </div>
              <Skeleton className="h-[18px] w-[200px] rounded-xl bg-neutral/10" />

              <section className="flex space-x-2">
                <Skeleton className="h-[25px] w-[100px] rounded-xl bg-neutral/10" />
                <Skeleton className="h-[25px] w-[100px] rounded-xl bg-neutral/10" />
                <Skeleton className="h-[25px] w-[100px] rounded-xl bg-neutral/10" />
              </section>

              <section className="flex space-x-4 items-center mb-4">
                <Skeleton className="h-[30px] w-[150px] rounded-xl bg-neutral/10" />
                <Skeleton className="h-[30px] w-[150px] rounded-xl bg-neutral/10" />
                <Skeleton className="h-[30px] w-[30px] rounded-lg bg-neutral/10" />
              </section>

              <div className="space-y-4">
                <Skeleton className="h-[14px] w-full rounded-xl bg-neutral/10" />
                <Skeleton className="h-[14px] w-full rounded-xl bg-neutral/10" />
                <Skeleton className="h-[14px] w-full rounded-xl bg-neutral/10" />
                <Skeleton className="h-[14px] w-full rounded-xl bg-neutral/10" />
                <Skeleton className="h-[14px] w-1/5 rounded-xl bg-neutral/10" />
              </div>

              <section className="space-y-2">
                <Skeleton className="h-[14px] w-1/3 rounded-xl bg-neutral/10" />
                <div className="flex space-x-2 items-center">
                  <Skeleton className="h-[45px] w-[45px] rounded-full bg-neutral/10" />
                  <Skeleton className="h-[14px] w-1/5 rounded-xl bg-neutral/10" />
                </div>
              </section>
            </div>
          </section>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          book && (
            <div key={book._id} className="w-full">
              <section className="w-full flex md:flex-row flex-col justify-between md:space-x-10 space-y-4 p-10">
                <div className="md:w-1/3 flex items-center justify-center">
                  <BookWhitLink id={book._id} title={book.title} />
                </div>

                <div className="md:w-2/3 flex flex-col space-y-3">
                  <div className="w-full flex md:flex-row flex-col justify-between">
                    <h1 className="text-secondary font-semibold text-xl">
                      {book.title}
                    </h1>
                    <p>{renderRating(book.rating)}</p>
                  </div>
                  <h3 className="font-medium text-lg">{book.subtitle}</h3>

                  <section className="flex space-x-2">
                    {book.categories.map((category: any) => (
                      <p
                        className="w-fit p-1 px-4 text-sm font-semibold text-accent border-2 border-accent rounded-xl hover:bg-accent/20 cursor-pointer"
                        key={category}
                      >
                        {category}
                      </p>
                    ))}
                  </section>

                  <section className="flex items-center gap-2">
                    <div
                      className="w-fit p-1 px-4 text-lg bg-ebook-linear rounded-xl font-semibold cursor-pointer"
                      onClick={() => toggleModal("ebook")}
                    >
                      Ebook
                    </div>
                    <div
                      className="w-fit p-1 px-4 text-lg bg-audiobook-linear rounded-xl font-semibold cursor-pointer"
                      onClick={() => toggleModal("audiobook")}
                    >
                      Audiobook
                    </div>
                    <i
                      className={`bx ${
                        isBookmarked ? "bxs-bookmarks" : "bx-bookmarks"
                      } hover:text-neutral/80 cursor-pointer bx-sm`}
                      onClick={handleBookmarkClick}
                    ></i>
                  </section>

                  <div>
                    <p className="w-3/4">
                      {showFullDescription
                        ? book.description
                        : `${book.description.substring(0, 200)}...`}
                    </p>
                    <button
                      onClick={toggleDescription}
                      className="text-accent hover:text-accent/90"
                    >
                      {showFullDescription ? "Mostrar menos" : "Mostrar más"}
                    </button>
                  </div>

                  <section className="space-y-2">
                    <h4 className="font-bold">About the authors</h4>
                    <div className="flex space-x-2 items-center">
                      <Image
                        src={book.authors.img}
                        alt={`Photo of ${book.authors.name}`}
                        width={45}
                        height={45}
                        style={{ borderRadius: "100%", width: 45, height: 45 }}
                      />
                      <p className="font-semibold text-accent">
                        {book.authors.name}
                      </p>
                    </div>
                  </section>
                </div>
              </section>

              {isModalOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-primary/95">
                  <div className="max-h-full max-w-full rounded-2xl">
                    <i
                      className="bx bx-x bx-md absolute top-2 right-2 cursor-pointer z-50 hover:text-neutral/70"
                      onClick={toggleModal}
                    ></i>
                    <div className="w-[70vw] h-[90vh]">
                      {modalContent === "ebook" && (
                        <EpubViewer url={book.ebook} title={book.title} />
                      )}
                      {modalContent === "audiobook" && (
                        <div className="w-[70vw] h-[90vh]">
                          <AudiobookPlayer
                            frontImage={book.image.frontImage}
                            title={book.title}
                            authorName={book.authors.name}
                            audioUrl={book.audiobook}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </section>
    </main>
  )
}
