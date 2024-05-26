import Link from "next/link"
import { ButtonProps } from "./types"

export default function Button({
  text,
  path,
  variant = "default",
}: ButtonProps) {
  const variantsButton = {
    default:
      "bg-accent font-medium text-neutral py-2 px-6 rounded-3xl hover:bg-[#573dcc]",
    outlined:
      "bg-transparent font-medium text-neutral py-2 px-6 border border-neutral rounded-3xl hover:bg-neutral/20",
  }

  const className = variantsButton[variant] || variantsButton.default

  return (
    <Link href={path} className={className}>
      {text}
    </Link>
  )
}
