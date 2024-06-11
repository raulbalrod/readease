"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { UserDataTypes } from "@/types/user"
import { BookTypes } from "@/types/books"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import BookImageWhitLink from "@/containers/mylist/BookImage"

export default function UserBookListPage() {
  const { token, username } = useAuth()
  const [userData, setUserData] = useState<UserDataTypes | null>(null)
  const [books, setBooks] = useState<
    (BookTypes & { personalStatus: string })[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("All")
  const [filterCategory, setFilterCategory] = useState<string>("All")
  const [orderBy, setOrderBy] = useState<string>("default")
  const [categories, setCategories] = useState<string[]>([])

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

        const bookList = data.bookList || []
        const bookRequests = bookList
          .filter((book: any) => book && book._id)
          .map(async (book: any) => {
            const bookResponse = await fetch(
              `https://bookbuddy-v7ra.onrender.com/v1/books/${book._id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            if (!bookResponse.ok) {
              throw new Error("Error fetching book data")
            }
            const bookData = await bookResponse.json()
            return { ...bookData, personalStatus: book.personalStatus }
          })

        let booksData = await Promise.all(bookRequests)

        const categoriesSet = new Set<string>()
        booksData.forEach((book) => {
          if (book.categories && book.categories.length > 0) {
            book.categories.forEach((category: string) =>
              categoriesSet.add(category),
            )
          }
        })
        setCategories(Array.from(categoriesSet))

        if (filterStatus !== "All") {
          booksData = booksData.filter(
            (book) => book.personalStatus === filterStatus,
          )
        }

        if (filterCategory !== "All") {
          booksData = booksData.filter((book) =>
            book.categories.includes(filterCategory),
          )
        }

        switch (orderBy) {
          case "az":
            booksData.sort((a, b) => a.title.localeCompare(b.title))
            break
          case "za":
            booksData.sort((a, b) => b.title.localeCompare(a.title))
            break
          case "pageCountDesc":
            booksData.sort((a, b) => b.pageCount - a.pageCount)
            break
          case "pageCountAsc":
            booksData.sort((a, b) => a.pageCount - b.pageCount)
            break
          case "rateDesc":
            booksData.sort((a, b) => b.rating - a.rating)
            break
          case "rateAsc":
            booksData.sort((a, b) => a.rating - b.rating)
            break
          default:
            break
        }

        setBooks(booksData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [token, username, filterStatus, filterCategory, orderBy])

  const handleStatusChange = async (bookId: string, newStatus: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === bookId ? { ...book, personalStatus: newStatus } : book,
      ),
    )

    try {
      const response = await fetch(
        `https://bookbuddy-v7ra.onrender.com/v1/users/${userData?._id}/book`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId: bookId, newStatus: newStatus }),
        },
      )
      if (!response.ok) {
        throw new Error("Error updating book status")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Leyendo":
        return "text-blue-300 border border-blue-300 rounded-3xl"
      case "Leído":
        return "text-green-300 border border-green-300 rounded-3xl z-50"
      default:
        return "text-yellow-300 border border-yellow-300 rounded-3xl z-50"
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main>
      <section className="flex md:flex-row flex-col md:justify-between md:items-center items-start gap-2 px-6 mb-32">
        <h1 className="text-2xl font-bold">My list</h1>

        <div className="flex items-center space-x-4">
          <Select onValueChange={(value) => setFilterStatus(value)}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="h-32">
              <SelectItem value="All">Todos</SelectItem>
              <SelectItem value="Leyendo">Leyendo</SelectItem>
              <SelectItem value="Futuras lecturas">Futuras lecturas</SelectItem>
              <SelectItem value="Leído">Leído</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setFilterCategory(value)}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Categorias" />
            </SelectTrigger>
            <SelectContent className="h-32">
              <SelectItem value="All">Todos</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="hidden md:flex items-center gap-2 ml-4">
            <p className="text-sm md:text-base font-bold ">Order by</p>
            <Select onValueChange={(value) => setOrderBy(value)}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent className="h-32">
                <SelectItem value="az">A-Z</SelectItem>
                <SelectItem value="za">Z-A</SelectItem>
                <SelectItem value="pageCountDesc">More Pages</SelectItem>
                <SelectItem value="pageCountAsc">Less Pages</SelectItem>
                <SelectItem value="rateDesc">Best Rated</SelectItem>
                <SelectItem value="rateAsc">The Least Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="flex flex-col items-center justify-center gap-2 max-w-72"
          >
            <BookImageWhitLink title={book.title} id={book._id} />

            <p className="mt-2 font-semibold text-center">{book.title}</p>

            <div
              className={`w-fit ${getStatusClass(book.personalStatus)} mb-32`}
            >
              <Select
                onValueChange={(value) => handleStatusChange(book._id, value)}
              >
                <SelectTrigger
                  className={`w-fit ${getStatusClass(book.personalStatus)}`}
                >
                  <SelectValue placeholder={book.personalStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leyendo">Leyendo</SelectItem>
                  <SelectItem value="Futuras lecturas">
                    Futuras lecturas
                  </SelectItem>
                  <SelectItem value="Leído">Leído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
