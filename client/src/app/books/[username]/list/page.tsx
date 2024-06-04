"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { UserDataTypes } from "@/types/user"
import { BookTypes } from "@/types/books"

export default function UserBookListPage() {
  const { token, username } = useAuth()
  const [userData, setUserData] = useState<UserDataTypes | null>(null)
  const [books, setBooks] = useState<BookTypes[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

        const bookRequests = data.bookList.map(async (book: any) => {
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
          return bookResponse.json()
        })

        const booksData = await Promise.all(bookRequests)
        setBooks(booksData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [token, username])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main>
      <h1>User books list page</h1>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>

          <h2>Books:</h2>
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <p>Id: {book._id}</p>
                <p>Title: {book.title}</p>
                <p>Author: {book.authors.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}
