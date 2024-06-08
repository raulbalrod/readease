import { formatTitle } from "@/utils/formatTitle"
import Link from "next/link"

interface BookWhitLinkProps {
  id: string
  title: string
}

export default function BookWhitLink({ id, title }: BookWhitLinkProps) {
  return (
    <Link href={`/book/${id}`}>
      <div
        className="relative flex-col items-center justify-center gap-4 bg-cover bg-center text-neutral hidden md:flex"
        style={{
          backgroundImage: `url('/books/${formatTitle(title)}.jpg')`,
          width: 300,
          height: 460,
        }}
      >
        <div className="absolute inset-0"></div>
      </div>

      <div
        className="relative flex flex-col items-center justify-center gap-4 bg-cover bg-center text-neutral md:hidden"
        style={{
          backgroundImage: `url('/books/${formatTitle(title)}.jpg')`,
          width: 150,
          height: 260,
        }}
      >
        <div className="absolute inset-0"></div>
      </div>
    </Link>
  )
}
