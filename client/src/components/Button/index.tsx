import Link from "next/link"
import { ButtonProps } from "./types"

export default function Button({
  text,
  path,
  variant = "default",
}: ButtonProps) {
  const variantsButton = {
    default:
      "bg-accent flex items-center font-medium text-xs md:text-base py-0 px-4 md:py-2 md:px-6 rounded-xl hover:bg-[#573dcc] z-10",
    outlined:
      "bg-transparent flex items-center font-medium text-xs md:text-base text-neutral py-0 px-4 md:py-2 md:px-6 border border-neutral rounded-xl hover:bg-neutral/20",
    only_text:
      "bg-transparent flex items-center font-medium text-xs md:text-base text-neutral py-0 px-4 md:py-2 md:px-6 rounded-xl hover:bg-neutral/30",
  }

  const className = variantsButton[variant] || variantsButton.default

  return (
    <Link href={path} className={className}>
      {text}
    </Link>
  )
}
