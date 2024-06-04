import Image from "next/image"
import Link from "next/link"

interface BookWhitLinkProps {
  id: string
  src: string
  alt: string
}

export default function BookWhitLink({ id, src, alt }: BookWhitLinkProps) {
  return (
    <Link href={`/book/${id}`}>
      <Image
        src={src}
        alt={alt}
        width={130}
        height={200}
        style={{ width: "auto" }}
        priority={true}
      />
    </Link>
  )
}
