import React from "react"
import Link from "next/link"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary p-4">
      <h1 className="text-9xl font-bold mb-4">
        4
        <span>
          <i className="bx bx-book-reader"></i>
        </span>
        4
      </h1>
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-lg text-neutral/60 mb-8">
        We are sorry, but the page you are looking for does not exist.
      </p>
      <Link href="/home">
        <p className="text-lg text-blue-500 hover:underline">
          Return to principal page
        </p>
      </Link>
    </div>
  )
}

export default NotFoundPage
