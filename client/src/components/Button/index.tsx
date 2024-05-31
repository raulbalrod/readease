import Link from "next/link"
import { ButtonProps } from "./types"

export default function Button({
  text,
  path,
  variant = "default",
}: ButtonProps) {
  const variantsButton = {
    default:
      "bg-accent flex justify-center items-center font-medium text-xs md:text-base py-0 px-4 py-2 md:px-6 rounded-xl hover:bg-[#573dcc] z-10",
    secondary:
      "bg-secondary flex justify-center items-center font-medium text-xs md:text-base py-0 px-4 py-2 md:px-6 rounded-xl hover:bg-secondary/90 z-10",
    outlined:
      "bg-transparent flex justify-center items-center font-medium text-xs md:text-base text-neutral py-0 px-4 py-2 md:px-6 border border-neutral rounded-xl hover:bg-neutral/20",
    only_text:
      "bg-transparent w-fit flex justify-center items-center font-medium text-xs md:text-base text-neutral py-0 px-6 py-2 md:px-6 rounded-xl hover:bg-neutral/30",
    price:
      "bg-neutral/10 flex justify-center items-center font-medium text-xs md:text-base py-2 px-4 md:py-2 md:px-6 rounded-xl hover:bg-neutral/30 z-10",
  }

  const className = variantsButton[variant] || variantsButton.default

  return (
    <Link href={path} className={className}>
      {text}
    </Link>
  )
}
