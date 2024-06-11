"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select"
import { Skeleton } from "@/components/Skeleton"
import BookWhitLink from "@/containers/home/Book"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function BooksDiscoveryPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<string[]>([])
  const [books, setBooks] = useState<any[]>([])
  const [token, setToken] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [orderBy, setOrderBy] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (!storedToken) {
      router.push("/sign-in")
    } else {
      setToken(storedToken)
    }
  }, [router])

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://bookbuddy-v7ra.onrender.com/v1/books`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.status === 401) {
        console.error(
          "Token inválido, redirigiendo a la página de inicio de sesión.",
        )
        router.push("/sign-in")
        return
      }

      const data = await response.json()

      if (Array.isArray(data)) {
        const allCategories = data.flatMap((book: any) => book.categories)
        const uniqueCategories = Array.from(new Set(allCategories))
        setCategories(uniqueCategories)
      } else {
        console.error("Error: Expected array but received:", data)
        setCategories([])
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      setCategories([])
    }
  }

  const fetchBooks = async (category: string | null, order: string | null) => {
    try {
      setLoading(true)
      let url = `https://bookbuddy-v7ra.onrender.com/v1/books`
      const params = new URLSearchParams()
      if (category && category !== "All") {
        params.append("categorie", category)
      }
      if (order) {
        params.append("sort", order)
      }
      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        console.error(
          "Token inválido, redirigiendo a la página de inicio de sesión.",
        )
        router.push("/sign-in")
        return
      }

      const data = await response.json()

      if (Array.isArray(data)) {
        setBooks(data)
      } else {
        console.error("Error: Expected array but received:", data)
        setBooks([])
      }
    } catch (error) {
      console.error("Error fetching books:", error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchCategories()
      fetchBooks(filterCategory, orderBy)
    }
  }, [token, filterCategory, orderBy])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {loading ? (
        <>
          <section className="w-full flex md:flex-row flex-col md:justify-between md:items-center items-start gap-2 px-6 mb-32">
            <Skeleton className="h-[24px] w-[300px] rounded-xl bg-neutral/10" />
            <div className="flex gap-2">
              <Skeleton className="h-[20px] w-[150px] rounded-xl bg-neutral/10" />
              <Skeleton className="h-[20px] w-[150px] rounded-xl bg-neutral/10" />
            </div>
          </section>

          <div className="block md:hidden">
            <section className="grid grid-cols-2 gap-6">
              {books.slice(0, 10).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[260px] w-[150px] rounded-xl bg-neutral/10"
                />
              ))}
            </section>
          </div>

          <div className="hidden md:block">
            <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {books.slice(0, 10).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[460px] w-[300px] rounded-xl bg-neutral/10"
                />
              ))}
            </section>
          </div>
        </>
      ) : (
        <>
          <section className="w-full flex md:flex-row flex-col md:justify-between md:items-center items-start gap-2 px-6 mb-32">
            <h1 className="text-2xl font-bold">Explore by categories</h1>

            <div className="flex items-center space-x-4">
              <Select onValueChange={(value) => setFilterCategory(value)}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Categorias" />
                </SelectTrigger>
                <SelectContent className="h-32">
                  <SelectItem value="All">Todos</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 ml-4">
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
              <BookWhitLink key={book._id} id={book._id} title={book.title} />
            ))}
          </section>
        </>
      )}
    </main>
  )
}
